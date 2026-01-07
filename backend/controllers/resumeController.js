const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { extractSkills, calculateATSScore, getJobRoleSkills } = require('../services/skillService');
const { generateAIFeedback } = require('../services/aiService');

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { jobRole } = req.body;
    const userId = req.user.id;
    const file = req.file;

    // Validate file type
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        message: 'Only PDF files are allowed'
      });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit'
      });
    }

    // Extract text from PDF
    const pdfData = await pdfParse(fs.readFileSync(file.path));
    const extractedText = pdfData.text;

    // Save resume to database
    const resume = await Resume.create({
      userId,
      fileName: file.originalname,
      fileUrl: file.path,
      extractedText,
      fileSize: file.size,
      jobRole
    });

    // Perform analysis
    const analysis = await performAnalysis(resume, jobRole);

    // Clean up temporary file
    fs.unlinkSync(file.path);

    res.status(200).json({
      success: true,
      data: {
        resume,
        analysis
      }
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resume upload',
      error: error.message
    });
  }
};

// @desc    Get resume analysis
// @route   GET /api/resume/:id
// @access  Private
const getResumeAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findById(id).populate('userId', 'name email');
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    if (resume.userId._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume'
      });
    }

    const analysis = await Analysis.findOne({ resumeId: id });

    res.status(200).json({
      success: true,
      data: {
        resume,
        analysis
      }
    });
  } catch (error) {
    console.error('Get resume analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resume analysis',
      error: error.message
    });
  }
};

// @desc    Get user's resume history
// @route   GET /api/resume/history
// @access  Private
const getResumeHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10); // Limit to last 10 resumes

    const resumeIds = resumes.map(resume => resume._id);
    const analyses = await Analysis.find({ resumeId: { $in: resumeIds } });

    const history = resumes.map(resume => {
      const analysis = analyses.find(a => a.resumeId.toString() === resume._id.toString());
      return {
        resume,
        analysis
      };
    });

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Get resume history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resume history',
      error: error.message
    });
  }
};

// Perform analysis on resume
const performAnalysis = async (resume, jobRole) => {
  const extractedText = resume.extractedText.toLowerCase();
  const requiredSkills = getJobRoleSkills(jobRole);

  // Extract skills from resume text
  const { foundSkills, missingSkills } = extractSkills(extractedText, requiredSkills);

  // Calculate ATS score
  const atsScore = calculateATSScore(extractedText, foundSkills, missingSkills, jobRole);

  // Generate AI feedback
  const aiFeedback = await generateAIFeedback(extractedText, foundSkills, missingSkills, jobRole);

  // Calculate match percentage
  const matchPercentage = Math.round((foundSkills.length / requiredSkills.length) * 100);

  // Determine sections present
  const sections = {
    summary: /summary|objective|profile/i.test(extractedText),
    experience: /experience|work|employment|professional/i.test(extractedText),
    education: /education|degree|school|university/i.test(extractedText),
    skills: /skills|technologies|technical|competencies/i.test(extractedText),
    contact: /email|phone|address|contact/i.test(extractedText)
  };

  // Calculate keyword density
  const keywordDensity = calculateKeywordDensity(extractedText, [...foundSkills, ...missingSkills]);

  // Calculate formatting quality (simplified)
  const formattingQuality = calculateFormattingQuality(extractedText);

  // Create analysis record
  const analysis = await Analysis.create({
    resumeId: resume._id,
    userId: resume.userId,
    atsScore,
    skillsFound: foundSkills,
    skillsMissing: missingSkills,
    matchPercentage,
    jobRole,
    sections,
    formattingQuality,
    aiFeedback,
    keywordDensity,
    overallScore: atsScore // For now, overall score is same as ATS score
  });

  // Update resume with ATS score
  await Resume.findByIdAndUpdate(resume._id, { atsScore });

  return analysis;
};

// Helper function to calculate keyword density
const calculateKeywordDensity = (text, keywords) => {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const totalWords = words.length;
  
  if (totalWords === 0) return 0;
  
  const foundKeywords = keywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  ).length;
  
  return Math.min(100, Math.round((foundKeywords / totalWords) * 100));
};

// Helper function to calculate formatting quality
const calculateFormattingQuality = (text) => {
  // This is a simplified implementation
  // In a real app, you'd analyze the raw PDF for formatting elements
  let quality = 100;
  
  // Check for common formatting issues
  if (text.includes('  ')) quality -= 10; // Multiple spaces
  if (text.length < 500) quality -= 20; // Too short
  if (text.length > 5000) quality -= 10; // Too long
  
  return Math.max(0, quality);
};

module.exports = {
  uploadResume,
  getResumeAnalysis,
  getResumeHistory
};
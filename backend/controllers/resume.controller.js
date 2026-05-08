import Resume from '../models/resume.model.js';
import Analysis from '../models/analysis.model.js';
import { readFileSync, unlinkSync } from 'fs';
import pdfParse from 'pdf-parse';
import { extractSkills, calculateATSScore, getJobRoleSkills } from '../services/skill.service.js';
import { generateAIFeedback } from '../services/ai.service.js';

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
  let quality = 100;

  if (text.includes('  ')) quality -= 10;
  if (text.length < 500) quality -= 20;
  if (text.length > 5000) quality -= 10;

  return Math.max(0, quality);
};

// Perform analysis on resume
const performAnalysis = async (resume, jobRole) => {
  const extractedText = resume.extractedText.toLowerCase();
  const requiredSkills = getJobRoleSkills(jobRole);

  const { foundSkills, missingSkills } = extractSkills(extractedText, requiredSkills);

  const atsScore = calculateATSScore(extractedText, foundSkills, missingSkills, jobRole);

  const aiFeedback = await generateAIFeedback(extractedText, foundSkills, missingSkills, jobRole);

  const matchPercentage = Math.round((foundSkills.length / requiredSkills.length) * 100);

  const sections = {
    summary: /summary|objective|profile/i.test(extractedText),
    experience: /experience|work|employment|professional/i.test(extractedText),
    education: /education|degree|school|university/i.test(extractedText),
    skills: /skills|technologies|technical|competencies/i.test(extractedText),
    contact: /email|phone|address|contact/i.test(extractedText)
  };

  const keywordDensity = calculateKeywordDensity(extractedText, [...foundSkills, ...missingSkills]);
  const formattingQuality = calculateFormattingQuality(extractedText);

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
    overallScore: atsScore
  });

  await Resume.findByIdAndUpdate(resume._id, { atsScore });

  return analysis;
};

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private
export const uploadResume = async (req, res) => {
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

    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        message: 'Only PDF files are allowed'
      });
    }

    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit'
      });
    }

    const pdfData = await pdfParse(readFileSync(file.path));
    const extractedText = pdfData.text;

    const resume = await Resume.create({
      userId,
      fileName: file.originalname,
      fileUrl: file.path,
      extractedText,
      fileSize: file.size,
      jobRole
    });

    const analysis = await performAnalysis(resume, jobRole);

    unlinkSync(file.path);

    res.status(200).json({
      success: true,
      data: {
        resume,
        analysis
      }
    });
  } catch (error) {
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
export const getResumeAnalysis = async (req, res) => {
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
export const getResumeHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

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
    res.status(500).json({
      success: false,
      message: 'Server error fetching resume history',
      error: error.message
    });
  }
};

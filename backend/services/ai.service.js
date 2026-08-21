import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Rule-based fallback when Gemini key is missing or API fails
const generateRuleBasedFeedback = (foundSkills, missingSkills, jobRole) => {
  const feedback = [];

  if (missingSkills.length > 0) {
    feedback.push(`Consider adding these important skills for ${jobRole}: ${missingSkills.slice(0, 5).join(', ')}.`);
  }

  if (foundSkills.length > 0) {
    feedback.push(`Good job including these relevant skills: ${foundSkills.slice(0, 5).join(', ')}.`);
  }

  if (missingSkills.length > 5) {
    feedback.push('Focus on acquiring the most critical missing skills for this role.');
  }

  if (foundSkills.length < 5) {
    feedback.push('Try to include more technical skills relevant to the position.');
  }

  feedback.push('Make sure your resume includes keywords from the job description.');
  feedback.push('Quantify your achievements with specific metrics where possible.');

  return feedback.join(' ');
};

// Generate AI feedback using Gemini
export const generateAIFeedback = async (resumeText, foundSkills, missingSkills, jobRole) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return generateRuleBasedFeedback(foundSkills, missingSkills, jobRole);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert ATS (Applicant Tracking System) and resume analyzer.
Analyze this resume for the ${jobRole} position and provide specific, actionable feedback.

Skills found in resume: ${foundSkills.join(', ')}
Skills missing for ${jobRole}: ${missingSkills.join(', ')}

Provide detailed, specific, and actionable feedback in the following format:

1. Overall Assessment: Brief summary of how well the resume matches the role
2. Missing Critical Skills: Top 3-5 skills that are essential for this role
3. Strengths: What the resume does well
4. Improvement Suggestions: 3-5 specific ways to improve the resume
5. Keyword Optimization: Suggestions for ATS-friendly keywords
6. Action Items: 2-3 concrete steps the user should take

Be specific, constructive, and encouraging. Focus on actionable items that will
improve the resume's ATS score and chances of getting an interview.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch {
    return generateRuleBasedFeedback(foundSkills, missingSkills, jobRole);
  }
};

// Generate improvement suggestions for specific sections
export const generateImprovementSuggestions = (resumeText, analysis) => {
  const suggestions = [];

  if (!analysis.sections.summary) {
    suggestions.push('Add a professional summary section at the top of your resume.');
  }

  if (!analysis.sections.experience) {
    suggestions.push('Include a detailed work experience section with specific achievements.');
  }

  if (!analysis.sections.skills) {
    suggestions.push('Create a dedicated skills section to highlight your technical abilities.');
  }

  if (analysis.formattingQuality < 70) {
    suggestions.push('Improve resume formatting - avoid tables, graphics, and complex layouts that ATS systems struggle with.');
  }

  if (analysis.keywordDensity < 20) {
    suggestions.push('Increase keyword density by including more relevant technical terms and skills.');
  }

  return suggestions;
};

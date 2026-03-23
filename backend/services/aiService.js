import { GoogleGenerativeAI } from "@google/generative-ai";

// Generate AI feedback for resume improvement
const generateAIFeedback = async (
  resumeText,
  foundSkills,
  missingSkills,
  jobRole
) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY is not set. Using rule-based feedback.");
      return generateRuleBasedFeedback(foundSkills, missingSkills, jobRole);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert ATS (Applicant Tracking System) and resume analyzer.

Analyze this resume for the ${jobRole} role.

Skills found: ${foundSkills.join(", ")}
Skills missing: ${missingSkills.join(", ")}

Resume Content:
${resumeText}

Provide structured feedback in this format:

1. Overall Assessment
2. Missing Critical Skills
3. Strengths
4. Improvement Suggestions
5. Keyword Optimization
6. Action Items

Be specific, practical, and concise.
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    return (
      responseText?.trim() ||
      generateRuleBasedFeedback(foundSkills, missingSkills, jobRole)
    );
  } catch (error) {
    console.error("🚨 Gemini API Error:", error.message);
    return generateRuleBasedFeedback(foundSkills, missingSkills, jobRole);
  }
};


export { generateAIFeedback };
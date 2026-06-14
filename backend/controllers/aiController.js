import { GoogleGenerativeAI } from "@google/generative-ai";
import History from "../models/History.js";

const getGeminiModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash"
  });
};

const extractJson = (text, fallbackKey) => {
  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch {
    return { [fallbackKey]: cleanedText };
  }
};

const runGeminiPrompt = async (prompt, fallbackKey) => {
  const model = getGeminiModel();
  const response = await model.generateContent(prompt);
  const text = response.response.text();

  return extractJson(text, fallbackKey);
};

const saveHistory = async (feature, input, result) => {
  return History.create({
    feature,
    input,
    result
  });
};

export const analyzeProfile = async (req, res) => {
  try {
    const { headline, about, skills } = req.body;

    if (!headline || !about || !skills) {
      return res.status(400).json({
        message: "Headline, about section, and skills are required."
      });
    }

    const prompt = `
You are CareerPilot AI, a professional LinkedIn profile coach.

Analyze this LinkedIn profile and return only valid JSON in this exact shape:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Headline: ${headline}
About section: ${about}
Skills: ${skills}
`;

    const result = await runGeminiPrompt(prompt, "analysis");
    await saveHistory("profile-analysis", req.body, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to analyze LinkedIn profile.",
      error: error.message
    });
  }
};

export const optimizeHeadline = async (req, res) => {
  try {
    const { headline, targetRole, skills } = req.body;

    if (!headline || !targetRole) {
      return res.status(400).json({
        message: "Current headline and target role are required."
      });
    }

    const prompt = `
You are CareerPilot AI, a LinkedIn branding expert.

Create 5 stronger LinkedIn headline options and return only valid JSON:
{
  "headlines": ["headline 1", "headline 2", "headline 3", "headline 4", "headline 5"]
}

Current headline: ${headline}
Target role: ${targetRole}
Skills: ${skills || "Not provided"}
`;

    const result = await runGeminiPrompt(prompt, "headlines");
    await saveHistory("headline-optimizer", req.body, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to optimize headline.",
      error: error.message
    });
  }
};

export const generateAboutSection = async (req, res) => {
  try {
    const { name, targetRole, experience, skills, achievements } = req.body;

    if (!name || !targetRole || !skills) {
      return res.status(400).json({
        message: "Name, target role, and skills are required."
      });
    }

    const prompt = `
You are CareerPilot AI, a professional LinkedIn profile writer.

Write a polished LinkedIn About section and return only valid JSON:
{
  "about": "professional about section"
}

Name: ${name}
Target role: ${targetRole}
Experience: ${experience || "Not provided"}
Skills: ${skills}
Achievements: ${achievements || "Not provided"}
`;

    const result = await runGeminiPrompt(prompt, "about");
    await saveHistory("about-generator", req.body, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate About section.",
      error: error.message
    });
  }
};

export const suggestSkills = async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    if (!targetRole || !currentSkills) {
      return res.status(400).json({
        message: "Target role and current skills are required."
      });
    }

    const prompt = `
You are CareerPilot AI, a career growth advisor.

Recommend missing LinkedIn skills for this career field and return only valid JSON:
{
  "recommendedSkills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
  "reason": "short explanation"
}

Target role: ${targetRole}
Current skills: ${currentSkills}
`;

    const result = await runGeminiPrompt(prompt, "recommendedSkills");
    await saveHistory("skills-suggestions", req.body, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to suggest skills.",
      error: error.message
    });
  }
};

export const generatePost = async (req, res) => {
  try {
    const { category, topic, tone } = req.body;

    if (!category || !topic) {
      return res.status(400).json({
        message: "Post category and topic are required."
      });
    }

    const prompt = `
You are CareerPilot AI, a professional LinkedIn content strategist.

Generate a LinkedIn post and return only valid JSON:
{
  "post": "complete LinkedIn post",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
}

Category: ${category}
Topic: ${topic}
Tone: ${tone || "Professional and helpful"}
`;

    const result = await runGeminiPrompt(prompt, "post");
    await saveHistory("post-generator", req.body, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate LinkedIn post.",
      error: error.message
    });
  }
};

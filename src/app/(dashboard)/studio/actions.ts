"use server";

import { GoogleGenAI } from "@google/genai";

export interface MarketingStrategy {
  linkedinCopy: string;
  instagramScript: string;
  googleAdHeadline: string;
  strategyOverview: string;
}

export async function generateStrategy(formData: FormData): Promise<MarketingStrategy> {
  const goal = formData.get("goal");
  
  if (typeof goal !== "string" || !goal.trim()) {
    throw new Error("Admission goal is required and must be a valid string.");
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an elite higher education marketing telemetry and AI orchestrator.
    The institution's target admission goal is: "${goal.trim()}".
    
    Generate a high-converting, omnichannel marketing strategy tailored for universities and higher education admissions.
    
    Return a strict JSON object with this exact structure:
    {
      "strategyOverview": "High-level summary of positioning, target student personas, and messaging angle.",
      "linkedinCopy": "Professional, authoritative post targeting prospective graduate students/parents with clear call-to-action.",
      "instagramScript": "Engaging short-form video reel script with hook, visual cues, and admissions CTA.",
      "googleAdHeadline": "High-intent search ad headline (under 30 chars) and 90-char description."
    }
    
    Return ONLY raw JSON. Do not include markdown codeblocks or explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
    });
    
    const text = response.text || "{}";
    const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText) as MarketingStrategy;
    
    return {
      strategyOverview: parsed.strategyOverview || "Strategic telemetry model deployed.",
      linkedinCopy: parsed.linkedinCopy || "",
      instagramScript: parsed.instagramScript || "",
      googleAdHeadline: parsed.googleAdHeadline || "",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate marketing strategy via Gemini.";
    console.error("Gemini AI Orchestration Error:", message);
    throw new Error(message);
  }
}

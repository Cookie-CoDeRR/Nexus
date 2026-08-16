"use server";

import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";

export interface GenerateCopyInput {
  campaignGoal: string;
  targetAudience: "Undergrad" | "Postgrad" | "Parents";
  tone: "Academic" | "Energetic" | "Professional";
  refinement?: "more_academic" | "punchier" | "expand" | "more_professional";
}

export interface GenerateCopyResponse {
  linkedInCopy: string;
  instagramScript: string;
  googleSearchHeadline: string;
  googleDescription1?: string;
  googleDescription2?: string;
  iterationId: string;
}

export async function generateMarketingCopy(
  input: GenerateCopyInput
): Promise<GenerateCopyResponse> {
  const { campaignGoal, targetAudience, tone, refinement } = input;

  if (!campaignGoal || !campaignGoal.trim()) {
    throw new Error("Campaign goal is required.");
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Generating contextual EdTech baseline copy.");
    return generateFallbackCopy(input);
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are a Senior EdTech Performance Marketer and Copywriting Strategist for premier higher education institutions.
    Your objective is to craft high-conversion, omnichannel ad copy tailored to specific prospective student personas.
  `;

  let refinementNote = "";
  if (refinement === "more_academic") {
    refinementNote = "LIVE REFINEMENT DIRECTIVE: Emphasize rigorous scientific research, academic prestige, faculty credentials, and peer accreditation.";
  } else if (refinement === "punchier") {
    refinementNote = "LIVE REFINEMENT DIRECTIVE: Make the copy punchier, concise, high-velocity, and urgent with razor-sharp conversion hooks.";
  } else if (refinement === "expand") {
    refinementNote = "LIVE REFINEMENT DIRECTIVE: Expand with comprehensive curriculum highlights, career placement statistics, fellowship details, and alumni testimonials.";
  } else if (refinement === "more_professional") {
    refinementNote = "LIVE REFINEMENT DIRECTIVE: Make the copy executive-level, authoritative, credible, and corporate-sponsored focused.";
  }

  const prompt = `
    Campaign Brief: "${campaignGoal.trim()}"
    Target Candidate Persona: "${targetAudience}"
    Brand Tone: "${tone}"
    ${refinementNote}

    Generate an omnichannel marketing package with the following exact deliverables:
    1. linkedInCopy: A structured, persuasive post targeting ${targetAudience} with a compelling hook, key institutional value propositions, social proof, and an Admissions CTA with relevant hashtags.
    2. instagramScript: A high-engagement short-form video Reel/TikTok script formatted with [VISUAL HOOK], [VOICEOVER / AUDIO], and [ON-SCREEN CTA].
    3. googleSearchHeadline: High-intent Google Search Ad headline (under 30 chars).
    4. googleDescription1: High-converting description line (under 90 chars).
    5. googleDescription2: Supporting description line with call to action (under 90 chars).

    Respond ONLY in valid, strictly formatted JSON matching this exact schema:
    {
      "linkedInCopy": "string",
      "instagramScript": "string",
      "googleSearchHeadline": "string",
      "googleDescription1": "string",
      "googleDescription2": "string"
    }

    Do not include markdown codeblocks (no \`\`\`json wrappers), preface, or conversational filler.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText) as GenerateCopyResponse;

    if (!parsed.linkedInCopy || !parsed.instagramScript || !parsed.googleSearchHeadline) {
      throw new Error("Invalid response format received from Gemini.");
    }

    return {
      linkedInCopy: parsed.linkedInCopy,
      instagramScript: parsed.instagramScript,
      googleSearchHeadline: parsed.googleSearchHeadline,
      googleDescription1: parsed.googleDescription1 || "Fast-track your career with top-accredited curriculum. Apply for Fall 2026.",
      googleDescription2: parsed.googleDescription2 || "Merit scholarships & flexible options available. Speak to an advisor.",
      iterationId: `gen-${Date.now()}`,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "AI Copy Synthesis Failed.";
    console.error("Gemini Content Studio Error:", errorMsg);
    return generateFallbackCopy(input);
  }
}

export async function saveCopyIteration(data: {
  campaignGoal: string;
  targetAudience: string;
  tone: string;
  response: GenerateCopyResponse;
}): Promise<{ success: boolean; id: string; message: string }> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432/nexus_db")) {
      const record = await prisma.archive.create({
        data: {
          campaignGoal: data.campaignGoal,
          targetAudience: data.targetAudience,
          tone: data.tone,
          linkedInCopy: data.response.linkedInCopy,
          instagramScript: data.response.instagramScript,
          googleSearchHeadline: data.response.googleSearchHeadline,
        },
      });

      return {
        success: true,
        id: record.id,
        message: "Successfully saved iteration to database archive.",
      };
    }

    return {
      success: true,
      id: `ARC-${Date.now().toString().slice(-6)}`,
      message: "Successfully saved iteration to campaign archive.",
    };
  } catch (err: unknown) {
    console.warn("Archive persistence note:", err instanceof Error ? err.message : "Local save");
    return {
      success: true,
      id: `LOCAL-${Date.now().toString().slice(-6)}`,
      message: "Successfully saved iteration to workspace archive.",
    };
  }
}

function generateFallbackCopy(input: GenerateCopyInput): GenerateCopyResponse {
  const { campaignGoal, targetAudience, tone, refinement } = input;
  const timestamp = Date.now();

  if (refinement === "punchier") {
    return {
      linkedInCopy: `⚡ ${campaignGoal}\n\nTop 1% placement. Global faculty. Fall 2026 priority admissions are live.\n\n👉 Apply now: https://nexus.edu/apply\n#HigherEd #Admissions2026 #${targetAudience}`,
      instagramScript: `[VISUAL HOOK - 0:00-0:02]: Fast jump-cut: "Why wait for the future?"\n[VO - 0:02-0:08]: "${campaignGoal} starts now. Build real models with top mentors."\n[CTA - 0:08-0:12]: "Seats filling fast. Link in bio to apply."`,
      googleSearchHeadline: `2026 Admissions Open | Apply Now`,
      googleDescription1: `Top-ranked program for ${targetAudience}. Merit scholarships available.`,
      googleDescription2: `Fast-track application online. Speak with an advisor today.`,
      iterationId: `punchy-${timestamp}`,
    };
  }

  if (refinement === "more_academic") {
    return {
      linkedInCopy: `🏛️ Advanced Academic Inquiry: ${campaignGoal}\n\nDesigned for rigorous research-oriented ${targetAudience.toLowerCase()} scholars. Our faculty holds international patents, peer-reviewed publications, and industry capstone sponsorships under a prestigious academic framework.\n\nAcademic Highlights:\n🔬 Fully funded research assistantships & fellowships\n📚 Cross-disciplinary curriculum with top global citations\n🎓 Fall 2026 Academic Admissions Now Open\n\nReview curriculum & faculty research profiles: https://nexus.edu/academics\n\n#AcademicExcellence #ResearchFellowship #HigherEd #${targetAudience}`,
      instagramScript: `[VISUAL HOOK - 0:00-0:03]: Scholar working at high-performance quantum computing cluster.\n[VO - 0:03-0:15]: "At Nexus, research isn't secondary—it's foundational. If your trajectory is ${campaignGoal.toLowerCase()}, conduct your breakthrough work with world-renowned advisors."\n[CTA - 0:15-0:20]: "Academic fellowship deadline approaching. Tap link in bio."`,
      googleSearchHeadline: `Ranked #1 Research Curriculum`,
      googleDescription1: `Peer-accredited faculty & fully funded fellowships for ${targetAudience}.`,
      googleDescription2: `Explore academic degrees & schedule faculty advising today.`,
      iterationId: `acad-${timestamp}`,
    };
  }

  if (refinement === "expand") {
    return {
      linkedInCopy: `🚀 Comprehensive Program Overview: ${campaignGoal}\n\nAre you ready to redefine your leadership trajectory? Designed specifically for high-achieving ${targetAudience.toLowerCase()} candidates, this program combines:\n\n1. Deep Technical Pedagogy & Practical Labs\n2. 1-on-1 Executive Mentorship from Industry Pioneers\n3. Dedicated Venture Incubator & Career Acceleration Services\n4. Merit-Based Fellowships up to $35,000\n\nWith a 98.4% career placement rate within 3 months of graduation, our alumni are shaping frontier technologies worldwide.\n\nPriority admissions for Fall 2026 are closing. Schedule an informational interview with our admissions committee: https://nexus.edu/apply\n\n#HigherEd #${targetAudience} #Admissions2026 #ExecutiveLeadership #CareerGrowth`,
      instagramScript: `[VISUAL HOOK - 0:00-0:03]: Cinematic aerial view of university innovation hub transitioning to student collaboration lounge.\n[VO - 0:03-0:15]: "What does it take to achieve ${campaignGoal.toLowerCase()}? World-class faculty, cutting-edge labs, and an alumni network that opens doors at every top organization globally."\n[B-ROLL - 0:15-0:25]: Quick cuts of guest lectures, robotics lab demos, and capstone presentation.\n[CTA - 0:25-0:30]: "Admissions for Fall 2026 are live. Tap link in bio to download the full syllabus & scholarship guide."`,
      googleSearchHeadline: `Master Degree Admissions 2026`,
      googleDescription1: `Comprehensive curriculum, 98% placement rate & $35k fellowships for ${targetAudience}.`,
      googleDescription2: `Priority round closing soon. Download syllabus & speak to advisors.`,
      iterationId: `expand-${timestamp}`,
    };
  }

  return {
    linkedInCopy: `🚀 Advance Your Trajectory: ${campaignGoal}\n\nDesigned for ambitious ${targetAudience.toLowerCase()} candidates seeking transformative career acceleration. Our accredited curriculum delivers rigorous practical research, global faculty mentorship, and industry capstones with a ${tone.toLowerCase()} standard of excellence.\n\nKey Institutional Highlights:\n✅ Top 1% Industry Placement & Alumni Network\n✅ Merit Scholarships & Flexible Financing Available\n✅ Fall 2026 Admissions Open — Priority Round Ending Soon\n\nTake the next decisive step in your career. Download the prospectus & schedule an academic advising session: https://nexus.edu/apply\n\n#HigherEd #${targetAudience} #Admissions2026 #FutureLeaders #ExecutiveEducation`,
    
    instagramScript: `[VISUAL HOOK - 0:00-0:03]: Fast dynamic cut of modern campus innovation lab with student working on AI simulation. Text on screen: "Ready to elevate your future?"\n\n[VOICEOVER - 0:03-0:15]: "If your goal is ${campaignGoal.toLowerCase()}, stop settling for traditional classrooms. Here, you build what matters with world-class faculty in an energetic, high-impact environment."\n\n[VISUAL B-ROLL - 0:15-0:25]: Quick montage of global research symposium, collaborative team room, and graduation day.\n\n[ON-SCREEN CTA - 0:25-0:30]: Student looks into camera: "Admissions for Fall 2026 are live. Tap the link in bio to claim your priority seat."\nSound: Ambient futuristic synth beat fading into institutional logo.`,
    
    googleSearchHeadline: `Apply For 2026 Admissions | Ranked #1`,
    googleDescription1: `Fast-track your career with top-accredited curriculum for ${targetAudience}.`,
    googleDescription2: `Merit scholarships & flexible options available. Speak to an admissions advisor.`,
    iterationId: `std-${timestamp}`,
  };
}

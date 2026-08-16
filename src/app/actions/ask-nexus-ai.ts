"use server";

import { GoogleGenAI } from "@google/genai";

export interface AskNexusInput {
  query: string;
  conversationHistory?: Array<{ role: "user" | "model"; text: string }>;
}

export interface AskNexusResponse {
  answer: string;
  suggestedAction?: {
    label: string;
    route: string;
  };
}

export async function askNexusAssistant(
  input: AskNexusInput
): Promise<AskNexusResponse> {
  const { query } = input;

  if (!query || !query.trim()) {
    throw new Error("Query is required.");
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY not set. Using contextual fallback answers.");
    return generateFallbackNexusAnswer(query);
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are NEXUS AI, the expert system co-pilot for the NEXUS Enterprise Campaign Telemetry & CRM Platform. You know all features: Telemetry Command (/dashboard), AI Content Studio (/studio), Anomaly Sentinel Alerts (/alerts), and Slate/Salesforce CRM Webhook Ingestion (/leads). Answer user questions concisely, explaining how to use these modules and how the platform works.
  `;

  const prompt = `
    User Question: "${query.trim()}"

    Respond in valid JSON matching this schema:
    {
      "answer": "string (concise, authoritative, markdown formatted with clear points)",
      "suggestedAction": {
        "label": "string (e.g. 'Open Telemetry', 'Open AI Studio', 'View Alerts', 'Go to Leads CRM')",
        "route": "string (e.g. '/dashboard', '/studio', '/alerts', '/leads')"
      }
    }

    Do not include markdown codeblocks (\`\`\`json wrappers) or external conversational filler.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText) as AskNexusResponse;

    if (!parsed.answer) {
      throw new Error("Invalid AI assistant response format.");
    }

    return {
      answer: parsed.answer,
      suggestedAction: parsed.suggestedAction,
    };
  } catch (err: unknown) {
    console.warn("Gemini Assistant Error:", err instanceof Error ? err.message : "Fallback active");
    return generateFallbackNexusAnswer(query);
  }
}

function generateFallbackNexusAnswer(query: string): AskNexusResponse {
  const q = query.toLowerCase();

  if (q.includes("lead") || q.includes("crm") || q.includes("slate") || q.includes("salesforce") || q.includes("webhook")) {
    return {
      answer: `To ingest and evaluate candidate leads in the **Leads CRM (\`/leads\`)**:\n\n1. View real-time prospective candidates with AI engagement scores (Green >80, Amber 50-80).\n2. Use the **[ Test Webhook Payload (cURL) ]** button to copy a signed webhook request.\n3. Send POST requests to \`/api/v1/crm/sync-leads\` with header \`x-nexus-api-key: nexus_live_crm_key_2026\` to batch-ingest records into Firestore.`,
      suggestedAction: { label: "Open Leads CRM", route: "/leads" },
    };
  }

  if (q.includes("alert") || q.includes("anomaly") || q.includes("cpa") || q.includes("surge") || q.includes("mitigate")) {
    return {
      answer: `The **Anomaly Sentinel (\`/alerts\`)** monitors higher-ed ad spend against strict thresholds:\n\n- **Triggers**: Critical alerts fire when CPA exceeds ₹1,500 or conversion rate falls below 1.0%.\n- **AI Diagnosis**: Click **[ Analyze with Gemini ⚡ ]** on any alert for a 2-sentence root-cause diagnosis.\n- **Auto-Mitigate**: Click **[ Auto-Mitigate ]** to throttle budget and rotate creative variants automatically.`,
      suggestedAction: { label: "View Active Alerts", route: "/alerts" },
    };
  }

  if (q.includes("copy") || q.includes("studio") || q.includes("write") || q.includes("instagram") || q.includes("linkedin") || q.includes("ad")) {
    return {
      answer: `To generate multi-format creative copy in the **AI Content Studio (\`/studio\`)**:\n\n1. Fill in the **Campaign Brief** with target objective, persona (Undergrad, Postgrad, Parents), and brand tone.\n2. Click **Generate Creative Previews** to render live LinkedIn, Instagram Reel, and Google Search ad mockups.\n3. Use the **Live Refinement Toolbar** (*More Academic*, *Punchier*, *Expand*, *Executive*) for instant re-synthesis, and click **[ Save to Archive ]** to persist iterations.`,
      suggestedAction: { label: "Open AI Studio", route: "/studio" },
    };
  }

  return {
    answer: `**Welcome to NEXUS OS!** Here is how your platform is structured:\n\n- **📊 Telemetry Command (\`/dashboard\`)**: Real-time spend, enrollment volume, and CPA efficiency curves.\n- **✍️ AI Content Studio (\`/studio\`)**: Multi-format creative copy generation powered by Gemini 1.5 Pro.\n- **⚠️ Anomaly Sentinel (\`/alerts\`)**: Heuristic budget sentinels and AI root-cause mitigation.\n- **👥 Leads CRM (\`/leads\`)**: Candidate lead scoring and webhook sync with Slate & Salesforce.`,
    suggestedAction: { label: "Go to Dashboard", route: "/dashboard" },
  };
}

import { GoogleGenAI, Type } from "@google/genai";

export interface TravelRecommendation {
  hotel: string;
  restaurants: string[];
  activities: string[];
  budgetBreakdown: {
    stay: string;
    food: string;
    activities: string;
  };
  itinerary: { day: number; plan: string }[];
}

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function getAiRecommendation(city: string, budget: string, duration: string): Promise<TravelRecommendation | null> {
  try {
    const ai = getAiClient();
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Plan a ${duration} trip to ${city} with a budget of ${budget} USD during the 2026 World Cup. Include stadium visits if applicable.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hotel: { type: Type.STRING },
            restaurants: { type: Type.ARRAY, items: { type: Type.STRING } },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } },
            budgetBreakdown: {
              type: Type.OBJECT,
              properties: {
                stay: { type: Type.STRING },
                food: { type: Type.STRING },
                activities: { type: Type.STRING }
              }
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  plan: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Service Error:", error);
    return null;
  }
}

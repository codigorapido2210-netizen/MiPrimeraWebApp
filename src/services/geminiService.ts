import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getDetailedTravelPlan(city: string, budget: string, duration: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Plan a ${duration} trip to ${city} with a budget of ${budget} USD during the 2026 World Cup.`,
      config: {
        systemInstruction: "You are an expert travel concierge for Travel Market 2026. Provide realistic, high-end travel advice including stadiums, hotels, and local restaurants.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hotelRecommendation: { type: Type.STRING },
            restaurants: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            dailyItinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  activity: { type: Type.STRING },
                  evening: { type: Type.STRING }
                }
              }
            },
            budgetEstimation: {
              type: Type.OBJECT,
              properties: {
                stay: { type: Type.STRING },
                food: { type: Type.STRING },
                transport: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
}

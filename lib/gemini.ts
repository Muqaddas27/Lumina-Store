
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAiRecommendation = async (prompt: string, context: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional e-commerce shopping assistant for Lumina Store. 
      Context: ${JSON.stringify(context)}. 
      User Query: ${prompt}.
      Provide a helpful, concise response about products, styles, or shopping advice.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my AI brain right now. Please try again later!";
  }
};

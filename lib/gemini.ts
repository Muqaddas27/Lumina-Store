
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || "";

// Offline AI responses for when API is not available
const generateOfflineResponse = (prompt: string, context: any): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('recommend') || lowerPrompt.includes('suggest') || lowerPrompt.includes('best')) {
    return `I'd recommend checking out our Electronics and Fashion categories! They have the latest trending products. What type of product are you interested in?`;
  }
  
  if (lowerPrompt.includes('price') || lowerPrompt.includes('cost') || lowerPrompt.includes('cheap')) {
    return `We offer products at various price points. Check our category filters to find items within your budget. Would you like to browse a specific category?`;
  }
  
  if (lowerPrompt.includes('shipping') || lowerPrompt.includes('delivery')) {
    return `We provide reliable shipping across Pakistan. Delivery times vary by location. Check your cart for shipping details during checkout!`;
  }
  
  if (lowerPrompt.includes('return') || lowerPrompt.includes('refund')) {
    return `We offer 30-day returns on most items. Visit our FAQ page for detailed return and refund policies.`;
  }
  
  if (lowerPrompt.includes('help') || lowerPrompt.includes('support')) {
    return `Happy to help! You can browse products by category, search for specific items, or check our FAQ page. What can I assist you with today?`;
  }
  
  return `Thanks for reaching out! I can help you find products, answer questions about shipping, returns, and more. What would you like to know about Lumina Store?`;
};

export const getAiRecommendation = async (prompt: string, context: any) => {
  try {
    if (!API_KEY) {
      // Use offline response if no API key is configured
      return generateOfflineResponse(prompt, context);
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `You are a professional e-commerce shopping assistant for Lumina Store. 
      Context: ${JSON.stringify(context)}. 
      User Query: ${prompt}.
      Provide a helpful, concise response about products, styles, or shopping advice.`,
    });
    return response.text || "I couldn't generate a response. Please try again!";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    // Fallback to offline response on error
    return generateOfflineResponse(prompt, context);
  }
};

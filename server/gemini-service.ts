import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface UserPreferences {
  dietaryGoals: string;
  restrictions: string;
  budget: string;
  cuisinePreference: string;
}

interface MealRecommendation {
  name: string;
  description: string;
  nutritionInfo: string;
  ingredients: string[];
  benefits: string[];
}

export async function analyzeDocumentAndGetRecommendations(
  documentText: string,
  preferences: UserPreferences
): Promise<MealRecommendation[]> {
  try {
    const systemPrompt = `You are a nutrition expert AI that analyzes health documents and provides personalized meal recommendations.

Analyze the provided document and user preferences to suggest 5 healthy meal recommendations that:
1. Align with any health conditions or nutritional needs mentioned in the document
2. Match the user's dietary goals and restrictions
3. Fit within their budget range
4. Consider their cuisine preferences

For each recommendation, provide:
- A meal name
- A brief description
- Nutrition information (calories, macros, key nutrients)
- Main ingredients list
- Health benefits specific to the user

User Preferences:
- Dietary Goals: ${preferences.dietaryGoals}
- Dietary Restrictions: ${preferences.restrictions}
- Budget: ${preferences.budget}
- Cuisine Preference: ${preferences.cuisinePreference}

Respond with JSON in this exact format:
{
  "recommendations": [
    {
      "name": "meal name",
      "description": "brief description",
      "nutritionInfo": "calories and key nutrition facts",
      "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
      "benefits": ["benefit1", "benefit2", "benefit3"]
    }
  ]
}`;

    const prompt = `${systemPrompt}

Document to analyze:
${documentText}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    // Fix: Access text as a property (it's a getter, not a function)
    const rawJson = response.text;
    
    if (rawJson) {
      try {
        const data = JSON.parse(rawJson);
        // Validate the response structure
        if (data && Array.isArray(data.recommendations)) {
          return data.recommendations;
        } else {
          throw new Error("Invalid response structure from AI model");
        }
      } catch (parseError) {
        console.error("Failed to parse AI response JSON:", parseError);
        throw new Error("Invalid JSON response from AI model");
      }
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error("Failed to analyze document:", error);
    throw new Error(`Failed to analyze document: ${error}`);
  }
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  // For now, return a placeholder. In a real implementation, 
  // you would use a PDF parsing library like pdf-parse
  // or send the PDF directly to Gemini for analysis
  return "This is placeholder text extracted from the PDF document. In a real implementation, this would contain the actual extracted text from the uploaded PDF file.";
}
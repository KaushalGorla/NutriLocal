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
    // Handle API overload by providing fallback recommendations
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }
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
    
    // If API is overloaded, provide fallback recommendations based on preferences
    if (error && typeof error === 'object' && 'status' in error && error.status === 503) {
      console.log("Gemini API overloaded, providing fallback recommendations");
      return getFallbackRecommendations(preferences);
    }
    
    throw new Error(`Failed to analyze document: ${error}`);
  }
}

// Fallback recommendations when API is unavailable
function getFallbackRecommendations(preferences: UserPreferences): MealRecommendation[] {
  const baseRecommendations = [
    {
      name: "Mediterranean Quinoa Bowl",
      description: "A nutrient-rich bowl with quinoa, fresh vegetables, and healthy fats",
      nutritionInfo: "450 calories, 15g protein, 8g fiber, rich in omega-3s",
      ingredients: ["quinoa", "chickpeas", "cucumber", "tomatoes", "olive oil", "feta cheese"],
      benefits: ["heart healthy", "high protein", "anti-inflammatory", "supports weight management"]
    },
    {
      name: "Grilled Salmon Salad",
      description: "Fresh greens with grilled salmon and avocado",
      nutritionInfo: "380 calories, 28g protein, rich in omega-3 fatty acids",
      ingredients: ["wild salmon", "mixed greens", "avocado", "cherry tomatoes", "lemon dressing"],
      benefits: ["brain health", "heart healthy", "high quality protein", "nutrient dense"]
    },
    {
      name: "Vegetable Stir-Fry with Tofu",
      description: "Colorful vegetables stir-fried with protein-rich tofu",
      nutritionInfo: "320 calories, 18g protein, high in vitamins and minerals",
      ingredients: ["firm tofu", "broccoli", "bell peppers", "snap peas", "ginger", "brown rice"],
      benefits: ["plant-based protein", "high fiber", "antioxidant rich", "supports digestion"]
    }
  ];

  // Filter based on dietary goals
  if (preferences.dietaryGoals === 'weight-loss') {
    return baseRecommendations.map(rec => ({
      ...rec,
      description: rec.description + " - optimized for weight management",
      benefits: [...rec.benefits, "supports weight loss"]
    }));
  }

  if (preferences.dietaryGoals === 'muscle-gain') {
    return baseRecommendations.map(rec => ({
      ...rec,
      description: rec.description + " - enhanced with extra protein",
      benefits: [...rec.benefits, "supports muscle building"]
    }));
  }

  return baseRecommendations;
}

// Generate personalized meal recommendations for Discover tab
export async function generatePersonalizedRecommendations(
  userProfile: {
    dietaryGoals: string;
    restrictions: string;
    budget: string;
    cuisinePreference: string;
    activityLevel?: string;
    healthConditions?: string;
  }
): Promise<MealRecommendation[]> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("GEMINI_API_KEY not configured, using fallback recommendations");
      return getFallbackRecommendations(userProfile);
    }

    const systemPrompt = `You are a nutrition expert AI that creates personalized meal recommendations based on user profiles.

Create 6 healthy meal recommendations that perfectly match the user's profile:
- Align with their dietary goals and activity level
- Respect their dietary restrictions and health conditions
- Fit within their budget range
- Consider their cuisine preferences
- Focus on meals available at local restaurants and food trucks

User Profile:
- Dietary Goals: ${userProfile.dietaryGoals}
- Dietary Restrictions: ${userProfile.restrictions || 'None'}
- Budget: ${userProfile.budget}
- Cuisine Preference: ${userProfile.cuisinePreference || 'Any'}
- Activity Level: ${userProfile.activityLevel || 'Moderate'}
- Health Conditions: ${userProfile.healthConditions || 'None'}

For each recommendation, provide:
- A realistic meal name that could be found at restaurants
- A brief, appetizing description
- Detailed nutrition information (calories, protein, carbs, fats, fiber)
- Main ingredients list
- Specific health benefits for this user
- Estimated price range based on their budget

Respond with JSON in this exact format:
{
  "recommendations": [
    {
      "name": "meal name",
      "description": "brief appetizing description",
      "nutritionInfo": "calories, protein, carbs, fats, fiber",
      "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
      "benefits": ["benefit1", "benefit2", "benefit3"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
      contents: "Generate personalized meal recommendations based on the user profile provided above.",
    });

    const rawJson = response.text;
    
    if (rawJson) {
      try {
        const data = JSON.parse(rawJson);
        if (data && Array.isArray(data.recommendations)) {
          return data.recommendations;
        } else {
          throw new Error("Invalid response structure from AI model");
        }
      } catch (parseError) {
        console.error("Failed to parse AI response JSON:", parseError);
        return getFallbackRecommendations(userProfile);
      }
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error("Failed to generate personalized recommendations:", error);
    
    if (error && typeof error === 'object' && 'status' in error && error.status === 503) {
      console.log("Gemini API overloaded, providing fallback recommendations");
    }
    
    return getFallbackRecommendations(userProfile);
  }
}

// Generate AI-enhanced restaurant recommendations for Maps
export async function generateRestaurantRecommendations(
  location: { lat: number; lng: number },
  userPreferences?: {
    dietaryGoals?: string;
    restrictions?: string;
    budget?: string;
    cuisinePreference?: string;
  }
): Promise<Array<{
  id: string;
  name: string;
  type: 'restaurant' | 'food_truck';
  cuisine: string;
  rating: number;
  lat: number;
  lng: number;
  distance: number;
  description: string;
  healthyOptions: string[];
  priceRange: string;
}>> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("GEMINI_API_KEY not configured, using fallback restaurants");
      return getFallbackRestaurants(location);
    }

    const systemPrompt = `You are a local restaurant expert AI that recommends healthy restaurants and food trucks.

Generate 8 realistic restaurant and food truck recommendations for the location lat: ${location.lat}, lng: ${location.lng}.

${userPreferences ? `
Consider user preferences:
- Dietary Goals: ${userPreferences.dietaryGoals || 'General health'}
- Dietary Restrictions: ${userPreferences.restrictions || 'None'}
- Budget: ${userPreferences.budget || 'Any'}
- Cuisine Preference: ${userPreferences.cuisinePreference || 'Any'}` : ''}

Create diverse recommendations including:
- 4-5 restaurants with permanent locations
- 3-4 food trucks with mobile locations
- Mix of different healthy cuisine types
- Variety of price ranges
- All should offer genuinely healthy, nutritious options

For each recommendation, provide:
- Realistic restaurant/food truck name
- Type (restaurant or food_truck)
- Cuisine type focused on healthy options
- Rating between 4.2-4.9
- Coordinates within 0.01 degrees of the given location
- Distance in miles (0.1-2.0)
- Brief description highlighting healthy offerings
- List of specific healthy menu options
- Price range (Budget/Moderate/Premium)

Respond with JSON in this exact format:
{
  "restaurants": [
    {
      "id": "unique-id",
      "name": "restaurant name",
      "type": "restaurant",
      "cuisine": "cuisine type",
      "rating": 4.7,
      "lat": ${location.lat + 0.001},
      "lng": ${location.lng + 0.001},
      "distance": 0.3,
      "description": "brief description of healthy offerings",
      "healthyOptions": ["option1", "option2", "option3"],
      "priceRange": "Moderate"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
      contents: "Generate restaurant recommendations for the specified location and preferences.",
    });

    const rawJson = response.text;
    
    if (rawJson) {
      try {
        const data = JSON.parse(rawJson);
        if (data && Array.isArray(data.restaurants)) {
          return data.restaurants;
        } else {
          throw new Error("Invalid response structure from AI model");
        }
      } catch (parseError) {
        console.error("Failed to parse AI restaurant response JSON:", parseError);
        return getFallbackRestaurants(location);
      }
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error("Failed to generate restaurant recommendations:", error);
    
    if (error && typeof error === 'object' && 'status' in error && error.status === 503) {
      console.log("Gemini API overloaded, providing fallback restaurants");
    }
    
    return getFallbackRestaurants(location);
  }
}

// Fallback restaurants when API is unavailable
function getFallbackRestaurants(location: { lat: number; lng: number }) {
  const { lat, lng } = location;
  return [
    {
      id: '1',
      name: 'Green Bowl Co.',
      type: 'restaurant' as const,
      cuisine: 'Healthy Bowls',
      rating: 4.8,
      lat: lat + 0.001,
      lng: lng + 0.001,
      distance: 0.1,
      description: 'Fresh, customizable bowls with organic ingredients and superfoods',
      healthyOptions: ['Quinoa Power Bowl', 'Kale Caesar Salad', 'Protein Smoothie Bowls'],
      priceRange: 'Moderate'
    },
    {
      id: '2',
      name: 'Sunshine Food Truck',
      type: 'food_truck' as const,
      cuisine: 'Organic Wraps',
      rating: 4.6,
      lat: lat - 0.002,
      lng: lng + 0.002,
      distance: 0.2,
      description: 'Mobile organic wrap truck with locally-sourced ingredients',
      healthyOptions: ['Avocado Veggie Wrap', 'Grilled Chicken & Hummus', 'Fresh Fruit Bowls'],
      priceRange: 'Budget'
    },
    {
      id: '3',
      name: 'Fresh Start Cafe',
      type: 'restaurant' as const,
      cuisine: 'Plant-Based',
      rating: 4.7,
      lat: lat + 0.003,
      lng: lng - 0.001,
      distance: 0.3,
      description: 'All-plant cafe specializing in nutrient-dense meals and cold-pressed juices',
      healthyOptions: ['Buddha Bowl', 'Raw Zucchini Noodles', 'Green Goddess Smoothie'],
      priceRange: 'Moderate'
    },
    {
      id: '4',
      name: 'Protein Power Truck',
      type: 'food_truck' as const,
      cuisine: 'High Protein',
      rating: 4.5,
      lat: lat - 0.001,
      lng: lng - 0.003,
      distance: 0.4,
      description: 'Fitness-focused food truck with lean proteins and performance nutrition',
      healthyOptions: ['Grilled Salmon Plate', 'Turkey & Sweet Potato', 'Protein Power Bowls'],
      priceRange: 'Moderate'
    }
  ];
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  // For now, return a placeholder. In a real implementation, 
  // you would use a PDF parsing library like pdf-parse
  // or send the PDF directly to Gemini for analysis
  return "This is placeholder text extracted from the PDF document. In a real implementation, this would contain the actual extracted text from the uploaded PDF file.";
}
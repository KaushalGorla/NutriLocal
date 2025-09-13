import type { Express } from "express";
import type { Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertUserProfileSchema } from "@shared/schema";
import { z } from "zod";
import { analyzeDocumentAndGetRecommendations, extractTextFromPDF, generatePersonalizedRecommendations, generateRestaurantRecommendations, generateWeeklyMealPlan } from "./gemini-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add centralized error handler for better error responses
  const handleMulterError = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: "File size exceeds 10MB limit" });
      }
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: "Unexpected file field" });
      }
      return res.status(400).json({ error: "File upload error" });
    }
    if (error.message === 'Only PDF files are allowed') {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }
    next(error);
  };
  // User profile routes
  app.post("/api/user-profile", async (req, res) => {
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.createUserProfile(profileData);
      
      // Generate recommendations for the user
      const recommendations = await storage.generateRecommendations(profileData.userId);
      
      res.json({ profile, recommendations });
    } catch (error) {
      console.error("Error creating user profile:", error);
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.get("/api/user-profile/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/user-profile/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = insertUserProfileSchema.partial().parse(req.body);
      const profile = await storage.updateUserProfile(userId, updates);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      // Regenerate recommendations
      const recommendations = await storage.generateRecommendations(userId);
      
      res.json({ profile, recommendations });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  // AI-enhanced restaurant routes
  app.get("/api/restaurants", async (req, res) => {
    try {
      const { lat, lng, userId } = req.query;
      
      // If location coordinates are provided, use AI to generate location-based recommendations
      if (lat && lng) {
        let userPreferences;
        
        // If userId is provided, get their preferences for personalized recommendations
        if (userId) {
          try {
            const userProfile = await storage.getUserProfile(userId as string);
            if (userProfile) {
              userPreferences = {
                dietaryGoals: `${userProfile.dailyCalories} calories daily`,
                restrictions: userProfile.dietaryRestrictions ? userProfile.dietaryRestrictions.join(', ') : '',
                budget: userProfile.maxMealPrice || 'moderate',
                cuisinePreference: 'healthy options'
              };
            }
          } catch (profileError) {
            console.log("Could not fetch user profile, using basic location recommendations");
          }
        }
        
        // Generate AI-powered restaurant recommendations based on location and preferences
        const aiRestaurants = await generateRestaurantRecommendations(
          { lat: parseFloat(lat as string), lng: parseFloat(lng as string) },
          userPreferences
        );
        
        res.json(aiRestaurants);
      } else {
        // Fallback to stored restaurants if no location provided
        const restaurants = await storage.getRestaurants();
        res.json(restaurants);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/restaurants/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await storage.getRestaurantWithMenuItems(id);
      
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      
      res.json(restaurant);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Menu item routes
  app.get("/api/menu-items", async (req, res) => {
    try {
      const { restaurantId } = req.query;
      const menuItems = await storage.getMenuItems(restaurantId as string);
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/menu-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const menuItem = await storage.getMenuItemWithRestaurant(id);
      
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      
      res.json(menuItem);
    } catch (error) {
      console.error("Error fetching menu item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // AI-powered recommendation routes
  app.get("/api/recommendations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get user profile to generate AI recommendations
      const userProfile = await storage.getUserProfile(userId);
      
      if (!userProfile) {
        // If no profile exists, return empty recommendations
        return res.json([]);
      }
      
      // Generate AI-powered recommendations based on user profile
      const recommendations = await generatePersonalizedRecommendations({
        dietaryGoals: `${userProfile.dailyCalories} calories daily`, // Convert from numeric goals
        restrictions: userProfile.dietaryRestrictions ? userProfile.dietaryRestrictions.join(', ') : '',
        budget: userProfile.maxMealPrice || 'moderate',
        cuisinePreference: 'healthy options', // Default since not in schema
        activityLevel: 'moderate', // Default since not in schema
        healthConditions: '' // Default since not in schema
      });
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/recommendations/:userId/generate", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get user profile for AI generation
      const userProfile = await storage.getUserProfile(userId);
      
      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      
      // Generate new AI recommendations
      const recommendations = await generatePersonalizedRecommendations({
        dietaryGoals: `${userProfile.dailyCalories} calories daily`,
        restrictions: userProfile.dietaryRestrictions ? userProfile.dietaryRestrictions.join(', ') : '',
        budget: userProfile.maxMealPrice || 'moderate',
        cuisinePreference: 'healthy options',
        activityLevel: 'moderate',
        healthConditions: ''
      });
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error generating AI recommendations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Weekly meal plan generation
  app.post("/api/meal-plan/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { lat, lng } = req.body;
      
      // Get user profile
      const userProfile = await storage.getUserProfile(userId);
      
      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      
      // Get nearby restaurants
      let nearbyRestaurants;
      if (lat && lng) {
        nearbyRestaurants = await generateRestaurantRecommendations(
          { lat: parseFloat(lat), lng: parseFloat(lng) },
          {
            dietaryGoals: `${userProfile.dailyCalories} calories daily`,
            restrictions: userProfile.dietaryRestrictions ? userProfile.dietaryRestrictions.join(', ') : '',
            budget: userProfile.maxMealPrice || 'moderate',
            cuisinePreference: 'healthy options'
          }
        );
      } else {
        // Use fallback restaurants if no location provided
        nearbyRestaurants = [
          {
            id: '1',
            name: 'Green Bowl Co.',
            cuisine: 'Healthy Bowls',
            priceRange: 'Moderate',
            healthyOptions: ['Quinoa Power Bowl', 'Kale Caesar Salad', 'Protein Smoothie Bowls']
          },
          {
            id: '2',
            name: 'Fresh Start Cafe',
            cuisine: 'Plant-Based',
            priceRange: 'Moderate',
            healthyOptions: ['Buddha Bowl', 'Raw Zucchini Noodles', 'Green Goddess Smoothie']
          },
          {
            id: '3',
            name: 'Protein Power Truck',
            cuisine: 'High Protein',
            priceRange: 'Moderate',
            healthyOptions: ['Grilled Salmon Plate', 'Turkey & Sweet Potato', 'Protein Power Bowls']
          }
        ];
      }
      
      // Generate weekly meal plan
      const weeklyMealPlan = await generateWeeklyMealPlan({
        dailyCalories: userProfile.dailyCalories,
        proteinTarget: userProfile.proteinTarget,
        maxMealPrice: userProfile.maxMealPrice,
        dietaryRestrictions: userProfile.dietaryRestrictions || undefined
      }, nearbyRestaurants);
      
      res.json(weeklyMealPlan);
    } catch (error) {
      console.error("Error generating weekly meal plan:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Impact dashboard data
  app.get("/api/impact/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Mock impact data - in a real app this would be calculated from user orders
      const impact = {
        businessesSupported: 8,
        foodWasteSaved: "12.3",
        mealsDonated: 24,
        carbonSaved: "156",
        achievements: [
          {
            id: "community-champion",
            name: "Community Champion",
            description: "Supported 5+ local businesses",
            icon: "medal",
            earned: true,
          },
          {
            id: "waste-warrior",
            name: "Waste Warrior",
            description: "Saved 10+ lbs of food waste",
            icon: "recycle",
            earned: true,
          },
          {
            id: "health-hero",
            name: "Health Hero",
            description: "Hit nutrition goals 30 days",
            icon: "heart",
            earned: true,
          },
        ],
      };
      
      res.json(impact);
    } catch (error) {
      console.error("Error fetching impact data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // AI Meal Recommendations from PDF documents
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed'));
      }
    }
  });

  // Validation schema for AI meal preferences
  const aiMealPreferencesSchema = z.object({
    dietaryGoals: z.string().min(1, "Dietary goals are required"),
    restrictions: z.string().optional().default(""),
    budget: z.string().min(1, "Budget range is required"),
    cuisinePreference: z.string().optional().default("")
  });

  app.post("/api/ai-meal-recommendations", upload.single('document'), handleMulterError, async (req: Request, res: Response) => {
    try {
      // Validate file upload
      if (!req.file) {
        return res.status(400).json({ error: "No PDF file uploaded" });
      }

      // Additional file validation
      if (req.file.size > 10 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 10MB limit" });
      }

      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: "Only PDF files are allowed" });
      }

      // Validate and parse preferences
      let preferences;
      try {
        const rawPreferences = JSON.parse(req.body.preferences || '{}');
        preferences = aiMealPreferencesSchema.parse(rawPreferences);
      } catch (parseError) {
        return res.status(400).json({ 
          error: "Invalid preferences data", 
          details: parseError instanceof z.ZodError ? parseError.errors : "Invalid JSON" 
        });
      }
      
      // Extract text from PDF
      const documentText = await extractTextFromPDF(req.file.buffer);
      
      // Get AI recommendations using Gemini
      const recommendations = await analyzeDocumentAndGetRecommendations(documentText, preferences);
      
      res.json({ recommendations });
    } catch (error) {
      console.error("Error processing AI recommendations:", error);
      
      // Handle specific Gemini API errors
      if (error instanceof Error && error.message.includes('API key')) {
        return res.status(500).json({ error: "AI service configuration error" });
      }
      
      res.status(500).json({ error: "Failed to process document and generate recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

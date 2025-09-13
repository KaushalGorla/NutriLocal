import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Restaurant routes
  app.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getRestaurants();
      res.json(restaurants);
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

  // Recommendation routes
  app.get("/api/recommendations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const recommendations = await storage.getUserRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/recommendations/:userId/generate", async (req, res) => {
    try {
      const { userId } = req.params;
      const recommendations = await storage.generateRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
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

  const httpServer = createServer(app);
  return httpServer;
}

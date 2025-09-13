import { eq, and, desc } from "drizzle-orm";
import { db } from "./db";
import { 
  users, 
  userProfiles, 
  restaurants, 
  menuItems, 
  userRecommendations,
  type User, 
  type InsertUser, 
  type UserProfile, 
  type InsertUserProfile,
  type Restaurant,
  type InsertRestaurant,
  type MenuItem,
  type InsertMenuItem,
  type UserRecommendation,
  type InsertUserRecommendation,
  type RestaurantWithMenuItems,
  type MenuItemWithRestaurant,
  type RecommendationWithDetails
} from "@shared/schema";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private async seedData() {
    // Check if restaurants already exist
    const existingRestaurants = await db.select().from(restaurants).limit(1);
    if (existingRestaurants.length > 0) {
      return; // Data already seeded
    }

    // Seed restaurants
    const restaurantData = [
      {
        name: "Green Garden Bistro",
        description: "Family-owned Mediterranean restaurant focusing on fresh, locally-sourced ingredients with extensive vegan and vegetarian options.",
        address: "123 Health St, Wellness City, WC 12345",
        phone: "(555) 123-4567",
        latitude: "40.7128",
        longitude: "-74.0060",
        rating: "4.8",
        reviewCount: 124,
        priceLevel: 2,
        cuisineType: "Mediterranean",
        isWomanOwned: true,
        isMinorityOwned: false,
        isFamilyOwned: true,
        localFarmCount: 5,
        employeeCount: 12,
        mealsDonatedThisYear: 500,
      },
      {
        name: "Coastal Kitchen",
        description: "Fresh seafood and sustainable dishes from local fishermen, specializing in healthy preparations.",
        address: "456 Ocean Ave, Coastal City, CC 67890",
        phone: "(555) 987-6543",
        latitude: "40.7589",
        longitude: "-73.9851",
        rating: "4.9",
        reviewCount: 89,
        priceLevel: 3,
        cuisineType: "Seafood",
        isWomanOwned: false,
        isMinorityOwned: false,
        isFamilyOwned: true,
        localFarmCount: 3,
        employeeCount: 15,
        mealsDonatedThisYear: 200,
      },
      {
        name: "Mindful Eats",
        description: "Plant-based restaurant committed to organic, locally-sourced ingredients and zero-waste practices.",
        address: "789 Zen Blvd, Mindful City, MC 54321",
        phone: "(555) 456-7890",
        latitude: "40.7282",
        longitude: "-73.9942",
        rating: "4.7",
        reviewCount: 156,
        priceLevel: 1,
        cuisineType: "Plant-Based",
        isWomanOwned: false,
        isMinorityOwned: true,
        isFamilyOwned: false,
        localFarmCount: 8,
        employeeCount: 10,
        mealsDonatedThisYear: 750,
      }
    ];

    const insertedRestaurants = await db.insert(restaurants).values(restaurantData).returning();

    // Seed menu items
    const menuItemsData = [
      {
        restaurantId: insertedRestaurants[0].id,
        name: "Mediterranean Quinoa Bowl",
        description: "Organic quinoa, roasted vegetables, chickpeas, tahini dressing, fresh herbs",
        price: "11.50",
        calories: 485,
        protein: "32.00",
        carbs: "58.00",
        fat: "18.00",
        isVegan: true,
        isVegetarian: true,
        isGlutenFree: true,
        isKeto: false,
        isDairyFree: true,
        isNutFree: false,
        isHalal: true,
        isKosher: true,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        restaurantId: insertedRestaurants[1].id,
        name: "Grilled Salmon Power Salad",
        description: "Wild-caught salmon, mixed greens, avocado, cherry tomatoes, olive oil dressing",
        price: "14.75",
        calories: 420,
        protein: "38.00",
        carbs: "12.00",
        fat: "24.00",
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: true,
        isKeto: true,
        isDairyFree: true,
        isNutFree: true,
        isHalal: false,
        isKosher: false,
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        restaurantId: insertedRestaurants[2].id,
        name: "Rainbow Buddha Bowl",
        description: "Colorful mix of roasted vegetables, hemp seeds, tahini dressing, microgreens",
        price: "9.95",
        calories: 395,
        protein: "24.00",
        carbs: "45.00",
        fat: "16.00",
        isVegan: true,
        isVegetarian: true,
        isGlutenFree: true,
        isKeto: false,
        isDairyFree: true,
        isNutFree: false,
        isHalal: true,
        isKosher: true,
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        restaurantId: insertedRestaurants[0].id,
        name: "Greek Chicken Wrap",
        description: "Grilled chicken, tzatziki, cucumber, tomato, red onion in whole wheat wrap",
        price: "12.25",
        calories: 520,
        protein: "35.00",
        carbs: "42.00",
        fat: "20.00",
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false,
        isKeto: false,
        isDairyFree: false,
        isNutFree: true,
        isHalal: false,
        isKosher: false,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        restaurantId: insertedRestaurants[1].id,
        name: "Seared Tuna Poke Bowl",
        description: "Seared ahi tuna, brown rice, edamame, cucumber, seaweed salad",
        price: "16.50",
        calories: 445,
        protein: "42.00",
        carbs: "35.00",
        fat: "15.00",
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: true,
        isKeto: false,
        isDairyFree: true,
        isNutFree: true,
        isHalal: false,
        isKosher: false,
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
      {
        restaurantId: insertedRestaurants[2].id,
        name: "Lentil Power Curry",
        description: "Red lentils, coconut milk, spinach, spices, served with quinoa",
        price: "10.75",
        calories: 380,
        protein: "28.00",
        carbs: "52.00",
        fat: "12.00",
        isVegan: true,
        isVegetarian: true,
        isGlutenFree: true,
        isKeto: false,
        isDairyFree: true,
        isNutFree: true,
        isHalal: true,
        isKosher: true,
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      },
    ];

    await db.insert(menuItems).values(menuItemsData);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
    return result[0];
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values([insertProfile]).returning();
    return result[0];
  }

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const result = await db.update(userProfiles)
      .set(updates)
      .where(eq(userProfiles.userId, userId))
      .returning();
    return result[0];
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return await db.select().from(restaurants);
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    const result = await db.select().from(restaurants).where(eq(restaurants.id, id)).limit(1);
    return result[0];
  }

  async getRestaurantWithMenuItems(id: string): Promise<RestaurantWithMenuItems | undefined> {
    const restaurant = await this.getRestaurant(id);
    if (!restaurant) return undefined;
    
    const restaurantMenuItems = await db.select().from(menuItems).where(eq(menuItems.restaurantId, id));
    return { ...restaurant, menuItems: restaurantMenuItems };
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const result = await db.insert(restaurants).values(insertRestaurant).returning();
    return result[0];
  }

  async getMenuItems(restaurantId?: string): Promise<MenuItem[]> {
    if (restaurantId) {
      return await db.select().from(menuItems).where(eq(menuItems.restaurantId, restaurantId));
    }
    return await db.select().from(menuItems);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    const result = await db.select().from(menuItems).where(eq(menuItems.id, id)).limit(1);
    return result[0];
  }

  async getMenuItemWithRestaurant(id: string): Promise<MenuItemWithRestaurant | undefined> {
    const result = await db.select()
    .from(menuItems)
    .innerJoin(restaurants, eq(menuItems.restaurantId, restaurants.id))
    .where(eq(menuItems.id, id))
    .limit(1);

    if (result.length === 0) return undefined;

    const { menu_items, restaurants: restaurant } = result[0];
    return { ...menu_items, restaurant } as MenuItemWithRestaurant;
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const result = await db.insert(menuItems).values(insertMenuItem).returning();
    return result[0];
  }

  async getUserRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const result = await db.select()
    .from(userRecommendations)
    .innerJoin(menuItems, eq(userRecommendations.menuItemId, menuItems.id))
    .innerJoin(restaurants, eq(menuItems.restaurantId, restaurants.id))
    .where(eq(userRecommendations.userId, userId))
    .orderBy(desc(userRecommendations.matchScore));

    return result.map(({ user_recommendations, menu_items, restaurants }) => ({
      ...user_recommendations,
      menuItem: menu_items,
      restaurant: restaurants,
    })) as RecommendationWithDetails[];
  }

  async createUserRecommendation(insertRecommendation: InsertUserRecommendation): Promise<UserRecommendation> {
    const result = await db.insert(userRecommendations).values(insertRecommendation).returning();
    return result[0];
  }

  async generateRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const profile = await this.getUserProfile(userId);
    if (!profile) return [];

    // Clear existing recommendations
    await db.delete(userRecommendations).where(eq(userRecommendations.userId, userId));

    const allMenuItems = await db.select()
    .from(menuItems)
    .innerJoin(restaurants, eq(menuItems.restaurantId, restaurants.id));

    const recommendations: Array<InsertUserRecommendation & { menuItem: MenuItem; restaurant: Restaurant }> = [];

    for (const { menu_items: menuItem, restaurants: restaurant } of allMenuItems) {
      // Calculate match score based on user preferences
      let matchScore = 0;
      const reasonTags: string[] = [];

      // Price matching (40% of score)
      const itemPrice = parseFloat(menuItem.price);
      const maxPrice = parseFloat(profile.maxMealPrice);
      if (itemPrice <= maxPrice) {
        matchScore += 40;
        if (itemPrice <= maxPrice * 0.8) {
          matchScore += 10;
          reasonTags.push("Budget Friendly");
        }
      } else {
        matchScore -= 20; // Penalty for over budget
      }

      // Nutrition matching (40% of score)
      const calorieTarget = profile.dailyCalories / 3; // Assume 3 meals per day
      const calorieDiff = Math.abs((menuItem as any).calories - calorieTarget) / calorieTarget;
      if (calorieDiff < 0.2) {
        matchScore += 20;
        reasonTags.push("Perfect Portions");
      } else if (calorieDiff < 0.4) {
        matchScore += 10;
      }

      // Protein matching
      const proteinTarget = profile.proteinTarget / 3;
      const proteinValue = parseFloat((menuItem as any).protein);
      if (proteinValue >= proteinTarget * 0.8) {
        matchScore += 20;
        if (proteinValue >= proteinTarget * 1.2) {
          reasonTags.push("High Protein");
        }
      }

      // Dietary restrictions matching (20% of score)
      const restrictions = profile.dietaryRestrictions || [];
      let restrictionMatch = true;
      
      restrictions.forEach(restriction => {
        const item = menuItem as any;
        switch (restriction.toLowerCase()) {
          case "vegetarian":
            if (item.isVegetarian) {
              matchScore += 5;
              reasonTags.push("Vegetarian");
            } else {
              restrictionMatch = false;
            }
            break;
          case "vegan":
            if (item.isVegan) {
              matchScore += 5;
              reasonTags.push("Vegan");
            } else {
              restrictionMatch = false;
            }
            break;
          case "gluten-free":
            if (item.isGlutenFree) {
              matchScore += 5;
              reasonTags.push("Gluten-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "keto":
            if (item.isKeto) {
              matchScore += 5;
              reasonTags.push("Keto");
            } else {
              restrictionMatch = false;
            }
            break;
          case "dairy-free":
            if (item.isDairyFree) {
              matchScore += 5;
              reasonTags.push("Dairy-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "nut-free":
            if (item.isNutFree) {
              matchScore += 5;
              reasonTags.push("Nut-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "halal":
            if (item.isHalal) {
              matchScore += 5;
              reasonTags.push("Halal");
            } else {
              restrictionMatch = false;
            }
            break;
          case "kosher":
            if (item.isKosher) {
              matchScore += 5;
              reasonTags.push("Kosher");
            } else {
              restrictionMatch = false;
            }
            break;
        }
      });

      if (!restrictionMatch) {
        continue; // Skip items that don't match dietary restrictions
      }

      // Local business bonus
      const restaurantData = restaurant as any;
      if (restaurantData.isWomanOwned || restaurantData.isMinorityOwned || restaurantData.isFamilyOwned) {
        matchScore += 5;
        reasonTags.push("Local Business");
      }

      // Ensure score is between 0-100
      matchScore = Math.max(0, Math.min(100, matchScore));

      if (matchScore >= 30) { // Only include decent matches
        const recommendation = {
          userId,
          menuItemId: (menuItem as any).id,
          matchScore,
          reasonTags,
        };

        recommendations.push({ ...recommendation, menuItem: menuItem as MenuItem, restaurant: restaurant as Restaurant });
      }
    }

    // Insert recommendations into database
    if (recommendations.length > 0) {
      await db.insert(userRecommendations).values(
        recommendations.map(({ menuItem, restaurant, ...rec }) => ({
          ...rec,
          reasonTags: rec.reasonTags.length > 0 ? rec.reasonTags : null
        }))
      );
    }

    return recommendations.sort((a, b) => b.matchScore - a.matchScore) as RecommendationWithDetails[];
  }
}
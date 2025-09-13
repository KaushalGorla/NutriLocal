import { 
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
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User Profiles
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  getRestaurantWithMenuItems(id: string): Promise<RestaurantWithMenuItems | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Menu Items
  getMenuItems(restaurantId?: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  getMenuItemWithRestaurant(id: string): Promise<MenuItemWithRestaurant | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  
  // Recommendations
  getUserRecommendations(userId: string): Promise<RecommendationWithDetails[]>;
  createUserRecommendation(recommendation: InsertUserRecommendation): Promise<UserRecommendation>;
  generateRecommendations(userId: string): Promise<RecommendationWithDetails[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();
  private restaurants: Map<string, Restaurant> = new Map();
  private menuItems: Map<string, MenuItem> = new Map();
  private userRecommendations: Map<string, UserRecommendation> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed restaurants
    const restaurant1: Restaurant = {
      id: "rest-1",
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
    };

    const restaurant2: Restaurant = {
      id: "rest-2",
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
    };

    const restaurant3: Restaurant = {
      id: "rest-3",
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
    };

    this.restaurants.set(restaurant1.id, restaurant1);
    this.restaurants.set(restaurant2.id, restaurant2);
    this.restaurants.set(restaurant3.id, restaurant3);

    // Seed menu items
    const menuItems: MenuItem[] = [
      {
        id: "item-1",
        restaurantId: "rest-1",
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
        id: "item-2",
        restaurantId: "rest-2",
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
        id: "item-3",
        restaurantId: "rest-3",
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
        id: "item-4",
        restaurantId: "rest-1",
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
        id: "item-5",
        restaurantId: "rest-2",
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
        id: "item-6",
        restaurantId: "rest-3",
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

    menuItems.forEach(item => this.menuItems.set(item.id, item));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(profile => profile.userId === userId);
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const profile: UserProfile = { 
      ...insertProfile, 
      id,
      carbLimit: insertProfile.carbLimit ?? null,
      fatTarget: insertProfile.fatTarget ?? null,
      monthlyBudget: insertProfile.monthlyBudget ?? null,
      dietaryRestrictions: Array.isArray(insertProfile.dietaryRestrictions) ? [...insertProfile.dietaryRestrictions] as string[] : null
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = await this.getUserProfile(userId);
    if (!existing) return undefined;
    
    const updated: UserProfile = { 
      ...existing, 
      ...updates,
      carbLimit: updates.carbLimit ?? existing.carbLimit,
      fatTarget: updates.fatTarget ?? existing.fatTarget,
      monthlyBudget: updates.monthlyBudget ?? existing.monthlyBudget,
      dietaryRestrictions: Array.isArray(updates.dietaryRestrictions) ? [...updates.dietaryRestrictions] as string[] : existing.dietaryRestrictions
    };
    this.userProfiles.set(existing.id, updated);
    return updated;
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getRestaurantWithMenuItems(id: string): Promise<RestaurantWithMenuItems | undefined> {
    const restaurant = this.restaurants.get(id);
    if (!restaurant) return undefined;
    
    const menuItems = Array.from(this.menuItems.values()).filter(item => item.restaurantId === id);
    return { ...restaurant, menuItems };
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = { 
      ...insertRestaurant, 
      id,
      phone: insertRestaurant.phone ?? null,
      latitude: insertRestaurant.latitude ?? null,
      longitude: insertRestaurant.longitude ?? null,
      rating: insertRestaurant.rating ?? "0",
      reviewCount: insertRestaurant.reviewCount ?? 0,
      isWomanOwned: insertRestaurant.isWomanOwned ?? false,
      isMinorityOwned: insertRestaurant.isMinorityOwned ?? false,
      isFamilyOwned: insertRestaurant.isFamilyOwned ?? false,
      localFarmCount: insertRestaurant.localFarmCount ?? 0,
      employeeCount: insertRestaurant.employeeCount ?? 0,
      mealsDonatedThisYear: insertRestaurant.mealsDonatedThisYear ?? 0
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getMenuItems(restaurantId?: string): Promise<MenuItem[]> {
    const items = Array.from(this.menuItems.values());
    return restaurantId ? items.filter(item => item.restaurantId === restaurantId) : items;
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async getMenuItemWithRestaurant(id: string): Promise<MenuItemWithRestaurant | undefined> {
    const menuItem = this.menuItems.get(id);
    if (!menuItem) return undefined;
    
    const restaurant = this.restaurants.get(menuItem.restaurantId);
    if (!restaurant) return undefined;
    
    return { ...menuItem, restaurant };
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = { 
      ...insertMenuItem, 
      id,
      isVegan: insertMenuItem.isVegan ?? false,
      isVegetarian: insertMenuItem.isVegetarian ?? false,
      isGlutenFree: insertMenuItem.isGlutenFree ?? false,
      isKeto: insertMenuItem.isKeto ?? false,
      isDairyFree: insertMenuItem.isDairyFree ?? false,
      isNutFree: insertMenuItem.isNutFree ?? false,
      isHalal: insertMenuItem.isHalal ?? false,
      isKosher: insertMenuItem.isKosher ?? false,
      imageUrl: insertMenuItem.imageUrl ?? null
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async getUserRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const recommendations = Array.from(this.userRecommendations.values())
      .filter(rec => rec.userId === userId);
    
    const results: RecommendationWithDetails[] = [];
    for (const rec of recommendations) {
      const menuItem = this.menuItems.get(rec.menuItemId);
      const restaurant = menuItem ? this.restaurants.get(menuItem.restaurantId) : undefined;
      
      if (menuItem && restaurant) {
        results.push({ ...rec, menuItem, restaurant });
      }
    }
    
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  async createUserRecommendation(insertRecommendation: InsertUserRecommendation): Promise<UserRecommendation> {
    const id = randomUUID();
    const recommendation: UserRecommendation = { 
      ...insertRecommendation, 
      id,
      reasonTags: Array.isArray(insertRecommendation.reasonTags) ? [...insertRecommendation.reasonTags] as string[] : null
    };
    this.userRecommendations.set(id, recommendation);
    return recommendation;
  }

  async generateRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const profile = await this.getUserProfile(userId);
    if (!profile) return [];

    // Clear existing recommendations
    const existing = Array.from(this.userRecommendations.values())
      .filter(rec => rec.userId === userId);
    existing.forEach(rec => this.userRecommendations.delete(rec.id));

    const allMenuItems = Array.from(this.menuItems.values());
    const recommendations: RecommendationWithDetails[] = [];

    for (const menuItem of allMenuItems) {
      const restaurant = this.restaurants.get(menuItem.restaurantId);
      if (!restaurant) continue;

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
      const calorieDiff = Math.abs(menuItem.calories - calorieTarget) / calorieTarget;
      if (calorieDiff < 0.2) {
        matchScore += 20;
        reasonTags.push("Perfect Portions");
      } else if (calorieDiff < 0.4) {
        matchScore += 10;
      }

      // Protein matching
      const proteinTarget = profile.proteinTarget / 3;
      const proteinValue = parseFloat(menuItem.protein);
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
        switch (restriction.toLowerCase()) {
          case "vegetarian":
            if (menuItem.isVegetarian) {
              matchScore += 5;
              reasonTags.push("Vegetarian");
            } else {
              restrictionMatch = false;
            }
            break;
          case "vegan":
            if (menuItem.isVegan) {
              matchScore += 5;
              reasonTags.push("Vegan");
            } else {
              restrictionMatch = false;
            }
            break;
          case "gluten-free":
            if (menuItem.isGlutenFree) {
              matchScore += 5;
              reasonTags.push("Gluten-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "keto":
            if (menuItem.isKeto) {
              matchScore += 5;
              reasonTags.push("Keto");
            } else {
              restrictionMatch = false;
            }
            break;
          case "dairy-free":
            if (menuItem.isDairyFree) {
              matchScore += 5;
              reasonTags.push("Dairy-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "nut-free":
            if (menuItem.isNutFree) {
              matchScore += 5;
              reasonTags.push("Nut-Free");
            } else {
              restrictionMatch = false;
            }
            break;
          case "halal":
            if (menuItem.isHalal) {
              matchScore += 5;
              reasonTags.push("Halal");
            } else {
              restrictionMatch = false;
            }
            break;
          case "kosher":
            if (menuItem.isKosher) {
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
      if (restaurant.isWomanOwned || restaurant.isMinorityOwned || restaurant.isFamilyOwned) {
        matchScore += 5;
        reasonTags.push("Local Business");
      }

      // Ensure score is between 0-100
      matchScore = Math.max(0, Math.min(100, matchScore));

      if (matchScore >= 30) { // Only include decent matches
        const recommendation: UserRecommendation = {
          id: randomUUID(),
          userId,
          menuItemId: menuItem.id,
          matchScore,
          reasonTags,
        };

        this.userRecommendations.set(recommendation.id, recommendation);
        recommendations.push({ ...recommendation, menuItem, restaurant });
      }
    }

    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  }
}

export const storage = new MemStorage();

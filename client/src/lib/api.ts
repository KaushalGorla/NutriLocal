import { apiRequest } from "./queryClient";
import type { 
  UserProfile, 
  InsertUserProfile, 
  Restaurant, 
  RestaurantWithMenuItems,
  MenuItemWithRestaurant,
  RecommendationWithDetails
} from "@shared/schema";

export const api = {
  // User Profile
  async createUserProfile(profile: InsertUserProfile) {
    const res = await apiRequest("POST", "/api/user-profile", profile);
    return res.json();
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    const res = await apiRequest("GET", `/api/user-profile/${userId}`);
    return res.json();
  },

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>) {
    const res = await apiRequest("PUT", `/api/user-profile/${userId}`, updates);
    return res.json();
  },

  // Restaurants
  async getRestaurants(): Promise<Restaurant[]> {
    const res = await apiRequest("GET", "/api/restaurants");
    return res.json();
  },

  async getRestaurant(id: string): Promise<RestaurantWithMenuItems> {
    const res = await apiRequest("GET", `/api/restaurants/${id}`);
    return res.json();
  },

  // Menu Items
  async getMenuItems(restaurantId?: string) {
    const url = restaurantId ? `/api/menu-items?restaurantId=${restaurantId}` : "/api/menu-items";
    const res = await apiRequest("GET", url);
    return res.json();
  },

  async getMenuItem(id: string): Promise<MenuItemWithRestaurant> {
    const res = await apiRequest("GET", `/api/menu-items/${id}`);
    return res.json();
  },

  // Recommendations
  async getRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const res = await apiRequest("GET", `/api/recommendations/${userId}`);
    return res.json();
  },

  async generateRecommendations(userId: string): Promise<RecommendationWithDetails[]> {
    const res = await apiRequest("POST", `/api/recommendations/${userId}/generate`);
    return res.json();
  },

  // Impact
  async getImpactData(userId: string) {
    const res = await apiRequest("GET", `/api/impact/${userId}`);
    return res.json();
  },
};

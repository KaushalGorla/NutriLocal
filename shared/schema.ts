import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  dailyCalories: integer("daily_calories").notNull(),
  proteinTarget: integer("protein_target").notNull(),
  carbLimit: integer("carb_limit"),
  fatTarget: integer("fat_target"),
  maxMealPrice: decimal("max_meal_price", { precision: 10, scale: 2 }).notNull(),
  monthlyBudget: decimal("monthly_budget", { precision: 10, scale: 2 }),
  dietaryRestrictions: jsonb("dietary_restrictions").$type<string[]>().default([]),
});

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  priceLevel: integer("price_level").notNull(), // 1-4 ($-$$$$)
  cuisineType: text("cuisine_type").notNull(),
  isWomanOwned: boolean("is_woman_owned").default(false),
  isMinorityOwned: boolean("is_minority_owned").default(false),
  isFamilyOwned: boolean("is_family_owned").default(false),
  localFarmCount: integer("local_farm_count").default(0),
  employeeCount: integer("employee_count").default(0),
  mealsDonatedThisYear: integer("meals_donated_this_year").default(0),
});

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  calories: integer("calories").notNull(),
  protein: decimal("protein", { precision: 5, scale: 2 }).notNull(),
  carbs: decimal("carbs", { precision: 5, scale: 2 }).notNull(),
  fat: decimal("fat", { precision: 5, scale: 2 }).notNull(),
  isVegan: boolean("is_vegan").default(false),
  isVegetarian: boolean("is_vegetarian").default(false),
  isGlutenFree: boolean("is_gluten_free").default(false),
  isKeto: boolean("is_keto").default(false),
  isDairyFree: boolean("is_dairy_free").default(false),
  isNutFree: boolean("is_nut_free").default(false),
  isHalal: boolean("is_halal").default(false),
  isKosher: boolean("is_kosher").default(false),
  imageUrl: text("image_url"),
});

export const userRecommendations = pgTable("user_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  menuItemId: varchar("menu_item_id").notNull(),
  matchScore: integer("match_score").notNull(), // 0-100
  reasonTags: jsonb("reason_tags").$type<string[]>().default([]),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ id: true });
export const insertRestaurantSchema = createInsertSchema(restaurants).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertUserRecommendationSchema = createInsertSchema(userRecommendations).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type InsertUserRecommendation = z.infer<typeof insertUserRecommendationSchema>;

export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type Restaurant = typeof restaurants.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type UserRecommendation = typeof userRecommendations.$inferSelect;

// Extended types for API responses
export type RestaurantWithMenuItems = Restaurant & {
  menuItems: MenuItem[];
};

export type MenuItemWithRestaurant = MenuItem & {
  restaurant: Restaurant;
};

export type RecommendationWithDetails = UserRecommendation & {
  menuItem: MenuItem;
  restaurant: Restaurant;
};

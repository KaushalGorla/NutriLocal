import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star, MapPin, Flame, Dumbbell, Leaf, Award } from "lucide-react";
import NutritionTag from "./nutrition-tag";
import type { RecommendationWithDetails } from "@shared/schema";

interface MealCardProps {
  recommendation: RecommendationWithDetails;
  onViewDetails?: (menuItemId: string) => void;
  onOrderMeal?: (menuItemId: string) => void;
}

export default function MealCard({ recommendation, onViewDetails, onOrderMeal }: MealCardProps) {
  const { menuItem, restaurant, matchScore, reasonTags } = recommendation;

  const getBusinessBadge = () => {
    if (restaurant.isWomanOwned) {
      return { text: "Woman-owned local business", color: "bg-accent" };
    } else if (restaurant.isMinorityOwned) {
      return { text: "Minority-owned business", color: "bg-primary" };
    } else if (restaurant.isFamilyOwned) {
      return { text: `Family-owned since ${new Date().getFullYear() - 20}`, color: "bg-secondary" };
    }
    return null;
  };

  const businessBadge = getBusinessBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300">
        {menuItem.imageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {matchScore >= 80 && (
              <Badge 
                className="absolute top-2 left-2 bg-accent text-accent-foreground"
                data-testid="badge-perfect-match"
              >
                <Award className="w-3 h-3 mr-1" />
                Perfect Match
              </Badge>
            )}
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg mb-1" data-testid="text-meal-name">
                {menuItem.name}
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-restaurant-name">
                {restaurant.name}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-primary" data-testid="text-meal-price">
                ${menuItem.price}
              </span>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                0.{Math.floor(Math.random() * 8) + 1} miles
              </p>
            </div>
          </div>

          {/* Nutrition Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <NutritionTag variant="calories" icon={<Flame className="w-3 h-3" />}>
              {menuItem.calories} cal
            </NutritionTag>
            <NutritionTag variant="protein" icon={<Dumbbell className="w-3 h-3" />}>
              {menuItem.protein}g protein
            </NutritionTag>
            {menuItem.isVegan && (
              <NutritionTag variant="dietary" icon={<Leaf className="w-3 h-3" />}>
                Vegan
              </NutritionTag>
            )}
            {menuItem.isVegetarian && !menuItem.isVegan && (
              <NutritionTag variant="dietary" icon={<Leaf className="w-3 h-3" />}>
                Vegetarian
              </NutritionTag>
            )}
            {menuItem.isKeto && (
              <NutritionTag variant="dietary">
                Keto
              </NutritionTag>
            )}
            {menuItem.isGlutenFree && (
              <NutritionTag variant="dietary">
                Gluten-Free
              </NutritionTag>
            )}
          </div>

          {/* Reason Tags */}
          {reasonTags && reasonTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {reasonTags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs"
                  data-testid={`badge-reason-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Business Badge */}
          {businessBadge && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${businessBadge.color} rounded-full`}></div>
                <span className="text-xs text-muted-foreground">{businessBadge.text}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-accent fill-current" />
                <span className="text-xs font-medium">
                  {restaurant.rating} ({restaurant.reviewCount})
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => onViewDetails?.(menuItem.id)}
              variant="outline"
              className="flex-1"
              data-testid="button-view-details"
            >
              View Details
            </Button>
            <Button
              onClick={() => onOrderMeal?.(menuItem.id)}
              className="flex-1 gradient-primary text-primary-foreground hover:opacity-90"
              data-testid="button-order-meal"
            >
              Order Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

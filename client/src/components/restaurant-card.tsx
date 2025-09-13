import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star, MapPin, Utensils, Users } from "lucide-react";
import type { Restaurant } from "@shared/schema";

interface RestaurantCardProps {
  restaurant: Restaurant;
  distance?: number;
  onClick?: (restaurantId: string) => void;
}

export default function RestaurantCard({ restaurant, distance, onClick }: RestaurantCardProps) {
  const getBusinessBadges = () => {
    const badges = [];
    if (restaurant.isWomanOwned) badges.push("Woman-Owned");
    if (restaurant.isMinorityOwned) badges.push("Minority-Owned");
    if (restaurant.isFamilyOwned) badges.push("Family-Owned");
    return badges;
  };

  const businessBadges = getBusinessBadges();
  const priceLevel = "$".repeat(restaurant.priceLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card 
        className="hover:shadow-lg transition-shadow cursor-pointer border border-border"
        onClick={() => onClick?.(restaurant.id)}
        data-testid={`card-restaurant-${restaurant.id}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Utensils className="text-primary w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1" data-testid="text-restaurant-name">
                {restaurant.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-2" data-testid="text-restaurant-cuisine">
                {restaurant.cuisineType}
                {businessBadges.length > 0 && (
                  <span className="ml-1">• {businessBadges[0]}</span>
                )}
              </p>
              <div className="flex items-center space-x-3 text-xs">
                {distance && (
                  <span className="font-medium text-primary flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {distance.toFixed(1)} mi
                  </span>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-accent fill-current" />
                  <span data-testid="text-restaurant-rating">{restaurant.rating}</span>
                </div>
                <span className="text-muted-foreground" data-testid="text-restaurant-price">
                  {priceLevel}
                </span>
              </div>
              
              {/* Community impact indicators */}
              {((restaurant.localFarmCount ?? 0) > 0 || (restaurant.mealsDonatedThisYear ?? 0) > 0) && (
                <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                  {(restaurant.localFarmCount ?? 0) > 0 && (
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {restaurant.localFarmCount} local farms
                    </span>
                  )}
                  {(restaurant.mealsDonatedThisYear ?? 0) > 0 && (
                    <span>• {restaurant.mealsDonatedThisYear}+ meals donated</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import RestaurantCard from "./restaurant-card";
import { api } from "@/lib/api";
import { useLocation } from "wouter";

export default function MapSection() {
  const [, setLocation] = useLocation();
  
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["/api/restaurants"],
    queryFn: api.getRestaurants,
  });

  // Mock distances for demo (in a real app, this would be calculated based on user location)
  const restaurantsWithDistance = restaurants?.map(restaurant => ({
    ...restaurant,
    distance: Math.random() * 2 + 0.1, // Random distance between 0.1 and 2.1 miles
  })) || [];

  const handleRestaurantClick = (restaurantId: string) => {
    setLocation(`/restaurant/${restaurantId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Healthy Restaurants Near You
        </h2>
        <p className="text-xl text-muted-foreground">
          Discover local businesses offering nutritious options in your area
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="map-container aspect-[4/3] lg:aspect-[16/10] p-8 flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div
                className="w-16 h-16 gradient-primary rounded-2xl mx-auto flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MapPin className="text-white text-2xl" size={32} />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">Real-time restaurant locations with health-conscious options</p>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">High Protein</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm">Low Calorie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Local Owned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with restaurant list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Nearby Restaurants</h3>
            <Button variant="outline" size="sm" data-testid="button-filter">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {restaurantsWithDistance
                  .sort((a, b) => a.distance - b.distance)
                  .map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      distance={restaurant.distance}
                      onClick={handleRestaurantClick}
                    />
                  ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                data-testid="button-view-all-restaurants"
              >
                View All {restaurants?.length || 0} Restaurants
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

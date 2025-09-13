import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Star, Clock, Phone, MapPin, Handshake, Award, Users, Heart } from "lucide-react";
import NutritionTag from "@/components/nutrition-tag";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function RestaurantDetail() {
  const [, params] = useRoute("/restaurant/:id");
  const { toast } = useToast();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["/api/restaurants", params?.id],
    queryFn: () => api.getRestaurant(params!.id),
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative">
          <Skeleton className="w-full h-64" />
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link href="/">
            <Button>← Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getBusinessBadges = () => {
    const badges = [];
    if (restaurant.isWomanOwned) {
      badges.push({ text: "Woman-Owned", color: "bg-primary text-primary-foreground" });
    }
    if (restaurant.isMinorityOwned) {
      badges.push({ text: "Minority-Owned", color: "bg-secondary text-secondary-foreground" });
    }
    if (restaurant.isFamilyOwned) {
      badges.push({ text: "Local Favorite", color: "bg-accent text-accent-foreground" });
    }
    return badges;
  };

  const businessBadges = getBusinessBadges();

  const handleOrderOnline = () => {
    toast({
      title: "Redirecting to Restaurant",
      description: "Taking you to the restaurant's online ordering system.",
    });
  };

  const handleGetDirections = () => {
    toast({
      title: "Opening Maps",
      description: "Getting directions to the restaurant.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
          alt="Restaurant interior"
          className="w-full h-64 object-cover"
        />

        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {businessBadges.map((badge, index) => (
            <Badge key={index} className={badge.color}>
              <Award className="w-3 h-3 mr-1" />
              {badge.text}
            </Badge>
          ))}
        </div>

        {/* Back button */}
        <Link href="/">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>

        {/* Favorite button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4"
          data-testid="button-favorite"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Restaurant Info */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold mb-3" data-testid="text-restaurant-name">
                  {restaurant.name}
                </h1>
                <p className="text-muted-foreground mb-4 leading-relaxed" data-testid="text-restaurant-description">
                  {restaurant.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.address}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Open until 9 PM
                  </span>
                  {restaurant.phone && (
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {restaurant.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(restaurant.rating ?? "0"))
                          ? "text-accent fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold" data-testid="text-rating">
                    {restaurant.rating}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4" data-testid="text-review-count">
                  {restaurant.reviewCount} reviews
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleOrderOnline}
                    className="gradient-primary text-primary-foreground hover:opacity-90"
                    data-testid="button-order-online"
                  >
                    Order Online
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGetDirections}
                    data-testid="button-get-directions"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Handshake className="text-primary mr-2" size={20} />
                  Community Impact
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {(restaurant.localFarmCount ?? 0) > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Sources from {restaurant.localFarmCount} local farms</span>
                    </div>
                  )}
                  {(restaurant.employeeCount ?? 0) > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Employs {restaurant.employeeCount} local residents</span>
                    </div>
                  )}
                  {(restaurant.mealsDonatedThisYear ?? 0) > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Donated {restaurant.mealsDonatedThisYear}+ meals this year</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6 flex items-center">
                  <Users className="text-primary mr-2" size={20} />
                  Healthy Menu Highlights
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {restaurant.menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                      data-testid={`menu-item-${item.id}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-lg" data-testid="text-menu-item-name">
                          {item.name}
                        </h4>
                        <span className="font-bold text-primary text-lg" data-testid="text-menu-item-price">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4" data-testid="text-menu-item-description">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <NutritionTag variant="calories">
                          {item.calories} cal
                        </NutritionTag>
                        <NutritionTag variant="protein">
                          {item.protein}g protein
                        </NutritionTag>
                        <NutritionTag variant="default">
                          {item.carbs}g carbs
                        </NutritionTag>
                        <NutritionTag variant="default">
                          {item.fat}g fat
                        </NutritionTag>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.isVegan && (
                          <NutritionTag variant="dietary">Vegan</NutritionTag>
                        )}
                        {item.isVegetarian && !item.isVegan && (
                          <NutritionTag variant="dietary">Vegetarian</NutritionTag>
                        )}
                        {item.isGlutenFree && (
                          <NutritionTag variant="dietary">Gluten-Free</NutritionTag>
                        )}
                        {item.isKeto && (
                          <NutritionTag variant="dietary">Keto</NutritionTag>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

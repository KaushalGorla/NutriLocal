import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProfileSetupForm from "@/components/profile-setup-form";
import MealCard from "@/components/meal-card";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Discover() {
  const [currentUserId] = useState("temp-user-id");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { toast } = useToast();

  const { data: recommendations, refetch: refetchRecommendations } = useQuery({
    queryKey: ["/api/recommendations", currentUserId],
    queryFn: () => api.getRecommendations(currentUserId),
    enabled: false,
  });

  const handleProfileSuccess = () => {
    setShowProfileForm(false);
    refetchRecommendations();
    toast({
      title: "Perfect matches found!",
      description: "We've found healthy meals that match your goals and budget.",
    });
  };

  const handleViewDetails = (menuItemId: string) => {
    toast({
      title: "Meal Details",
      description: "Opening detailed view with nutrition info and ordering options.",
    });
  };

  const handleOrderMeal = (menuItemId: string) => {
    toast({
      title: "Redirecting to Restaurant",
      description: "Taking you to the restaurant's ordering system.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Discover Healthy Meals
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find personalized nutrition matches from local restaurants
        </p>
        
        {!recommendations?.length && (
          <Button
            onClick={() => setShowProfileForm(true)}
            className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-bold"
            data-testid="button-setup-profile"
          >
            Set Up Your Profile
          </Button>
        )}
      </div>

      {/* Profile Setup Section */}
      {showProfileForm && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <ProfileSetupForm onSuccess={handleProfileSuccess} />
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations && recommendations.length > 0 && (
        <section className="py-12 section-restaurants food-pattern">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Perfect Matches for You
                </h2>
                <p className="text-xl text-muted-foreground">
                  Based on your health goals and budget preferences
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((recommendation) => (
                  <MealCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    onViewDetails={handleViewDetails}
                    onOrderMeal={handleOrderMeal}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
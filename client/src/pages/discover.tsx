import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import ProfileSetupForm from "@/components/profile-setup-form";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, DollarSign, Target, Utensils } from "lucide-react";

interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner';
  restaurantName: string;
  mealName: string;
  calories: number;
  protein: number;
  price: string;
  description: string;
  nutritionNotes: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
  dailyTotals: {
    calories: number;
    protein: number;
    estimatedCost: number;
  };
}

interface WeeklyMealPlan {
  weeklyPlan: DayPlan[];
  weeklyTotals: {
    totalCalories: number;
    avgDailyCalories: number;
    totalProtein: number;
    avgDailyProtein: number;
    estimatedWeeklyCost: number;
  };
}

export default function Discover() {
  const [currentUserId] = useState("temp-user-id");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const { toast } = useToast();

  // Generate weekly meal plan
  const generateMealPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      // Get user's current location for nearby restaurants
      let userLocation = { lat: 37.7749, lng: -122.4194 }; // Default to SF
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 });
          });
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        } catch (error) {
          console.log('Using default location');
        }
      }

      const response = await fetch(`/api/meal-plan/${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLocation),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      const plan = await response.json();
      setWeeklyPlan(plan);
      
      toast({
        title: "Weekly Meal Plan Generated!",
        description: "Your personalized 7-day meal plan is ready based on nearby restaurants.",
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleProfileSuccess = () => {
    setShowProfileForm(false);
    generateMealPlan();
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'lunch': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'dinner': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
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
        
        {!weeklyPlan && (
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

      {/* Weekly Meal Plan Section */}
      {weeklyPlan && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Your Personalized Weekly Meal Plan
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  AI-generated plan based on your health goals and nearby restaurants
                </p>
                
                {/* Weekly Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Avg Daily Calories</div>
                      <div className="font-bold">{weeklyPlan.weeklyTotals.avgDailyCalories}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Utensils className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Avg Daily Protein</div>
                      <div className="font-bold">{weeklyPlan.weeklyTotals.avgDailyProtein}g</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Weekly Cost</div>
                      <div className="font-bold">${Number(weeklyPlan.weeklyTotals.estimatedWeeklyCost).toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CalendarDays className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Days Planned</div>
                      <div className="font-bold">{weeklyPlan.weeklyPlan.length}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Daily Plans */}
              <div className="space-y-6">
                {weeklyPlan.weeklyPlan.map((dayPlan, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="w-5 h-5" />
                          {dayPlan.day}
                        </span>
                        <Badge variant="outline">
                          {dayPlan.dailyTotals.calories} cal • {dayPlan.dailyTotals.protein}g protein • ${Number(dayPlan.dailyTotals.estimatedCost).toFixed(2)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        {dayPlan.meals.map((meal, mealIndex) => (
                          <Card key={mealIndex} className="border-2">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <span>{getMealIcon(meal.type)}</span>
                                <Badge className={getMealTypeColor(meal.type)}>
                                  {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <h4 className="font-semibold text-primary">{meal.mealName}</h4>
                                <p className="text-sm text-muted-foreground">{meal.restaurantName}</p>
                              </div>
                              
                              <p className="text-sm">{meal.description}</p>
                              
                              <div className="flex justify-between text-sm">
                                <span>{meal.calories} cal</span>
                                <span>{meal.protein}g protein</span>
                                <span className="font-semibold text-primary">{meal.price}</span>
                              </div>
                              
                              <div className="pt-2 border-t">
                                <p className="text-xs text-muted-foreground italic">
                                  {meal.nutritionNotes}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Regenerate Button */}
              <div className="text-center mt-8">
                <Button
                  onClick={generateMealPlan}
                  disabled={isGeneratingPlan}
                  className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-bold"
                >
                  {isGeneratingPlan ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating New Plan...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Generate New Weekly Plan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
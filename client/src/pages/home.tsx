import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import AnimatedLogo from "@/components/animated-logo";
import ProfileSetupForm from "@/components/profile-setup-form";
import MealCard from "@/components/meal-card";
import MapSection from "@/components/map-section";
import ImpactDashboard from "@/components/impact-dashboard";
import { api } from "@/lib/api";
import { Sparkles, ArrowRight, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentUserId] = useState("temp-user-id"); // In real app, would come from auth
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { toast } = useToast();

  const { data: recommendations, refetch: refetchRecommendations } = useQuery({
    queryKey: ["/api/recommendations", currentUserId],
    queryFn: () => api.getRecommendations(currentUserId),
    enabled: false, // Only fetch after profile creation
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
    // In a real app, this would navigate to a meal detail page
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <AnimatedLogo />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NutriLocal
                </h1>
                <p className="text-xs text-muted-foreground">Healthy • Local • Affordable</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("discover")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-discover"
              >
                Discover
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-map"
              >
                Map
              </button>
              <button
                onClick={() => scrollToSection("impact")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-impact"
              >
                Impact
              </button>
              <Button
                onClick={() => setShowProfileForm(true)}
                className="gradient-primary text-primary-foreground hover:opacity-90"
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            </nav>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" data-testid="button-mobile-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
                  Discover{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Healthy Meals
                  </span>
                  <br />
                  from Local Restaurants
                </h2>
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  Find affordable, nutritious meals that match your health goals while supporting
                  local businesses in your community.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Personalized nutrition matching</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Support local businesses</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Budget-friendly options</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowProfileForm(true)}
                  className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  data-testid="button-setup-profile"
                >
                  <Sparkles className="mr-2" size={20} />
                  Set Up Your Profile
                </Button>
                <Button
                  onClick={() => scrollToSection("discover")}
                  variant="outline"
                  className="px-8 py-4 rounded-xl font-semibold"
                  data-testid="button-explore-restaurants"
                >
                  Explore Restaurants
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Mockup phone showing app interface */}
              <Card className="rounded-3xl p-6 shadow-2xl border border-border max-w-sm mx-auto animate-float">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Daily Goals</h3>
                    <span className="text-sm text-muted-foreground">85% complete</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Calories</span>
                      <span className="text-sm font-medium">1,680 / 2,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: "84%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Protein</span>
                      <span className="text-sm font-medium">98g / 120g</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full transition-all duration-1000 delay-300" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      3 healthy options within 0.5 miles
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Setup Section */}
      {showProfileForm && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <ProfileSetupForm onSuccess={handleProfileSuccess} />
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations && recommendations.length > 0 && (
        <section id="discover" className="py-20">
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

      {/* Map Section */}
      <section id="map" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <MapSection />
        </div>
      </section>

      {/* Impact Dashboard */}
      <section id="impact" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Your Community Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                Track how your healthy choices support local businesses and reduce food waste
              </p>
            </div>
            <ImpactDashboard userId={currentUserId} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Logo and Description */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <AnimatedLogo size="sm" />
                  <h3 className="text-xl font-bold">NutriLocal</h3>
                </div>
                <p className="text-background/80 leading-relaxed mb-6">
                  Connecting health-conscious individuals with local restaurants that offer
                  nutritious, affordable meals while supporting community businesses and reducing food waste.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-background text-foreground hover:bg-background/90">
                    Download for iOS
                  </Button>
                  <Button variant="outline" className="border-background/20 text-background hover:bg-background/10">
                    Get on Android
                  </Button>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4">For Users</h4>
                <ul className="space-y-2 text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">How It Works</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Find Restaurants</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Nutrition Calculator</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Community Impact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">For Restaurants</h4>
                <ul className="space-y-2 text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">Partner With Us</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Business Dashboard</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Menu Integration</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Success Stories</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-background/60 text-sm mb-4 md:mb-0">
                © 2024 NutriLocal. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-background/60 hover:text-background transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-background/60 hover:text-background transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-background/60 hover:text-background transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-background/60 hover:text-background transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

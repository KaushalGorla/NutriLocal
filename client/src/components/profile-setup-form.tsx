import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { insertUserProfileSchema } from "@shared/schema";
import { Target, Wallet, Shield } from "lucide-react";

const dietaryOptions = [
  "Vegetarian",
  "Vegan", 
  "Gluten-Free",
  "Keto",
  "Dairy-Free",
  "Nut-Free",
  "Halal",
  "Kosher",
];

interface ProfileSetupFormProps {
  onSuccess?: (data: any) => void;
}

export default function ProfileSetupForm({ onSuccess }: ProfileSetupFormProps) {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertUserProfileSchema),
    defaultValues: {
      userId: "temp-user-id", // In real app, this would come from auth
      dailyCalories: 2000,
      proteinTarget: 120,
      carbLimit: 200,
      fatTarget: 65,
      maxMealPrice: "15.00",
      monthlyBudget: "300.00",
      dietaryRestrictions: [],
    },
  });

  const createProfileMutation = useMutation({
    mutationFn: api.createUserProfile,
    onSuccess: (data) => {
      toast({
        title: "Profile Created!",
        description: "We've found your perfect meal matches.",
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    const profileData = {
      ...data,
      dietaryRestrictions: selectedRestrictions,
    };
    createProfileMutation.mutate(profileData);
  };

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setSelectedRestrictions([...selectedRestrictions, restriction]);
    } else {
      setSelectedRestrictions(selectedRestrictions.filter(r => r !== restriction));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Tell Us About Your Health Goals
        </h2>
        <p className="text-xl text-muted-foreground">
          We'll match you with the perfect meals from local restaurants
        </p>
      </div>

      <Card className="shadow-xl border border-border">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Nutrition Targets Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold flex items-center">
                  <Target className="text-primary mr-3" size={24} />
                  Nutrition Targets
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dailyCalories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Calories</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2000"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-daily-calories"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="proteinTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein Goal (g)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="120"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-protein-target"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="carbLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carb Limit (g)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="200"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-carb-limit"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fatTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fat Target (g)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="65"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-fat-target"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              {/* Budget Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold flex items-center">
                  <Wallet className="text-accent mr-3" size={24} />
                  Budget Preferences
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="maxMealPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Per Meal ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="15.00"
                            {...field}
                            data-testid="input-max-meal-price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthlyBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Food Budget ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="300.00"
                            {...field}
                            data-testid="input-monthly-budget"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              {/* Dietary Restrictions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold flex items-center">
                  <Shield className="text-secondary mr-3" size={24} />
                  Dietary Restrictions & Preferences
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={option}
                        checked={selectedRestrictions.includes(option)}
                        onCheckedChange={(checked) => handleRestrictionChange(option, !!checked)}
                        data-testid={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <label
                        htmlFor={option}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex justify-center pt-6"
              >
                <Button
                  type="submit"
                  className="gradient-primary text-primary-foreground px-12 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  disabled={createProfileMutation.isPending}
                  data-testid="button-find-meals"
                >
                  {createProfileMutation.isPending ? "Finding Your Meals..." : "Find My Perfect Meals"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

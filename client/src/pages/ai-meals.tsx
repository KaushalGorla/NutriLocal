import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";

interface MealRecommendation {
  name: string;
  description: string;
  nutritionInfo: string;
  ingredients: string[];
  benefits: string[];
}

export default function AIMeals() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<MealRecommendation[]>([]);
  const [preferences, setPreferences] = useState({
    dietaryGoals: "",
    restrictions: "",
    budget: "",
    cuisinePreference: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        toast({
          title: "File Selected",
          description: `Selected: ${file.name}`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeDocument = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF document to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("preferences", JSON.stringify(preferences));

      const response = await fetch("/api/ai-meal-recommendations", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);

      toast({
        title: "Analysis Complete!",
        description: `Found ${data.recommendations.length} personalized meal recommendations.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              AI-Powered Meal Recommendations
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your health documents for personalized nutrition recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload and Preferences Section */}
            <div className="space-y-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload size={20} />
                    Upload Document
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="file-upload-input"
                    />
                    
                    {selectedFile ? (
                      <div className="space-y-2">
                        <FileText className="mx-auto h-12 w-12 text-primary" />
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          data-testid="button-change-file"
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload a PDF document
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          data-testid="button-upload-file"
                        >
                          Select PDF File
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Upload health reports, nutrition plans, or medical documents for personalized analysis
                  </p>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dietary-goals">Dietary Goals</Label>
                    <Select
                      value={preferences.dietaryGoals}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, dietaryGoals: value }))}
                    >
                      <SelectTrigger data-testid="select-dietary-goals" className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select your primary goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                        <SelectItem value="weight-loss" className="hover:bg-gray-100 dark:hover:bg-gray-800">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain" className="hover:bg-gray-100 dark:hover:bg-gray-800">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance" className="hover:bg-gray-100 dark:hover:bg-gray-800">Maintenance</SelectItem>
                        <SelectItem value="heart-health" className="hover:bg-gray-100 dark:hover:bg-gray-800">Heart Health</SelectItem>
                        <SelectItem value="diabetes-management" className="hover:bg-gray-100 dark:hover:bg-gray-800">Diabetes Management</SelectItem>
                        <SelectItem value="general-wellness" className="hover:bg-gray-100 dark:hover:bg-gray-800">General Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restrictions">Dietary Restrictions</Label>
                    <Textarea
                      id="restrictions"
                      placeholder="e.g., vegetarian, gluten-free, nut allergies..."
                      value={preferences.restrictions}
                      onChange={(e) => setPreferences(prev => ({ ...prev, restrictions: e.target.value }))}
                      data-testid="input-restrictions"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={preferences.budget}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger data-testid="select-budget" className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                        <SelectItem value="budget" className="hover:bg-gray-100 dark:hover:bg-gray-800">Budget ($5-10)</SelectItem>
                        <SelectItem value="moderate" className="hover:bg-gray-100 dark:hover:bg-gray-800">Moderate ($10-20)</SelectItem>
                        <SelectItem value="premium" className="hover:bg-gray-100 dark:hover:bg-gray-800">Premium ($20+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Preference</Label>
                    <Input
                      id="cuisine"
                      placeholder="e.g., Mediterranean, Asian, Local..."
                      value={preferences.cuisinePreference}
                      onChange={(e) => setPreferences(prev => ({ ...prev, cuisinePreference: e.target.value }))}
                      data-testid="input-cuisine"
                    />
                  </div>

                  <Button
                    onClick={analyzeDocument}
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full gradient-primary"
                    data-testid="button-analyze"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Document...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get AI Recommendations
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  {recommendations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>Upload a document and click "Get AI Recommendations" to see personalized meal suggestions</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <Card key={index} className="border-l-4 border-l-primary">
                          <CardContent className="pt-4">
                            <h3 className="font-semibold text-lg mb-2" data-testid={`recommendation-title-${index}`}>
                              {rec.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Nutrition:</strong> {rec.nutritionInfo}
                              </div>
                              <div>
                                <strong>Key Ingredients:</strong> {rec.ingredients.join(", ")}
                              </div>
                              <div>
                                <strong>Benefits:</strong> {rec.benefits.join(", ")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
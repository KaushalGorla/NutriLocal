import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Store, Trash2, HandHeart, Leaf, Trophy, Medal, Recycle, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ImpactDashboardProps {
  userId: string;
}

export default function ImpactDashboard({ userId }: ImpactDashboardProps) {
  const { data: impactData, isLoading } = useQuery({
    queryKey: ["/api/impact", userId],
    queryFn: () => api.getImpactData(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-4"></div>
              <div className="h-6 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!impactData) return null;

  const impactMetrics = [
    {
      icon: Store,
      value: impactData.businessesSupported,
      label: "Local Businesses Supported",
      color: "gradient-primary",
    },
    {
      icon: Trash2,
      value: `${impactData.foodWasteSaved} lbs`,
      label: "Food Waste Prevented",
      color: "bg-secondary",
    },
    {
      icon: HandHeart,
      value: impactData.mealsDonated,
      label: "Meals Donated",
      color: "bg-accent",
    },
    {
      icon: Leaf,
      value: `${impactData.carbonSaved} lbs`,
      label: "CO₂ Saved",
      color: "gradient-primary",
    },
  ];

  const achievementIcons = {
    medal: Medal,
    recycle: Recycle,
    heart: Heart,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Impact Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="shadow-lg border border-border hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${metric.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-1" data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {metric.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="shadow-xl border border-border">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Trophy className="text-accent mr-3" size={24} />
              Recent Achievements
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {impactData.achievements?.map((achievement: any, index: number) => {
                const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons] || Medal;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    className="text-center p-4 border border-border rounded-xl"
                    data-testid={`achievement-${achievement.id}`}
                  >
                    <div className={`w-16 h-16 ${
                      achievement.earned 
                        ? achievement.icon === 'medal' ? 'gradient-primary' :
                          achievement.icon === 'recycle' ? 'bg-secondary' : 'bg-accent'
                        : 'bg-muted'
                    } rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
                      <IconComponent 
                        className={achievement.earned ? "text-white" : "text-muted-foreground"} 
                        size={24} 
                      />
                    </div>
                    <h4 className="font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="mt-2">
                        <span className="text-xs text-primary font-medium">Earned!</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

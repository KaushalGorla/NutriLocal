import { cn } from "@/lib/utils";

interface NutritionTagProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "calories" | "protein" | "dietary" | "default";
  className?: string;
}

export default function NutritionTag({ 
  icon, 
  children, 
  variant = "default", 
  className 
}: NutritionTagProps) {
  const variantStyles = {
    calories: "bg-primary/10 text-primary",
    protein: "bg-secondary/10 text-secondary",
    dietary: "bg-accent/10 text-accent",
    default: "bg-muted text-muted-foreground",
  };

  return (
    <span 
      className={cn(
        "nutrition-tag inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}

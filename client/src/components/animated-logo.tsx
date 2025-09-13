import { motion } from "framer-motion";
import { Leaf, Heart } from "lucide-react";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ className = "", size = "md" }: AnimatedLogoProps) {
  const sizes = {
    sm: { container: "w-8 h-8", leaf: 16, heart: 12 },
    md: { container: "w-10 h-10", leaf: 20, heart: 14 },
    lg: { container: "w-16 h-16", leaf: 32, heart: 20 },
  };

  const currentSize = sizes[size];

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`${currentSize.container} gradient-primary rounded-xl flex items-center justify-center`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        data-testid="animated-logo-container"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf size={currentSize.leaf} className="text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        data-testid="animated-logo-heart"
      >
        <Heart size={currentSize.heart} className="text-accent-foreground fill-current" />
      </motion.div>
    </div>
  );
}

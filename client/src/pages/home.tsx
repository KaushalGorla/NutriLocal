import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Vertical Title Section */}
      <section className="flex items-center justify-center min-h-screen w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight text-foreground" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Discover
            </h1>
            
            <motion.h2 
              className="font-black relative inline-block text-6xl lg:text-8xl xl:text-9xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                color: [
                  "#22c55e",
                  "#3b82f6", 
                  "#22c55e",
                  "#3b82f6"
                ],
                textShadow: [
                  "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0 0 30px rgba(34, 197, 94, 0.8)",
                  "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0 0 30px rgba(59, 130, 246, 0.8)",
                  "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0 0 30px rgba(34, 197, 94, 0.8)",
                  "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 0 0 30px rgba(59, 130, 246, 0.8)"
                ]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.3,
                color: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                textShadow: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              style={{
                letterSpacing: '2px'
              }}
            >
              Healthy Meals
            </motion.h2>
            
            <h3 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight text-foreground" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              From Local Restaurants
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">
              Supporting Community Health
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">2,500+</div>
                <div className="text-lg font-medium">Local Meals Matched</div>
                <p className="text-muted-foreground">
                  Connecting health-conscious diners with nutritious options
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-4xl font-bold text-secondary">150+</div>
                <div className="text-lg font-medium">Partner Restaurants</div>
                <p className="text-muted-foreground">
                  Supporting local businesses committed to healthy eating
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-4xl font-bold text-accent">$45K+</div>
                <div className="text-lg font-medium">Community Investment</div>
                <p className="text-muted-foreground">
                  Revenue flowing back into local food businesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
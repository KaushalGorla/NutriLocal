import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBackgroundImage from "@assets/generated_images/People_enjoying_healthy_food_together_d27e89e1.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden decorative-shapes py-20 lg:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${heroBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-4xl lg:text-6xl font-black leading-tight text-balance" style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.8)',
                  color: '#1a1a1a'
                }}>
                  Discover{" "}
                  <span className="animated-gradient-text" style={{
                    fontWeight: '900',
                    fontSize: '1.1em',
                    textShadow: '2px 2px 6px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.9)'
                  }}>
                    Healthy Meals
                  </span>
                  <br />
                  from Local Restaurants
                </h2>
                <p className="text-xl font-semibold mt-6 leading-relaxed" style={{ 
                  textShadow: '1px 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.9)',
                  color: '#2a2a2a',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backdropFilter: 'blur(2px)'
                }}>
                  Find affordable, nutritious meals that match your health goals while supporting
                  local businesses in your community.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-sm font-medium" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  color: '#1a1a1a',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(2px)'
                }}>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Personalized nutrition matching</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  color: '#1a1a1a',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(2px)'
                }}>
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Support local businesses</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium" style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  color: '#1a1a1a',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(2px)'
                }}>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Budget-friendly options</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/discover">
                  <Button
                    className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-xl"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)'
                    }}
                    data-testid="button-setup-profile"
                  >
                    <Sparkles className="mr-2" size={20} />
                    Set Up Your Profile
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button
                    variant="outline"
                    className="px-8 py-4 rounded-xl font-bold"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      borderColor: 'rgba(0,0,0,0.3)',
                      color: '#1a1a1a',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                    data-testid="button-explore-restaurants"
                  >
                    Explore Restaurants
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Health & Nutrition Visual */}
              <div className="max-w-lg mx-auto text-center">
                <div className="text-6xl mb-4">🥗</div>
                <h3 className="text-2xl font-bold mb-2">Discover Healthy Options</h3>
                <p className="text-muted-foreground">Find nutritious meals from local restaurants that match your health goals and budget.</p>
              </div>
            </motion.div>
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
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

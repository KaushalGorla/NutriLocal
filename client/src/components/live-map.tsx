import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertCircle } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'food_truck';
  cuisine: string;
  rating: number;
  lat: number;
  lng: number;
  distance: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function LiveMap() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    // Add fallback timing to ensure the map loads even if geolocation is slow
    const fallbackTimer = setTimeout(() => {
      console.log('Geolocation timeout, using fallback location');
      // Fallback to demo location (San Francisco)
      const fallbackLocation = { lat: 37.7749, lng: -122.4194 };
      setUserLocation(fallbackLocation);
      searchNearbyRestaurants(fallbackLocation.lat, fallbackLocation.lng);
      setIsLoading(false);
    }, 3000); // 3 second timeout

    if (!navigator.geolocation) {
      clearTimeout(fallbackTimer);
      console.log('Geolocation not supported, using fallback');
      const fallbackLocation = { lat: 37.7749, lng: -122.4194 };
      setUserLocation(fallbackLocation);
      searchNearbyRestaurants(fallbackLocation.lat, fallbackLocation.lng);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(fallbackTimer);
        const { latitude, longitude } = position.coords;
        console.log('Got user location:', latitude, longitude);
        setUserLocation({ lat: latitude, lng: longitude });
        await searchNearbyRestaurants(latitude, longitude);
        setIsLoading(false);
      },
      async (error) => {
        clearTimeout(fallbackTimer);
        console.log('Geolocation error, using fallback:', error.message);
        // Always use fallback instead of showing error
        const fallbackLocation = { lat: 37.7749, lng: -122.4194 };
        setUserLocation(fallbackLocation);
        await searchNearbyRestaurants(fallbackLocation.lat, fallbackLocation.lng);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false, // Faster response
        timeout: 2000, // Shorter timeout
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Search for nearby restaurants using AI-powered recommendations
  const searchNearbyRestaurants = async (lat: number, lng: number) => {
    console.log('Searching for AI-powered restaurant recommendations at:', lat, lng);
    
    try {
      // Fetch AI-powered restaurant recommendations based on location
      const response = await fetch(`/api/restaurants?lat=${lat}&lng=${lng}&userId=temp-user-id`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant recommendations');
      }
      
      const aiRestaurants = await response.json();
      
      // Convert AI restaurant data to match our Restaurant interface
      const formattedRestaurants: Restaurant[] = aiRestaurants.map((restaurant: any) => ({
        id: restaurant.id,
        name: restaurant.name,
        type: restaurant.type,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        lat: restaurant.lat,
        lng: restaurant.lng,
        distance: restaurant.distance
      }));
      
      console.log('Received AI restaurant recommendations:', formattedRestaurants);
      setNearbyRestaurants(formattedRestaurants);
      
    } catch (error) {
      console.error('Error fetching AI restaurant recommendations:', error);
      
      // Fallback to mock data if AI recommendations fail
      const fallbackRestaurants: Restaurant[] = [
        {
          id: '1',
          name: 'Green Bowl Co.',
          type: 'restaurant',
          cuisine: 'Healthy Bowls',
          rating: 4.8,
          lat: lat + 0.001,
          lng: lng + 0.001,
          distance: 0.1
        },
        {
          id: '2',
          name: 'Sunshine Food Truck',
          type: 'food_truck',
          cuisine: 'Organic Wraps',
          rating: 4.6,
          lat: lat - 0.002,
          lng: lng + 0.002,
          distance: 0.2
        },
        {
          id: '3',
          name: 'Fresh Start Cafe',
          type: 'restaurant',
          cuisine: 'Plant-Based',
          rating: 4.7,
          lat: lat + 0.003,
          lng: lng - 0.001,
          distance: 0.3
        },
        {
          id: '4',
          name: 'Protein Power Truck',
          type: 'food_truck',
          cuisine: 'High Protein',
          rating: 4.5,
          lat: lat - 0.001,
          lng: lng - 0.003,
          distance: 0.4
        }
      ];
      
      console.log('Using fallback restaurants:', fallbackRestaurants.length);
      setNearbyRestaurants(fallbackRestaurants);
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Create simple map visualization
  const renderMap = () => {
    if (!userLocation) return null;

    return (
      <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden">
        {/* Street grid pattern */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* User location */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            left: '50%', 
            top: '50%'
          }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow">You are here</span>
          </div>
        </div>

        {/* Nearby restaurants */}
        {nearbyRestaurants.map((restaurant, index) => {
          const offsetX = (index % 3 - 1) * 80;
          const offsetY = (Math.floor(index / 3) - 1) * 60;
          
          return (
            <div
              key={restaurant.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${50 + offsetX}%`,
                top: `${50 + offsetY}%`
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                  restaurant.type === 'food_truck' ? 'bg-orange-500' : 'bg-green-500'
                }`}
                title={`${restaurant.name} - ${restaurant.distance}mi`}
              ></div>
            </div>
          );
        })}

        {/* Map controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="shadow-lg"
            data-testid="button-refresh-location"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Your location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Restaurants</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Food trucks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full p-8">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Location Access Required</h3>
              <p className="text-muted-foreground text-sm">{error}</p>
              <Button 
                onClick={getCurrentLocation} 
                className="mt-4"
                data-testid="button-retry-location"
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-full">
      <div className="h-full relative">
        {isLoading ? (
          <Card className="h-full">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Getting your location...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          renderMap()
        )}
      </div>

      {/* Restaurant list */}
      {nearbyRestaurants.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold text-sm">Nearby Options ({nearbyRestaurants.length})</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {nearbyRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      restaurant.type === 'food_truck' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                  ></div>
                  <span className="font-medium">{restaurant.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{restaurant.cuisine}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">⭐ {restaurant.rating}</span>
                  <span className="text-muted-foreground">{restaurant.distance}mi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
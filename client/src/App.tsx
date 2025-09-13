import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import Discover from "./pages/discover";
import Map from "./pages/map";
import Impact from "./pages/impact";
import AIMeals from "./pages/ai-meals";
import RestaurantDetail from "./pages/restaurant-detail";
import NotFound from "./pages/not-found";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/discover" component={Discover} />
        <Route path="/map" component={Map} />
        <Route path="/impact" component={Impact} />
        <Route path="/ai-meals" component={AIMeals} />
        <Route path="/restaurant/:id" component={RestaurantDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

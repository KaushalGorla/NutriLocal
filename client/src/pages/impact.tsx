import { useState } from "react";
import ImpactDashboard from "@/components/impact-dashboard";

export default function Impact() {
  const [currentUserId] = useState("temp-user-id");

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 section-impact">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Your Community Impact
              </h1>
              <p className="text-xl text-muted-foreground">
                Track how your healthy choices support local businesses and reduce food waste
              </p>
            </div>
            <ImpactDashboard userId={currentUserId} />
          </div>
        </div>
      </section>
    </div>
  );
}
import MapSection from "@/components/map-section";

export default function Map() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <MapSection />
        </div>
      </div>
    </div>
  );
}
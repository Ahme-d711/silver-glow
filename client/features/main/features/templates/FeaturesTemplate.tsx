"use client";

import { FeaturesHero } from "../components/features-template/FeaturesHero";
import { FeaturesContent } from "../components/features-template/FeaturesContent";

export function FeaturesTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <FeaturesHero />
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <FeaturesContent />
      </div>
    </div>
  );
}

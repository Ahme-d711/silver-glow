"use client";

import { FeaturesExperienceBanner } from "./FeaturesExperienceBanner";
import { FeaturesGrid } from "./FeaturesGrid";

export function FeaturesContent() {
  return (
    <div className="space-y-20 md:space-y-28">
      <FeaturesExperienceBanner />
      <FeaturesGrid />
    </div>
  );
}

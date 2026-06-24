"use client";

import { AboutStorySection } from "./AboutStorySection";
import { AboutValuesSection } from "./AboutValuesSection";

export function AboutContent() {
  return (
    <div className="space-y-20 md:space-y-28">
      <AboutStorySection />
      <AboutValuesSection />
    </div>
  );
}

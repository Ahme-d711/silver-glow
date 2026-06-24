"use client";

import { WorksShowcaseSection } from "./WorksShowcaseSection";
import { WorksCtaSection } from "./WorksCtaSection";

export function WorksContent() {
  return (
    <div className="space-y-20 md:space-y-28">
      <WorksShowcaseSection />
      <WorksCtaSection />
    </div>
  );
}

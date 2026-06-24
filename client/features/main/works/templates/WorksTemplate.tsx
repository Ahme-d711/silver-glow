"use client";

import { WorksHero } from "../components/works-template/WorksHero";
import { WorksContent } from "../components/works-template/WorksContent";

export function WorksTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <WorksHero />
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <WorksContent />
      </div>
    </div>
  );
}

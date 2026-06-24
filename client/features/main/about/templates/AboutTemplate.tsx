"use client";

import { AboutHero } from "../components/about-template/AboutHero";
import { AboutContent } from "../components/about-template/AboutContent";

export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHero />
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <AboutContent />
      </div>
    </div>
  );
}

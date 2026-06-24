"use client";

import { SupportHero } from "../components/support-template/SupportHero";
import { SupportContent } from "../components/support-template/SupportContent";

export function SupportTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <SupportHero />
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <SupportContent />
      </div>
    </div>
  );
}

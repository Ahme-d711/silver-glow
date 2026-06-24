"use client";

import { PrivacyHeader } from "../components/privacy-template/PrivacyHeader";
import { PrivacyContent } from "../components/privacy-template/PrivacyContent";

export function PrivacyTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <PrivacyHeader />
      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-16">
        <PrivacyContent />
      </div>
    </div>
  );
}

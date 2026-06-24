"use client";

import { SupportCareBanner } from "./SupportCareBanner";
import { SupportContactSection } from "./SupportContactSection";
import { SupportFaqSection } from "./SupportFaqSection";

export function SupportContent() {
  return (
    <div className="space-y-20 md:space-y-28">
      <SupportCareBanner />
      <SupportContactSection />
      <SupportFaqSection />
    </div>
  );
}

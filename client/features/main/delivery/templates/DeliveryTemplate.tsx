"use client";

import { DeliveryHero } from "../components/delivery-template/DeliveryHero";
import { DeliveryContent } from "../components/delivery-template/DeliveryContent";

export function DeliveryTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <DeliveryHero />
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <DeliveryContent />
      </div>
    </div>
  );
}

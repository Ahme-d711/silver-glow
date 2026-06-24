"use client";

import { DeliveryPackagingBanner } from "./DeliveryPackagingBanner";
import { DeliveryRatesTable } from "./DeliveryRatesTable";
import { DeliveryInfoSection } from "./DeliveryInfoSection";
import { DeliveryNote } from "./DeliveryNote";

export function DeliveryContent() {
  return (
    <div className="space-y-20 md:space-y-28">
      <DeliveryPackagingBanner />
      <DeliveryRatesTable />
      <DeliveryInfoSection />
      <DeliveryNote />
    </div>
  );
}

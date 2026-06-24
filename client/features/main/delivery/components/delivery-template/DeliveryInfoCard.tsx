"use client";

import { MapPin, ShieldCheck } from "lucide-react";
import type { DeliveryInfoItem } from "../../types/delivery-template.types";

const ICONS = {
  tracking: MapPin,
  insurance: ShieldCheck,
} as const;

interface DeliveryInfoCardProps {
  item: DeliveryInfoItem;
  title: string;
  description: string;
}

export function DeliveryInfoCard({ item, title, description }: DeliveryInfoCardProps) {
  const Icon = ICONS[item.iconKey];

  return (
    <div className="group relative bg-white p-8 rounded-3xl border border-divider shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
      <div className="absolute top-0 end-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

      <div className="relative space-y-4 text-start">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-content-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

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
    <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm space-y-4 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-primary text-start">{title}</h3>
      <p className="text-content-secondary leading-relaxed text-start">{description}</p>
    </div>
  );
}

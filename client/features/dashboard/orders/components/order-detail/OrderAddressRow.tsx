import { MapPin } from "lucide-react";
import type { IconType } from "@/types";

type OrderAddressRowProps = {
  label: string;
  address: string;
  icon?: IconType;
};

export function OrderAddressRow({
  label,
  address,
  icon: Icon = MapPin,
}: OrderAddressRowProps) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-content-tertiary" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-content-tertiary">{label}</span>
        <p className="text-sm font-medium text-content-primary">{address}</p>
      </div>
    </div>
  );
}

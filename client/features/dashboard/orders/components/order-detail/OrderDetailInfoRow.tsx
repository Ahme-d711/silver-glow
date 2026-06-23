import type { IconType } from "@/types";

interface OrderDetailInfoRowProps {
  icon: IconType;
  label: string;
  value: React.ReactNode;
}

export function OrderDetailInfoRow({ icon: Icon, label, value }: OrderDetailInfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-5 w-5 text-content-tertiary" />
        </div>
        <span className="text-content-secondary">{label}</span>
      </div>
      <div className="text-content-primary font-medium">{value}</div>
    </div>
  );
}

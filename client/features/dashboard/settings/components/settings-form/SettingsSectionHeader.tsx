import { cn } from "@/lib/utils";

type SettingsSectionHeaderProps = {
  title: string;
  description: string;
  isRtl?: boolean;
  className?: string;
};

export function SettingsSectionHeader({
  title,
  description,
  isRtl,
  className,
}: SettingsSectionHeaderProps) {
  return (
    <div className={cn("md:col-span-2 mb-2", isRtl && "text-right", className)}>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="text-sm text-content-secondary">{description}</p>
    </div>
  );
}

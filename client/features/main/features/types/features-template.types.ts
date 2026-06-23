import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

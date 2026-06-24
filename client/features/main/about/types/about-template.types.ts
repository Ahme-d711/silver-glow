import type { LucideIcon } from "lucide-react";

export interface AboutStoryBlockData {
  id: string;
  image: string;
  titleKey: string;
  bodyKey: string;
  reverse?: boolean;
}

export interface AboutValueItem {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

export interface AboutStoryBlockProps {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  reverse?: boolean;
}

export interface AboutValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutStatItem {
  id: string;
  valueKey: string;
  labelKey: string;
}

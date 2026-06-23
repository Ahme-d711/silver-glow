import { Section } from "@/features/dashboard/sections/types";

export interface ShopProductToolbarProps {
  sections: Section[];
  sectionSlug: string | null;
  sortValue: string;
  totalResults: number;
  onSectionChange: (slug: string) => void;
  onSortChange: (value: string) => void;
}

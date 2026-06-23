import type { Product } from "@/features/dashboard/products/types";

export interface WishlistHeaderProps {
  title: string;
  description: string;
  count: number;
  clearLabel: string;
  onClear: () => void;
  showClear: boolean;
}

export interface WishlistLoadingProps {
  message: string;
}

export interface WishlistEmptyProps {
  title: string;
  description: string;
  exploreLabel: string;
}

export interface WishlistGridProps {
  products: Product[];
}

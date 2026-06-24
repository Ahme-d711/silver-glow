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
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
}

export interface WishlistGridProps {
  products: Product[];
}

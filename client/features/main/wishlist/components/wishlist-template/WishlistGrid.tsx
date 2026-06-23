"use client";

import { ShopProductCard } from "@/features/main/shop/components/cards/ShopProductCard";
import type { WishlistGridProps } from "../../types/wishlist-template.types";

export function WishlistGrid({ products }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ShopProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

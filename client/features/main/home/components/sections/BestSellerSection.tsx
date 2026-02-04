"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { ProductCard } from "../cards/ProductCard";

interface BestSellerSectionProps {
  products: Product[];
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: Set<string>;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  products,
  onToggleWishlist,
  wishlistIds = new Set(),
}) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {t("best_seller")}
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={wishlistIds.has(product._id)}
          />
        ))}
      </div>

      {/* More Products Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/products"
          className="px-8 py-3 rounded-full border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          {t("more_products")}
        </Link>
      </div>
    </section>
  );
};

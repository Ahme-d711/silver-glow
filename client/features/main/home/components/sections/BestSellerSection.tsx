"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "../cards/ProductCard";

interface BestSellerSectionProps {
  products: Product[];
  isLoading?: boolean;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: (productId: string) => boolean;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  products,
  isLoading,
  onToggleWishlist,
  isInWishlist,
}) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto px-4">
        <div className="h-8 w-48 bg-secondary/30 rounded-lg animate-pulse mb-10 mx-auto md:mx-0" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-3/4 bg-secondary/20 rounded-3xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      {/* Section Title */}
      <SectionHeader title={t("best_seller")} />

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={isInWishlist?.(product._id)}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <Link
          href="/shop"
          className="px-10 py-4 rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
        >
          {t("more_products")}
        </Link>
      </div>
    </section>
  );
};

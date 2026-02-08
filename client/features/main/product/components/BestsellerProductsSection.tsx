"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ShopProductCard } from "@/features/main/shop/components/cards/ShopProductCard";
import { useHomeProducts } from "@/features/main/home/hooks/useHome";

interface BestsellerProductsSectionProps {
  title?: string;
}

export const BestsellerProductsSection: React.FC<BestsellerProductsSectionProps> = ({ title }) => {
  const t = useTranslations("Shop");
  
  const { data, isLoading } = useHomeProducts();
  const products = data?.products || [];

  if (isLoading) {
    return (
      <div className="py-16 container mx-auto px-4">
        <div className="h-8 w-64 bg-gray-200 animate-pulse mb-8 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4">
        <SectionHeader 
          title={title || t("best_seller") || "BESTSELLER PRODUCTS"} 
          leftOnMobile
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.slice(0, 4).map((product) => (
            <ShopProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useHomeProducts, useHomeSections } from "../../hooks/useHome";
import { ProductCard } from "../cards/ProductCard";

interface ProductTabsSectionProps {
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: (productId: string) => boolean;
}

export const ProductTabsSection: React.FC<ProductTabsSectionProps> = ({
  onToggleWishlist,
  isInWishlist,
}) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);

  const { data: sections = [], isLoading: isSectionsLoading } = useHomeSections();
  const { data, isLoading: isProductsLoading } = useHomeProducts(activeSectionId);
  const products = data?.products || [];

  // Combine "All" with fetched sections
  const tabs = [
    { _id: undefined, nameAr: "الكل", nameEn: "All" },
    ...sections
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      {/* Section Title */}
      <SectionHeader 
        title={t("our_products")} 
        className="mb-10" 
        leftOnMobile 
      />

      {/* Tabs Layout */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {tabs.map((tab) => {
          const name = isRtl ? tab.nameAr : tab.nameEn;
          const isActive = activeSectionId === tab._id;
          
          return (
            <button
              key={tab._id || "all"}
              onClick={() => setActiveSectionId(tab._id)}
              className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 border-2 ${
                isActive
                  ? "bg-primary border-primary text-white shadow-lg"
                  : "bg-secondary border-divider text-content-tertiary hover:border-primary hover:text-primary"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]">
        {isProductsLoading ? (
            // Skeleton / Loading state could go here
            Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-3/4 bg-secondary rounded-2xl animate-pulse" />
            ))
        ) : products.length > 0 ? (
          products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist?.(product._id)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-content-tertiary">
            <p className="text-xl">{t("no_products_found")}</p>
          </div>
        )}
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

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";
import { useHomeCategories } from "@/features/main/home/hooks/useHome";
import { ShopCategoryCard } from "@/features/main/shop/components/cards/ShopCategoryCard";

export const CategoriesTemplate: React.FC = () => {
  const t = useTranslations("Navigation");
  const tShop = useTranslations("Shop");
  const { data: categories = [], isLoading } = useHomeCategories();

  return (
    <div className="min-h-screen bg-background pt-40 pb-20">
      <div className="container mx-auto px-4">
        <StorefrontPageHeader
          title={t("categories")}
          breadcrumbs={[
            { label: tShop("home"), href: "/" },
            { label: t("categories") },
          ]}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-4/5 bg-secondary rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <ShopCategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

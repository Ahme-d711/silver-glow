"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";
import { useHomeSubcategories } from "@/features/main/home/hooks/useHome";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { getImageUrl } from "@/utils/image.utils";

interface CategoryDetailsTemplateProps {
  category: Category;
}

export const CategoryDetailsTemplate: React.FC<CategoryDetailsTemplateProps> = ({ category }) => {
  const t = useTranslations("Navigation");
  const tShop = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  // Use category ID to fetch subcategories
  const { data: subcategories = [], isLoading } = useHomeSubcategories(category._id);

  const categoryName = isRtl ? category.nameAr : category.nameEn;

  return (
    <div className="min-h-screen bg-background pt-40 pb-20">
      <div className="container max-w-7xl mx-auto px-4">
        <StorefrontPageHeader
          title={categoryName}
          breadcrumbs={[
            { label: tShop("home"), href: "/" },
            { label: t("categories"), href: "/categories" },
            { label: categoryName },
          ]}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-4/5 bg-secondary rounded-2xl" />
            ))}
          </div>
        ) : subcategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.map((subcategory) => {
              const subName = isRtl ? subcategory.nameAr : subcategory.nameEn;
              const subImageUrl = getImageUrl(subcategory.image) || "/images/placeholder-category.jpg";
              
              return (
                <Link 
                  key={subcategory._id}
                  href={`/shop?subcategory=${subcategory.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-4/5 block bg-secondary"
                >
                  <Image
                    src={subImageUrl}
                    alt={subName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                      {subName}
                    </h3>
                    <div className="flex items-center justify-center mt-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-sm font-medium border-b border-white pb-0.5">
                        {tShop("view_all") || "View All"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/30 rounded-3xl">
             <p className="text-content-secondary mb-6 text-lg">
               {isRtl ? "لا توجد أقسام فرعية في هذا القسم." : "No subcategories found in this category."}
             </p>
             <Link href={`/shop?category=${category.slug}`} className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">
               {isRtl ? "عرض جميع المنتجات" : "View All Products"}
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

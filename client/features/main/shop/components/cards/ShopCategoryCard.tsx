"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { getImageUrl } from "@/utils/image.utils";

interface ShopCategoryCardProps {
  category: Category;
}

export const ShopCategoryCard: React.FC<ShopCategoryCardProps> = ({ category }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const name = isAr ? category.nameAr : category.nameEn;
  const imageUrl = getImageUrl(category.image) || "/images/placeholder-category.jpg";
  const productCount = category.productsCount || 0;

  return (
    <Link 
      href={`/shop?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-4/5 block bg-secondary"
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
          {name}
        </h3>
        <p className="text-sm md:text-base font-medium opacity-90 tracking-wide uppercase">
          {productCount} {t("items")}
        </p>
      </div>
      
      {/* Decorative Border on Hover */}
      <div className="absolute inset-4 border border-white/20 rounded-xl opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100" />
    </Link>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { getImageUrl } from "@/utils/image.utils";
import { cn } from "@/lib/utils";

interface ShopCategoryCardProps {
  category: Category;
}

export const ShopCategoryCard: React.FC<ShopCategoryCardProps> = ({ category }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const isAr = locale === "ar";
  const isActive = searchParams.get("category") === category.slug;

  const name = isAr ? category.nameAr : category.nameEn;
  const imageUrl = getImageUrl(category.image) || "/images/placeholder-category.jpg";
  const productCount = category.productsCount || 0;

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl aspect-4/5 block bg-secondary shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/15 transition-colors duration-300 group-hover:from-black/80 group-hover:via-black/45" />
      
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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { getImageUrl } from "@/utils/image.utils";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const name = isRtl ? category.nameAr : category.nameEn;
  const imageUrl = getImageUrl(category.image);

  return (
    <Link
      href={`/categories/${category._id}`}
      className="group relative block aspect-4/5 w-full overflow-hidden rounded-[2.5rem] bg-gray-100"
    >
      <Image
        src={imageUrl || "/images/placeholder.png"} // Fallback to avoid crash if image is missing
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      
      {/* Floating Label */}
      <div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 transform rounded-2xl bg-secondary py-3 px-5 shadow-lg backdrop-blur-[2px] transition-all duration-300 group-hover:-translate-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary truncate">
            {name}
          </span>
          <div className="flex items-center justify-center text-primary">
            {isRtl ? <ChevronLeft className="h-5 w-5" strokeWidth={2.5} /> : <ChevronRight className="h-5 w-5" strokeWidth={2.5} />}
          </div>
        </div>
      </div>
    </Link>
  );
};

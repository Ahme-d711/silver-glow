"use client";

import { Product } from "@/features/dashboard/products/types";
import { useLocale } from "next-intl";

interface DescriptionTabProps {
  product: Product;
}

export const DescriptionTab: React.FC<DescriptionTabProps> = ({ product }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const description = isRtl ? product.descriptionAr : product.descriptionEn;

  if (!description) {
    return (
      <div className="text-center py-12 text-content-tertiary">
        No description available
      </div>
    );
  }

  return (
    <div className="prose prose-stone max-w-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
          <img
            src={product.mainImage?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.mainImage}` : product.mainImage}
            alt={isRtl ? product.nameAr : product.nameEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {isRtl ? product.nameAr : product.nameEn}
            </h2>
            <div className="text-content-secondary leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { getImageUrl } from "@/utils/image.utils";
import { useHomeProducts } from "@/features/main/home/hooks/useHome";

interface BestsellerProductsSectionProps {
  title?: string;
}

export const BestsellerProductsSection: React.FC<BestsellerProductsSectionProps> = ({ title }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
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
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1D315F] mb-12 uppercase tracking-wider text-center md:text-left">
          {title || t("best_seller") || "BESTSELLER PRODUCTS"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.slice(0, 4).map((product) => (
            <BestsellerCard key={product._id} product={product} isRtl={isRtl} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BestsellerCardProps {
  product: Product;
  isRtl: boolean;
}

const BestsellerCard: React.FC<BestsellerCardProps> = ({ product, isRtl }) => {
  const name = isRtl ? product.nameAr : product.nameEn;
  const description = (isRtl ? product.descriptionAr : product.descriptionEn) || "A beautiful piece of jewelry designed for elegance.";
  const imageUrl = getImageUrl(product.mainImage);

  // Sample colors as shown in the design since the product model doesn't have a colors field yet
  const colors = ["#3498db", "#2c3e50", "#e67e22", "#bdc3c7"];

  return (
    <div className="group flex flex-col items-center text-center">
      {/* Product Image */}
      <Link 
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 mb-6 block"
      >
        <Image
          src={imageUrl || "/images/placeholder.png"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      {/* Product Title */}
      <Link href={`/products/${product.slug}`}>
        <h3 className="text-[#1D315F] font-bold text-sm md:text-base uppercase tracking-widest mb-3 hover:text-blue-600 transition-colors line-clamp-2 px-2">
          {name}
        </h3>
      </Link>

      {/* Product Description */}
      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 px-4 line-clamp-3">
        {description}
      </p>

      {/* Prices */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {product.oldPrice && (
          <span className="text-gray-400 text-xs line-through">
            AED {product.oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-[#1D315F] font-bold text-sm md:text-base">
          AED {product.price.toFixed(2)}
        </span>
      </div>

      {/* Color Variants (Placeholder for design consistency) */}
      <div className="flex items-center justify-center gap-1.5 mt-auto">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="w-3 h-3 rounded-full shadow-xs border border-white"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

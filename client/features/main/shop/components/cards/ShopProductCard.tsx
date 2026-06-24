"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { getImageUrl } from "@/utils/image.utils";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface ShopProductCardProps {
  product: Product;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const { isInWishlist, toggleWishlist, isToggling } = useWishlist();
  
  const isAr = locale === "ar";
  const [isHovered, setIsHovered] = useState(false);

  const name = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.descriptionAr : product.descriptionEn;
  const imageUrl = getImageUrl(product.mainImage);
  const currency = t("currency") || "AED";

  const isLiked = isInWishlist(product._id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  const hasSizes = product.sizes && product.sizes.length > 0;
  const firstSize = hasSizes ? product.sizes![0] : null;
  const displayPrice = firstSize?.price || product.price;
  const displayOldPrice = firstSize?.oldPrice || product.oldPrice;
  const sizeLabel = firstSize?.size ? `${t("Size") || "Size"}: ${firstSize.size}` : null;
  const hasReviews = (product.numReviews ?? 0) > 0;
  const averageRating = product.averageRating ?? 0;
  const filledStars = hasReviews ? Math.round(averageRating) : 0;

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden border border-divider/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Wrapper */}
      <Link href={`/products/${product.slug}`} className="relative aspect-4/5 overflow-hidden block">
        <Image
          src={imageUrl || "/images/placeholder-product.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        
        {/* Floating Actions */}
        <div className={cn(
          "absolute inset-0 bg-black/5 flex items-center justify-center gap-3 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <button className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 duration-200">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button 
            onClick={handleHeartClick}
            disabled={isToggling}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 duration-200",
              isLiked ? "bg-red-500 text-white" : "bg-white text-primary hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 duration-200">
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        {/* Badges */}
        {product.oldPrice && product.oldPrice > product.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </div>
        )}

      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-primary font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "size-3.5 transition-colors",
                    star <= filledStars
                      ? "fill-amber-400 text-amber-400"
                      : "fill-secondary/15 text-secondary/25"
                  )}
                />
              ))}
            </div>

            {hasReviews ? (
              <>
                <span className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-100">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-[11px] font-medium text-content-tertiary">
                  ({product.numReviews})
                </span>
              </>
            ) : (
              <span className="text-[11px] font-medium text-content-tertiary">
                {t("no_reviews")}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-content-tertiary mb-6 line-clamp-3 leading-relaxed font-medium max-w-[90%]">
          {description || "Featured product with premium quality and elegant design."}
        </p>
        
        {/* Price & Size Label - Pushed to bottom */}
        <div className="mt-auto w-full space-y-3">
          {sizeLabel && (
            <div className="flex justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                {sizeLabel}
              </span>
            </div>
          )}
          <div className="flex items-center justify-center gap-3">
            {displayOldPrice && displayOldPrice > displayPrice && (
              <span className="text-content-tertiary line-through text-sm font-medium opacity-50">
                {currency} {displayOldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-primary text-xl font-extrabold tracking-tight">
              {currency} {displayPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

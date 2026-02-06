"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useLocale } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { getImageUrl } from "@/utils/image.utils";

interface ProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const imageUrl = getImageUrl(product.mainImage);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product._id);
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block aspect-3/4 w-full overflow-hidden rounded-2xl bg-secondary"
    >
      <Image
        src={imageUrl || "/images/placeholder.png"}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/20 backdrop-blur-sm p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white/40"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isInWishlist ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>

      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-bold mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-secondary line-clamp-1">
          {description || "Your ring, your style"}
        </p>
      </div>
    </Link>
  );
};

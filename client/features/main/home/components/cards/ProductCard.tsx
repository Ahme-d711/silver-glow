"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/features/dashboard/products/types";
import { getImageUrl } from "@/utils/image.utils";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  const t = useTranslations("Shop");
  const router = useRouter();
  const { user } = useAuthStore();
  const isRtl = locale === "ar";
  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const imageUrl = getImageUrl(product.mainImage);
  const hasReviews = (product.numReviews ?? 0) > 0;
  const averageRating = product.averageRating ?? 0;
  const filledStars = hasReviews ? Math.round(averageRating) : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error(t("login_required") || "Please login first");
      router.push("/login");
      return;
    }

    if (onToggleWishlist) {
      onToggleWishlist(product._id);
    }
  };

  return (
    <div className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-secondary">
      <Link
        href={`/products/${product.slug}`}
        className="block w-full h-full"
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

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-secondary line-clamp-1">
            {description || "Your ring, your style"}
          </p>
        </div>
      </Link>

      {/* Rating Badge */}
      {hasReviews && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "size-3",
                  star <= filledStars
                    ? "fill-amber-400 text-amber-400"
                    : "fill-white/15 text-white/25"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-amber-300">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-xs text-white/70">({product.numReviews})</span>
        </div>
      )}

      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/20 backdrop-blur-sm p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white/40 cursor-pointer"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isInWishlist ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Product } from "@/features/dashboard/products/types";
import { getImageUrl } from "@/utils/image.utils";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { cn } from "@/lib/utils";

interface ShopProductCardProps {
  product: Product;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuthStore();
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
    if (!user) {
      toast.error(t("login_required") || "Please login first");
      router.push("/login");
      return;
    }
    toggleWishlist(product._id);
  };

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
            <h3 className="text-secondary font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-content-tertiary mb-6 line-clamp-3 leading-relaxed font-medium max-w-[90%]">
          {description || "Featured product with premium quality and elegant design."}
        </p>
        
        {/* Price - Pushed to bottom */}
        <div className="mt-auto w-full">
          <div className="flex items-center justify-center gap-3">
            {product.oldPrice && (
              <span className="text-content-tertiary line-through text-sm font-medium">
                {currency} {product.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-primary text-xl font-extrabold">
              {currency} {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

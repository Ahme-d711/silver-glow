"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, ShoppingCart, Heart, Eye, CheckCircle2, Minus, Plus } from "lucide-react";
import { Product } from "@/features/dashboard/products/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeGuideModal } from "./SizeGuideModal";
import { useAddToCart } from "@/features/main/cart/hooks/useCart";
import { useGuestCartStore } from "@/features/main/cart/stores/useGuestCartStore";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { getProductDetailPricing, getSizePriceDisplay } from "../utils/productPricing";
import { Loader2 } from "lucide-react";
interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { user } = useAuthStore();
  const addGuestItem = useGuestCartStore((s) => s.addItem);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 
      ? product.sizes[0].size 
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { mutate: addToCartServer, isPending } = useAddToCart();

  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const currency = t("currency") || "AED";

  // Format sizes if they exist
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : [];

  // Get currently selected size object if any
  const selectedSizeData = selectedSize ? sizes.find((s) => s.size === selectedSize) : null;
  const pricing = getProductDetailPricing(product, sizes, selectedSize);
  const currentPrice = pricing.currentPrice;
  const currentStock = selectedSizeData ? selectedSizeData.stock : product.stock;

  // Check availability
  const isInStock = currentStock > 0;

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error(t("select_size_first"));
      return;
    }

    if (user) {
      addToCartServer({
        productId: product._id,
        quantity,
        size: selectedSize || undefined,
      });
      return;
    }

    addGuestItem({
      id: `${product._id}-${selectedSize || "nosize"}`,
      productId: product._id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      price: currentPrice,
      mainImage: product.mainImage,
      size: selectedSize || "N/A",
      quantity,
      stock: currentStock,
    });
    toast.success(t("item_added"));
  };
  const { toggleWishlist, isInWishlist, isToggling } = useWishlist();
  const isFavorite = isInWishlist(product._id);

  const handleToggleWishlist = () => {
    toggleWishlist(product._id);
  };

  const hasReviews = (product.numReviews ?? 0) > 0;
  const displayRating = hasReviews ? Math.round(product.averageRating ?? 0) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight">
          {name}
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= displayRating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-secondary/20 text-secondary/40"
                )}
              />
            ))}
          </div>
          <span className="text-secondary font-medium text-sm">
            {hasReviews ? `${product.numReviews} ${t("Reviews")}` : t("no_reviews")}
          </span>
        </div>
      </div>

      <div key={selectedSize ?? "default"} className="flex flex-wrap items-end gap-3 py-2">
        {pricing.hasDiscount && pricing.originalPrice != null && (
          <span className="text-xl text-content-tertiary line-through font-medium opacity-60 mb-1">
            {currency} {pricing.originalPrice.toFixed(2)}
          </span>
        )}
        <div className="text-4xl font-extrabold text-primary animate-in fade-in slide-in-from-bottom-1 duration-300">
          {currency} {currentPrice.toFixed(2)}
        </div>
        {pricing.hasDiscount && (
          <span className="mb-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            -{pricing.discountPercent}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-content-secondary">{t("Availability")}:</span>
        {isInStock ? (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 
            {t("In Stock")} 
            <span className="text-primary/60 font-bold ml-1">
              ({currentStock} {t("pieces")})
            </span>
          </span>
        ) : (
          <span className="text-red-500">{t("Out of Stock")}</span>
        )}
      </div>

      <div className="h-px bg-divider w-full" />

      {sizes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-lg">{t("Size")}</span>
            <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-sm text-content-tertiary underline decoration-dotted hover:text-primary transition-colors"
            >
              {t("Guide")}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((sizeObj) => {
              const sizeName = sizeObj.size;
              const stock = sizeObj.stock;
              const isAvailable = stock > 0;
              const sizeHasDiscount = getSizePriceDisplay(sizeObj).hasDiscount;

              return (
                <button
                  key={sizeName}
                  onClick={() => isAvailable && setSelectedSize(sizeName)}
                  disabled={!isAvailable}
                  className={cn(
                    "h-10 min-w-12 px-3 rounded-lg border font-medium transition-all duration-200 relative",
                    selectedSize === sizeName
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : isAvailable 
                        ? "border-divider bg-white text-content-secondary hover:border-primary/50 hover:text-primary"
                        : "border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed decoration-neutral-300"
                  )}
                >
                  {sizeName}
                  {sizeHasDiscount && (
                    <span className="absolute -top-1.5 -end-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                  {!isAvailable && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {selectedSize && sizes.find((s) => s.size === selectedSize)?.stock === 0 && (
             <p className="text-red-500 text-sm font-medium">{t("Selected size is out of stock")}</p>
          )}
        </div>
      )}
      
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <div className="prose prose-stone max-w-none text-content-secondary leading-relaxed">
        <p>{description}</p>
      </div>

      <div className="h-4" />

      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-neutral-100 rounded-xl h-14 px-4 gap-6 border border-transparent focus-within:border-primary/20 transition-all">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isPending}
              className="p-1 hover:text-primary disabled:text-neutral-400 transition-colors cursor-pointer"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold text-primary min-w-[30px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock || isPending}
              className="p-1 hover:text-primary disabled:text-neutral-400 transition-colors cursor-pointer"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <Button 
            size="lg" 
            onClick={handleAddToCart}
            disabled={!isInStock || isPending}
            className="flex-1 min-w-[200px] rounded-xl h-14 text-base font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("adding_to_cart")}
              </span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {t("add_to_cart")}
              </>
            )}
          </Button>

          <Button
            variant="outline" 
            size="icon" 
            onClick={handleToggleWishlist}
            disabled={isToggling}
            className={cn(
              "h-14 w-14 rounded-xl border-divider transition-all shrink-0",
              isFavorite 
                ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-300" 
                : "hover:border-primary hover:text-primary"
            )}
          >
            {isToggling ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};


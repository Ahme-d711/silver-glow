"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, ShoppingCart, Heart, Eye, CheckCircle2, Minus, Plus } from "lucide-react";
import { Product } from "@/features/dashboard/products/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeGuideModal } from "./SizeGuideModal";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";
import { useAddToCart } from "@/features/main/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { Loader2 } from "lucide-react";
interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { user } = useAuthStore();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();
  const { mutate: addToCartServer, isPending } = useAddToCart();

  const name = isRtl ? product.nameAr : product.nameEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const currency = t("currency") || "AED";

  // Check availability
  const isInStock = product.stock > 0;
  
  // Format sizes if they exist
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : [];

  // Get currently selected size object if any
  const selectedSizeData = selectedSize ? sizes.find((s: any) => (typeof s === 'string' ? s : s.size) === selectedSize) : null;
  const currentPrice = (typeof selectedSizeData === 'object' && selectedSizeData?.price) || product.price;
  const currentOldPrice = (typeof selectedSizeData === 'object' && selectedSizeData?.oldPrice) || product.oldPrice;

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error(t("select_size_first"));
      return;
    }

    const payload = {
      productId: product._id,
      quantity: quantity,
      size: selectedSize || undefined,
    };

    if (user) {
      addToCartServer(payload);
    } else {
      const cartItem = {
        id: `${product._id}-${selectedSize || "nosize"}`,
        productId: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: currentPrice, // Use size-specific price
        mainImage: product.mainImage,
        size: selectedSize || "N/A",
        quantity: quantity,
        stock: sizes.length > 0 
          ? (sizes.find((s: any) => (typeof s === 'string' ? s : s.size) === selectedSize) as any)?.stock 
          : product.stock
      };

      addItem(cartItem);
      toast.success(t("item_added"));
    }
  };
  const { toggleWishlist, isInWishlist, isToggling } = useWishlist();
  const isFavorite = isInWishlist(product._id);

  const handleToggleWishlist = () => {
    if (!user) {
      toast.error(t("login_required_wishlist") || "Please login to add items to your wishlist");
      return;
    }
    toggleWishlist(product._id);
  };

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
                  star <= Math.round(product.averageRating || 5)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-secondary/20 text-secondary/40"
                )}
              />
            ))}
          </div>
          <span className="text-secondary font-medium text-sm">
            {product.numReviews} {t("Reviews") || "Reviews"}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-4 py-2">
        <div className="text-4xl font-extrabold text-primary animate-in fade-in slide-in-from-bottom-1 duration-300">
          {currency} {currentPrice.toFixed(2)}
        </div>
        {currentOldPrice && currentOldPrice > currentPrice && (
          <div className="text-xl text-content-tertiary line-through font-medium mb-1 opacity-60">
            {currency} {currentOldPrice.toFixed(2)}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-content-secondary">{t("Availability") || "Availability"}:</span>
        {isInStock ? (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {t("In Stock") || "In Stock"}
          </span>
        ) : (
          <span className="text-red-500">{t("Out of Stock")}</span>
        )}
      </div>

      <div className="h-px bg-divider w-full" />

      {sizes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-lg">{t("Size") || "Size"}</span>
            <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-sm text-content-tertiary underline decoration-dotted hover:text-primary transition-colors"
            >
              {t("Guide") || "Guide"}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((sizeObj: any) => {
              const sizeName = typeof sizeObj === 'string' ? sizeObj : sizeObj.size;
              const stock = typeof sizeObj === 'string' ? 10 : sizeObj.stock;
              const isAvailable = stock > 0;

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
          {selectedSize && (sizes.find((s: any) => (typeof s === 'string' ? s : s.size) === selectedSize) as any)?.stock === 0 && (
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
              className="p-1 hover:text-primary disabled:text-neutral-400 transition-colors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold text-primary min-w-[30px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock || isPending}
              className="p-1 hover:text-primary disabled:text-neutral-400 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <Button 
            size="lg" 
            onClick={handleAddToCart}
            disabled={!isInStock || isPending}
            className="flex-1 min-w-[200px] rounded-xl h-14 text-base font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("adding_to_cart")}
              </span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {t("add_to_cart") || "Add to Cart"}
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


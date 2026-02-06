"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, ShoppingCart, Heart, Eye, CheckCircle2 } from "lucide-react";
import { Product } from "@/features/dashboard/products/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeGuideModal } from "./SizeGuideModal";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";
import { useAddToCart } from "@/features/main/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { user } = useAuthStore();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
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

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error(t("select_size_first"));
      return;
    }

    const payload = {
      productId: product._id,
      quantity: 1,
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
        price: product.price,
        mainImage: product.mainImage,
        size: selectedSize || "N/A",
        quantity: 1,
        stock: sizes.length > 0 
          ? (sizes.find((s: any) => (typeof s === 'string' ? s : s.size) === selectedSize) as any)?.stock 
          : product.stock
      };

      addItem(cartItem);
      toast.success(t("item_added"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ... previous content ... */}
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
        <div className="text-4xl font-extrabold text-primary">
          {currency} {product.price.toFixed(2)}
        </div>
        {product.oldPrice && product.oldPrice > product.price && (
          <div className="text-xl text-content-tertiary line-through font-medium mb-1">
            {currency} {product.oldPrice.toFixed(2)}
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

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          size="lg" 
          onClick={handleAddToCart}
          disabled={!isInStock || isPending}
          className="flex-1 rounded-xl h-14 text-base font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          {isPending ? t("Adding...") || "Adding..." : t("add_to_cart") || "Add to Cart"}
        </Button>
        
        <div className="flex gap-3">
          <Button
            variant="outline" 
            size="icon" 
            className="h-14 w-14 rounded-xl border-divider hover:border-primary hover:text-primary transition-colors"
          >
            <Heart className="w-6 h-6" />
          </Button>
          <Button
             variant="outline"
             size="icon"
             onClick={handleAddToCart}
             disabled={!isInStock || isPending}
             className="h-14 w-14 rounded-xl border-divider hover:border-primary hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
          </Button>
          <Button
             variant="outline"
             size="icon"
             className="h-14 w-14 rounded-xl border-divider hover:border-primary hover:text-primary transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};


"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CartItem as CartItemType } from "../types/cart.types";
import { useCartStore } from "../stores/useCartStore";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/image.utils";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const locale = useLocale();
  const t = useTranslations("Shop");
  const isRtl = locale === "ar";
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 px-2 hover:bg-neutral-50 rounded-2xl transition-colors group">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-divider">
        <img
          src={getImageUrl(item.mainImage)}
          alt={isRtl ? item.nameAr : item.nameEn}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-primary">
              {isRtl ? item.nameAr : item.nameEn}
            </h3>
            <p className="mt-1 text-sm text-content-tertiary">
              {t("Size")}: {item.size}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:scale-110 transition-transform p-1"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-primary">
            {item.price.toFixed(2)} {t("currency")}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center bg-neutral-100 rounded-xl px-2 py-1 gap-4">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="p-1 hover:text-primary disabled:text-content-tertiary transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-base font-bold text-primary min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= item.stock}
              className="p-1 hover:text-primary disabled:text-content-tertiary transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

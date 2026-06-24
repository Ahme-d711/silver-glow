"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CartItem as CartItemType } from "../types/cart.types";
import { useUpdateCartQuantity, useRemoveFromCart } from "../hooks/useCart";
import { useGuestCartStore } from "../stores/useGuestCartStore";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const locale = useLocale();
  const t = useTranslations("Shop");
  const isRtl = locale === "ar";
  const { user } = useAuthStore();
  const updateGuestQuantity = useGuestCartStore((s) => s.updateQuantity);
  const removeGuestItem = useGuestCartStore((s) => s.removeItem);

  const { mutate: updateServerQuantity, isPending: isUpdating } = useUpdateCartQuantity();
  const { mutate: removeFromServer, isPending: isRemoving } = useRemoveFromCart();

  const isLoading = isUpdating || isRemoving;
  const size = item.size === "N/A" ? undefined : item.size;

  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    if (user) {
      updateServerQuantity({ productId: item.productId, quantity: newQuantity, size });
    } else {
      updateGuestQuantity(item.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      if (user) {
        updateServerQuantity({ productId: item.productId, quantity: newQuantity, size });
      } else {
        updateGuestQuantity(item.id, newQuantity);
      }
    }
  };

  const handleRemove = () => {
    if (user) {
      removeFromServer({ productId: item.productId, size });
    } else {
      removeGuestItem(item.id);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 px-2 hover:bg-neutral-50 rounded-2xl transition-colors group">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-divider">
        <Image
          src={getImageUrl(item.mainImage) || ""}
          alt={isRtl ? item.nameAr : item.nameEn}
          fill
          className="object-cover"
        />
      </div>

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
            onClick={handleRemove}
            disabled={isLoading}
            className="text-destructive hover:scale-110 transition-transform p-1 disabled:opacity-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-primary">
            {item.price.toFixed(2)} {t("currency")}
          </p>

          <div className="flex items-center bg-neutral-100 rounded-xl px-2 py-1 gap-4">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1 || isLoading}
              className="p-1 hover:text-primary disabled:text-content-tertiary transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-base font-bold text-primary min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= item.stock || isLoading}
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

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useGuestCartStore } from "../stores/useGuestCartStore";
import { cartService } from "../services/cart.service";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const useMergeCart = () => {
  const { user } = useAuthStore();
  const guestItems = useGuestCartStore((s) => s.items);
  const clearGuestCart = useGuestCartStore((s) => s.clearCart);
  const queryClient = useQueryClient();
  const t = useTranslations("Shop");
  const isMerging = useRef(false);
  const mergedForUser = useRef<string | null>(null);

  useEffect(() => {
    const mergeCart = async () => {
      if (!user || guestItems.length === 0 || isMerging.current) return;
      if (mergedForUser.current === user._id) return;

      isMerging.current = true;

      try {
        for (const item of guestItems) {
          await cartService.addItem({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size === "N/A" ? undefined : item.size,
          });
        }

        clearGuestCart();
        mergedForUser.current = user._id;
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(t("cart_merged"));
      } catch (error) {
        console.error("Failed to merge cart:", error);
      } finally {
        isMerging.current = false;
      }
    };

    mergeCart();
  }, [user, guestItems, clearGuestCart, queryClient, t]);

  useEffect(() => {
    if (!user) {
      mergedForUser.current = null;
    }
  }, [user]);
};

import { useEffect, useRef } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useAddToCart } from "./useCart";
import { useAuthStore } from "@/features/auth/stores/authStore";

export const useMergeCart = () => {
  const { user } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const { mutateAsync: addToCartServer } = useAddToCart();
  const isMerging = useRef(false);

  useEffect(() => {
    const mergeCart = async () => {
      // Only merge if we have a user and local guest items
      if (user && items.length > 0 && !isMerging.current) {
        isMerging.current = true;
        
        try {
          // Store items to clear later if successful
          const itemsToMerge = [...items];
          
          // Send all local items to server
          for (const item of itemsToMerge) {
            await addToCartServer({
              productId: item.productId,
              quantity: item.quantity,
              size: item.size === "N/A" ? undefined : item.size,
            });
          }
          
          // Successfully migrated to server, now clear local storage
          // This prevents the same items from being merged again if items.length changes
          clearCart();
        } catch (error) {
          console.error("Failed to merge cart:", error);
        } finally {
          isMerging.current = false;
        }
      }
    };

    mergeCart();
  }, [user, items.length, addToCartServer, clearCart]);
};

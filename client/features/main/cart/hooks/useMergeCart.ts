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
      const unsyncedItems = items.filter(item => !item.isSynced);
      
      // Only merge if we have a user and local guest items (unsynced)
      if (user && unsyncedItems.length > 0 && !isMerging.current) {
        isMerging.current = true;
        
        try {
          // Send all unsynced local items to server
          for (const item of unsyncedItems) {
            await addToCartServer({
              productId: item.productId,
              quantity: item.quantity,
              size: item.size === "N/A" ? undefined : item.size,
            });
          }
          
          // These items have been sent to server, but we don't need to clear the whole cart
          // because setItems will soon bring the synced versions.
          // However, to stop the loop immediately, we can mark them as synced locally 
          // or just wait for MainNavbar to call setItems(isSynced: true).
          // To be safe, let's keep the clearCart() but it will only clear what was there.
          clearCart();
        } catch (error) {
          console.error("Failed to merge cart:", error);
        } finally {
          isMerging.current = false;
        }
      }
    };

    mergeCart();
  }, [user, items, addToCartServer, clearCart]);
};

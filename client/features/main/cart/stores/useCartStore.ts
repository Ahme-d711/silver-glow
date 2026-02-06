import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CartStore } from "../types/cart.types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex((item) => item.id === newItem.id);

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          // Update quantity but respect stock limit
          const newQuantity = Math.min(
            updatedItems[existingItemIndex].quantity + newItem.quantity,
            updatedItems[existingItemIndex].stock
          );
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
          };
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "silver-glow-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

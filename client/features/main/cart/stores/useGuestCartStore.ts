import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "../types/cart.types";

interface GuestCartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useGuestCartStore = create<GuestCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();
        const existingIndex = items.findIndex((item) => item.id === newItem.id);

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: Math.min(
              updatedItems[existingIndex].quantity + newItem.quantity,
              updatedItems[existingIndex].stock
            ),
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
        const updatedItems = get().items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
            : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "silver-glow-guest-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

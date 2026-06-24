import { create } from "zustand";

export type LoginRequiredContext = "checkout" | "wishlist" | "wallet" | "review" | "default";

interface LoginRequiredModalState {
  open: boolean;
  context: LoginRequiredContext;
  openLoginRequired: (context?: LoginRequiredContext) => void;
  closeLoginRequired: () => void;
}

export const useLoginRequiredModal = create<LoginRequiredModalState>((set) => ({
  open: false,
  context: "default",
  openLoginRequired: (context = "default") => set({ open: true, context }),
  closeLoginRequired: () => set({ open: false }),
}));

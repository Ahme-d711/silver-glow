import { create } from "zustand";
import { User } from "../types";
import { getProfile } from "../actions/auth.service";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ token: null, user: null }),
  refreshUser: async () => {
    try {
      set({ isLoading: true });
      const { user, token } = await getProfile();
      set({ user, token, isLoading: false });
    } catch (error) {
      console.error("Failed to refresh user:", error);
      set({ user: null, token: null, isLoading: false });
    }
  },
}));


import { create } from 'zustand';
import { User } from '../types/auth.types';
import { getToken, saveToken, deleteToken } from '../../../utils/token';
import { authApi } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user: User, token: string) => {
    await saveToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await deleteToken();
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const token = await getToken();
      if (token) {
        try {
          // Fetch the latest user profile using the token
          const user = await authApi.getProfile();
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          // If profile fetch fails, the token might be invalid/expired
          console.error('Failed to fetch user profile during initialization', error);
          await deleteToken();
          set({ user: null, token: null, isAuthenticated: false });
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth store', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: (user: User) => {
    set({ user });
  },
}));

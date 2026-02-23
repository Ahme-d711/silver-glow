import { create } from 'zustand';
import { User } from '../types/auth.types';
import { getToken, saveToken, deleteToken } from '../../../utils/token';

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
        // In a real app, you might want to fetch the user profile here using the token
        set({ token, isAuthenticated: true });
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

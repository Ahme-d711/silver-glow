import { create } from 'zustand';

interface ModalState {
  isAuthModalVisible: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalVisible: false,
  openAuthModal: () => set({ isAuthModalVisible: true }),
  closeAuthModal: () => set({ isAuthModalVisible: false }),
}));

import { create } from 'zustand';

interface ModalState {
  isAuthModalVisible: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  // Status Modal
  isStatusModalVisible: boolean;
  statusType: 'success' | 'error';
  statusTitle: string;
  statusMessage: string;
  openStatusModal: (params: { type: 'success' | 'error'; title: string; message: string }) => void;
  closeStatusModal: () => void;

  // Confirm Modal
  isConfirmModalVisible: boolean;
  confirmTitle: string;
  confirmMessage: string;
  confirmType: 'danger' | 'warning';
  confirmLabel: string;
  onConfirm: () => void;
  openConfirmModal: (params: { 
    title: string; 
    message: string; 
    type?: 'danger' | 'warning'; 
    label?: string; 
    onConfirm: () => void 
  }) => void;
  closeConfirmModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalVisible: false,
  openAuthModal: () => set({ isAuthModalVisible: true }),
  closeAuthModal: () => set({ isAuthModalVisible: false }),

  // Status Modal Initial State
  isStatusModalVisible: false,
  statusType: 'success',
  statusTitle: '',
  statusMessage: '',
  openStatusModal: ({ type, title, message }) => set({ 
    isStatusModalVisible: true, 
    statusType: type, 
    statusTitle: title, 
    statusMessage: message 
  }),
  closeStatusModal: () => set({ isStatusModalVisible: false }),

  // Confirm Modal Initial State
  isConfirmModalVisible: false,
  confirmTitle: '',
  confirmMessage: '',
  confirmType: 'danger',
  confirmLabel: 'Confirm',
  onConfirm: () => {},
  openConfirmModal: ({ title, message, type = 'danger', label = 'Confirm', onConfirm }) => set({
    isConfirmModalVisible: true,
    confirmTitle: title,
    confirmMessage: message,
    confirmType: type,
    confirmLabel: label,
    onConfirm
  }),
  closeConfirmModal: () => set({ isConfirmModalVisible: false }),
}));

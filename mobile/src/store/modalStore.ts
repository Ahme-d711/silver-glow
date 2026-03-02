import { create } from 'zustand';

interface ModalConfig {
  type: 'success' | 'error' | 'warning' | 'danger' | 'auth';
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}

interface ModalState {
  isVisible: boolean;
  config: ModalConfig;
  
  // Legacy support for ConfirmModal (until fully replaced in consumption)
  isConfirmModalVisible: boolean;
  confirmTitle: string;
  confirmMessage: string;
  confirmType: 'danger' | 'warning';
  confirmLabel: string;
  onConfirm: () => void;
  
  // Unified methods
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  
  // Legacy wrappers for backward compatibility
  isAuthModalVisible: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  isStatusModalVisible: boolean;
  statusType: 'success' | 'error';
  statusTitle: string;
  statusMessage: string;
  openStatusModal: (params: { type: 'success' | 'error'; title: string; message: string }) => void;
  closeStatusModal: () => void;
  
  openConfirmModal: (params: { 
    title: string; 
    message: string; 
    type?: 'danger' | 'warning'; 
    label?: string; 
    onConfirm: () => void 
  }) => void;
  closeConfirmModal: () => void;
}

const DEFAULT_CONFIG: ModalConfig = {
  type: 'success',
  title: '',
  message: '',
};

export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  config: DEFAULT_CONFIG,

  // Legacy state
  isAuthModalVisible: false,
  isStatusModalVisible: false,
  statusType: 'success',
  statusTitle: '',
  statusMessage: '',
  isConfirmModalVisible: false,
  confirmTitle: '',
  confirmMessage: '',
  confirmType: 'danger',
  confirmLabel: 'Confirm',
  onConfirm: () => {},

  openModal: (config) => set({ isVisible: true, config }),
  closeModal: () => set({ isVisible: false }),

  // Auth wrappers
  openAuthModal: () => set({ 
    isVisible: true, 
    config: { type: 'auth', title: 'Login Required', message: 'Join our community to save your favorites and share your experience.' } 
  }),
  closeAuthModal: () => set({ isVisible: false }),

  // Status wrappers
  openStatusModal: ({ type, title, message }) => set({ 
    isVisible: true, 
    config: { type, title, message } 
  }),
  closeStatusModal: () => set({ isVisible: false }),

  // Confirm wrappers
  openConfirmModal: ({ title, message, type = 'danger', label = 'Confirm', onConfirm }) => set({
    isVisible: true,
    config: { type: type as any, title, message, confirmLabel: label, onConfirm },
    // Also set legacy state for safety
    isConfirmModalVisible: true,
    confirmTitle: title,
    confirmMessage: message,
    confirmType: type,
    confirmLabel: label,
    onConfirm
  }),
  closeConfirmModal: () => set({ 
    isVisible: false,
    isConfirmModalVisible: false 
  }),
}));

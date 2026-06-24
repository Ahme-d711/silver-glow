import { useAuthStore } from "../stores/authStore";
import {
  useLoginRequiredModal,
  type LoginRequiredContext,
} from "../stores/loginRequiredModalStore";

export const useRequireAuth = () => {
  const { user } = useAuthStore();
  const openLoginRequired = useLoginRequiredModal((s) => s.openLoginRequired);

  const requireAuth = (
    context: LoginRequiredContext = "default",
    onAuthenticated?: () => void
  ): boolean => {
    if (user) {
      onAuthenticated?.();
      return true;
    }
    openLoginRequired(context);
    return false;
  };

  return { requireAuth, isAuthenticated: !!user };
};

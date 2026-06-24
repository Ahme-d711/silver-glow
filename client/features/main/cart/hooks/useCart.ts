import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { cartService } from "../services/cart.service";
import { refreshWalletState } from "@/features/main/wallet/hooks/useWallet";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { mapCartItems, PopulatedCartItem } from "../utils/cart.utils";
import { useGuestCartStore } from "../stores/useGuestCartStore";

type ErrorResponse = { message?: string };

export const useCart = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCartItems = () => {
  const { user } = useAuthStore();
  const query = useCart();
  const guestItems = useGuestCartStore((s) => s.items);

  const serverItems = useMemo(() => {
    const rawItems = query.data?.data?.cart?.items as PopulatedCartItem[] | undefined;
    if (!rawItems) return [];
    return mapCartItems(rawItems);
  }, [query.data]);

  const items = user ? serverItems : guestItems;
  const isLoading = user ? query.isLoading : false;

  return {
    ...query,
    items,
    isLoading,
    isGuest: !user,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Shop");

  return useMutation({
    mutationFn: cartService.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(t("item_added"));
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to add item to cart");
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to update quantity");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, size }: { productId: string; size?: string }) =>
      cartService.removeItem(productId, size),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to clear cart");
    },
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.checkout,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      await refreshWalletState(queryClient);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Checkout failed");
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../services/cart.service";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";

type ErrorResponse = { message?: string };

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Checkout failed");
    },
  });
};

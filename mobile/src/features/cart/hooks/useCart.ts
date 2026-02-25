import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../services/cart.service";
import { AddToCartPayload, UpdateCartItemPayload } from "../types/cart.types";
import { AxiosError } from "axios";
import { useModalStore } from "../../../store/modalStore";
import { useAuthStore } from "../../auth/store/authStore";

export const useCart = () => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart(),
    enabled: !!user,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addItemToCart(payload),
    onSuccess: (data) => {
      openStatusModal({
        type: 'success',
        title: 'Added to Cart',
        message: data.message || "Item added to cart successfully"
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to add item to cart"
      });
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: (payload: UpdateCartItemPayload) => cartService.updateCartItemQuantity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to update quantity"
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: ({ productId, size }: { productId: string; size?: string }) => 
      cartService.removeItemFromCart(productId, size),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to remove item"
      });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: (data) => {
      openStatusModal({
        type: 'success',
        title: 'Cart Cleared',
        message: data.message || "Your cart has been cleared"
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to clear cart"
      });
    },
  });
};

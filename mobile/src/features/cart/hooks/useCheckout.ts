import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutService } from "../services/checkout.service";
import { CheckoutPayload } from "../types/checkout.types";
import { AxiosError } from "axios";
import { useModalStore } from "../../../store/modalStore";
import { router } from "expo-router";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) => checkoutService.processCheckout(payload),
    onSuccess: (data) => {
      openStatusModal({
        type: 'success',
        title: 'Order Placed!',
        message: data.message || "Your order has been placed successfully."
      });
      
      // Invalidate cart since it's now empty after checkout
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      // Also invalidate orders to show the new order in history
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });

      // Navigate back to home or orders
      router.replace("/(main)/orders");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Checkout Failed',
        message: error.response?.data?.message || "Something went wrong while placing your order."
      });
    },
  });
};

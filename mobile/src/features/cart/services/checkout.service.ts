import { axiosInstance } from "../../../services/api/axios";
import { CheckoutPayload, OrderResponse } from "../types/checkout.types";

export const checkoutService = {
  processCheckout: async (payload: CheckoutPayload): Promise<OrderResponse> => {
    const response = await axiosInstance.post<OrderResponse>("/orders/checkout", payload);
    return response.data;
  },
};

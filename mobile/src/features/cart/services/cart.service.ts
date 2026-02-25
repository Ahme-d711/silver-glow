import { axiosInstance } from "../../../services/api/axios";
import { CartResponse, AddToCartPayload, UpdateCartItemPayload } from "../types/cart.types";

export const cartService = {
  getCart: async (): Promise<CartResponse> => {
    const response = await axiosInstance.get<CartResponse>("/cart");
    return response.data;
  },

  addItemToCart: async (payload: AddToCartPayload): Promise<CartResponse> => {
    const response = await axiosInstance.post<CartResponse>("/cart/add", payload);
    return response.data;
  },

  updateCartItemQuantity: async (payload: UpdateCartItemPayload): Promise<CartResponse> => {
    const response = await axiosInstance.patch<CartResponse>("/cart/update", payload);
    return response.data;
  },

  removeItemFromCart: async (productId: string, size?: string): Promise<CartResponse> => {
    const url = `/cart/remove/${productId}${size ? `?size=${size}` : ""}`;
    const response = await axiosInstance.delete<CartResponse>(url);
    return response.data;
  },

  clearCart: async (): Promise<CartResponse> => {
    const response = await axiosInstance.delete<CartResponse>("/cart/clear");
    return response.data;
  },
};

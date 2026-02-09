import clientAxios from "@/lib/axios/clientAxios";

export const cartService = {
  getCart: async () => {
    const response = await clientAxios.get("/cart");
    return response.data;
  },

  addItem: async (payload: { productId: string; quantity: number; size?: string }) => {
    const response = await clientAxios.post("/cart/add", payload);
    return response.data;
  },

  updateQuantity: async (payload: { productId: string; quantity: number; size?: string }) => {
    const response = await clientAxios.patch("/cart/update", payload);
    return response.data;
  },

  removeItem: async (productId: string, size?: string) => {
    const response = await clientAxios.delete(`/cart/remove/${productId}`, {
      params: { size },
    });
    return response.data;
  },

  clearCart: async () => {
    const response = await clientAxios.delete("/cart/clear");
    return response.data;
  },

  checkout: async (payload: Record<string, unknown>) => {
    const response = await clientAxios.post("/orders/checkout", payload);
    return response.data;
  },
};

import axiosInstance from "@/lib/axios/clientAxios";
import { WishlistResponse, ToggleWishlistResponse } from "../types";

export const wishlistService = {
  getWishlist: async (): Promise<WishlistResponse> => {
    const response = await axiosInstance.get("/wishlist");
    return response.data;
  },

  toggleWishlistItem: async (productId: string): Promise<ToggleWishlistResponse> => {
    const response = await axiosInstance.post("/wishlist/toggle", { productId });
    return response.data;
  },

  clearWishlist: async (): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete("/wishlist/clear");
    return response.data;
  },
};

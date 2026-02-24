import { axiosInstance } from "../../../services/api/axios";
import { WishlistResponse, ToggleWishlistResponse } from "../types/wishlist.types";

export const wishlistService = {
  getWishlist: async (): Promise<WishlistResponse> => {
    const response = await axiosInstance.get<WishlistResponse>("/wishlist");
    return response.data;
  },

  toggleWishlistItem: async (productId: string): Promise<ToggleWishlistResponse> => {
    const response = await axiosInstance.post<ToggleWishlistResponse>("/wishlist/toggle", { productId });
    return response.data;
  },

  clearWishlist: async (): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete<{ success: boolean; message: string }>("/wishlist/clear");
    return response.data;
  },
};

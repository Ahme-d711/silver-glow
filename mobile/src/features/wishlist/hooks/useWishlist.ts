import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../services/wishlist.service";
import { Alert } from "react-native";
import { AxiosError } from "axios";
import { useAuthStore } from "../../auth/store/authStore";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
    enabled: !!user,
  });

  const isInWishlist = (productId: string) => {
    return query.data?.data?.wishlist?.products?.some((p) => p._id === productId) || false;
  };

  return {
    ...query,
    wishlist: query.data?.data?.wishlist,
    isInWishlist,
  };
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => wishlistService.toggleWishlistItem(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      // Also invalidate product queries to update UI if needed
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to update wishlist");
    },
  });
};

export const useClearWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: (data) => {
      Alert.alert("Success", data.message || "Wishlist cleared");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to clear wishlist");
    },
  });
};

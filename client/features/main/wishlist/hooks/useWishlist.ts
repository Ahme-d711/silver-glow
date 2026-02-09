import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../services/wishlist.service";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { AxiosError } from "axios";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.toggleWishlistItem(productId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(response.message);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Wishlist cleared");
    },
  });

  const isInWishlist = (productId: string) => {
    return data?.data?.wishlist?.products?.some((p: string | { _id: string }) => {
      if (typeof p === 'string') return p === productId;
      return p._id === productId;
    }) || false;
  };

  return {
    wishlist: data?.data?.wishlist,
    isLoading,
    toggleWishlist: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
    clearWishlist: clearMutation.mutate,
    isInWishlist,
  };
};

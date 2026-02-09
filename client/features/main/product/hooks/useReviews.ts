import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductReviews, addReview, updateReview, deleteReview } from "../services/review.service";
import { CreateReviewPayload, UpdateReviewPayload } from "../types/review.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => addReview(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", data.data.review.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to add review");
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateReviewPayload }) => updateReview(id, payload),
    onSuccess: (data) => {
      toast.success(data.message || "Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", data.data.review.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update review");
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, productId }: { id: string; productId: string }) => deleteReview(id),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });
};

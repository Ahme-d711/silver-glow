import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "../services/review.service";
import { CreateReviewPayload, UpdateReviewPayload } from "../types/review.types";
import { AxiosError } from "axios";
import { useModalStore } from "../../../store/modalStore";

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewService.getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewService.addReview(payload),
    onSuccess: (data) => {
      openStatusModal({
        type: 'success',
        title: 'Success',
        message: data.message || "Review added successfully"
      });
      queryClient.invalidateQueries({ queryKey: ["reviews", data.data.review.productId] });
      queryClient.invalidateQueries({ queryKey: ["product", data.data.review.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to add review"
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateReviewPayload }) => 
      reviewService.updateReview(id, payload),
    onSuccess: (data) => {
      openStatusModal({
        type: 'success',
        title: 'Success',
        message: data.message || "Review updated successfully"
      });
      queryClient.invalidateQueries({ queryKey: ["reviews", data.data.review.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to update review"
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: ({ id, productId }: { id: string; productId: string }) => 
      reviewService.deleteReview(id),
    onSuccess: (data, variables) => {
      openStatusModal({
        type: 'success',
        title: 'Success',
        message: data.message || "Review deleted successfully"
      });
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      openStatusModal({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || "Failed to delete review"
      });
    },
  });
};

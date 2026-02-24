import { axiosInstance } from '../../../services/api/axios';
import {
  ReviewsResponse,
  ReviewResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "../types/review.types";

export const reviewService = {
  getProductReviews: async (productId: string): Promise<ReviewsResponse> => {
    const response = await axiosInstance.get<ReviewsResponse>(`/reviews/product/${productId}`);
    return response.data;
  },

  addReview: async (payload: CreateReviewPayload): Promise<ReviewResponse> => {
    const response = await axiosInstance.post<ReviewResponse>("/reviews", payload);
    return response.data;
  },

  updateReview: async (id: string, payload: UpdateReviewPayload): Promise<ReviewResponse> => {
    const response = await axiosInstance.patch<ReviewResponse>(`/reviews/${id}`, payload);
    return response.data;
  },

  deleteReview: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/reviews/${id}`);
    return response.data;
  },
};

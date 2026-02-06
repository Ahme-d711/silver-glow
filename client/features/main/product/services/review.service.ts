import axios from "@/lib/axios/clientAxios";
import {
  ReviewsResponse,
  ReviewResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "../types/review.types";

export const getProductReviews = async (productId: string): Promise<ReviewsResponse> => {
  const { data } = await axios.get(`/reviews/product/${productId}`);
  return data;
};

export const addReview = async (payload: CreateReviewPayload): Promise<ReviewResponse> => {
  const { data } = await axios.post("/reviews", payload);
  return data;
};

export const updateReview = async (id: string, payload: UpdateReviewPayload): Promise<ReviewResponse> => {
  const { data } = await axios.patch(`/reviews/${id}`, payload);
  return data;
};

export const deleteReview = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axios.delete(`/reviews/${id}`);
  return data;
};

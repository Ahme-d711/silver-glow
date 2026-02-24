export interface Review {
  _id: string;
  userId: {
    _id: string;
    name: string;
    picture?: string;
  };
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewPayload {
  rating?: number;
  comment?: string;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: {
    reviews: Review[];
  };
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: Review;
  };
}

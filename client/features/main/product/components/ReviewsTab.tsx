"use client";

import { useState } from "react";
import { Star, Trash2, Edit, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useProductReviews, useAddReview, useUpdateReview, useDeleteReview } from "../hooks/useReviews";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/image.utils";

interface ReviewsTabProps {
  productId: string;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ productId }) => {
  const t = useTranslations("Shop");
  const tCommon = useTranslations("Common");
  const { user } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const { data: reviewsData, isLoading } = useProductReviews(productId);
  const { mutate: addReview, isPending: isAdding } = useAddReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const reviews = reviewsData?.data?.reviews || [];

  const handleSubmit = () => {
    if (!user) return;
    
    if (editingReviewId) {
      updateReview(
        { 
          id: editingReviewId, 
          payload: { rating, comment } 
        },
        {
          onSuccess: () => {
            setEditingReviewId(null);
            setRating(0);
            setComment("");
          },
        }
      );
    } else {
      addReview(
        { productId, rating, comment },
        {
          onSuccess: () => {
            setRating(0);
            setComment("");
          },
        }
      );
    }
  };

  const handleEdit = (reviewId: string, currentRating: number, currentComment?: string) => {
    setEditingReviewId(reviewId);
    setRating(currentRating);
    setComment(currentComment || "");
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setRating(0);
    setComment("");
  };

  const handleDelete = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview({ id: reviewId, productId });
    }
  };

  const userReview = reviews.find((r) => r.userId._id === user?._id);
  const canAddReview = user && !userReview && !editingReviewId;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add/Edit Review Form */}
      {user && (canAddReview || editingReviewId) && (
        <div className="border border-divider rounded-2xl p-6 space-y-4 bg-neutral-50/50">
          <h3 className="text-lg font-semibold text-primary">
            {editingReviewId ? t("edit_review") : t("write_review")}
          </h3>
          
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-content-secondary">{t("rating")}:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-6 h-6",
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-neutral-200 text-neutral-200"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("share_thoughts")}
            className="min-h-[100px]"
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || isAdding || isUpdating}
              className="rounded-xl"
            >
              {(isAdding || isUpdating) && <Loader className="w-4 h-4 animate-spin mr-2" />}
              {editingReviewId ? tCommon("save") : tCommon("submit")}
            </Button>
            {editingReviewId && (
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="rounded-xl"
              >
                {tCommon("cancel")}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">

        {reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-divider rounded-2xl">
            <p className="text-content-tertiary">{t("no_reviews")}</p>
            {user && <p className="text-sm text-content-secondary mt-2">{t("first_to_review")}</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const isUserReview = review.userId._id === user?._id;
              
              return (
                <div
                  key={review._id}
                  className="border border-divider rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={getImageUrl(review.userId.picture) || undefined} alt={review.userId.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.userId.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-primary">{review.userId.name}</p>
                        <p className="text-xs text-content-tertiary">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {isUserReview && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(review._id, review.rating, review.comment)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(review._id)}
                          disabled={isDeleting}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-4 h-4",
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-neutral-200 text-neutral-200"
                        )}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-content-secondary leading-relaxed">{review.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useProductReviews, useAddReview, useUpdateReview, useDeleteReview } from '../hooks/useReviews';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { getImageUrl } from '../../../utils/image.utils';
import { useLanguage } from '@/src/hooks/useLanguage';

interface ReviewsSectionProps {
  productId: string;
  numReviews?: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId, numReviews = 0 }) => {
  const { user } = useAuthStore();
  const { openAuthModal, openConfirmModal } = useModalStore();
  const { t, currentLanguage } = useLanguage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const { data: reviewsData, isLoading } = useProductReviews(productId);
  const { mutate: addReview, isPending: isAdding } = useAddReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const reviews = reviewsData?.data?.reviews || [];

  const handleSubmit = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    
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
    openConfirmModal({
      title: t('product.delete_review'),
      message: t('product.delete_review_confirm'),
      type: 'danger',
      label: t('product.delete'),
      onConfirm: () => deleteReview({ id: reviewId, productId })
    });
  };

  const userReview = reviews.find((r) => r.userId._id === user?._id);
  const canAddReview = !userReview && !editingReviewId;

  if (isLoading) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="small" color="#192C56" />
      </View>
    );
  }

  return (
    <View className="px-6 pb-10">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-primary">
          {t('product.reviews')} ({reviews.length})
        </Text>
      </View>

      {/* Add/Edit Review Form */}
      {(canAddReview || editingReviewId) && (
        <View className="border border-divider rounded-2xl p-5 mb-8 bg-gray-50/50">
          <Text className="text-lg font-semibold text-primary mb-4">
            {editingReviewId ? t('product.edit_review') : t('product.write_review')}
          </Text>
          
          {/* Star Rating */}
          <View className="flex-row items-center mb-4">
            <Text className="text-content-secondary font-medium mr-3">{t('product.rating')}:</Text>
            <View className="flex-row gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Feather
                    name="star"
                    size={24}
                    color={star <= rating ? "#F59E0B" : "#D1D5DB"}
                    fill={star <= rating ? "#F59E0B" : "none"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment */}
          <TextInput
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
            placeholder={t('product.share_thoughts')}
            className="bg-white border border-divider rounded-xl p-4 min-h-[100px] mb-2 text-content-primary"
            maxLength={300}
            textAlignVertical="top"
          />
          <Text className={`text-[10px] text-right mb-4 ${comment.length >= 250 ? 'text-error' : 'text-content-tertiary'}`}>
            {comment.length}/300
          </Text>

          {/* Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={rating === 0 || comment.length > 300 || isAdding || isUpdating}
              className={`flex-1 h-12 rounded-xl items-center justify-center ${
                rating === 0 || comment.length > 300 || isAdding || isUpdating ? 'bg-divider' : 'bg-primary'
              }`}
            >
              {isAdding || isUpdating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-bold">{editingReviewId ? t('common.save') : t('product.submit')}</Text>
              )}
            </TouchableOpacity>
            {editingReviewId && (
              <TouchableOpacity
                onPress={handleCancelEdit}
                className="flex-1 h-12 rounded-xl border border-divider items-center justify-center bg-white"
              >
                <Text className="text-content-primary font-bold">{t('common.cancel')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Reviews List */}
      <View className="gap-4">
        {reviews.length === 0 ? (
          <View className="items-center py-10 border-2 border-dashed border-divider rounded-2xl">
            <Text className="text-content-tertiary">{t('product.no_reviews')}.</Text>
            {user && <Text className="text-sm text-content-secondary mt-1">{t('product.be_first_review')}</Text>}
          </View>
        ) : (
          reviews.map((review) => {
            const isUserReview = review.userId._id === user?._id;
            
            return (
              <View
                key={review._id}
                className="border border-divider rounded-2xl p-5"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center overflow-hidden">
                      {review.userId.picture ? (
                        <Image 
                          source={{ uri: getImageUrl(review.userId.picture) || undefined }} 
                          className="w-full h-full"
                        />
                      ) : (
                        <Text className="text-primary font-bold">
                          {review.userId.name.charAt(0).toUpperCase()}
                        </Text>
                      )}
                    </View>
                    <View>
                      <Text className="font-semibold text-primary">{review.userId.name}</Text>
                      <Text className="text-xs text-content-tertiary">
                        {new Date(review.createdAt).toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US')}
                      </Text>
                    </View>
                  </View>

                  {isUserReview && (
                    <View className="flex-row gap-1">
                      <TouchableOpacity 
                        onPress={() => handleEdit(review._id, review.rating, review.comment)}
                        className="h-10 w-10 items-center justify-center"
                        activeOpacity={0.6}
                      >
                        <Feather name="edit-2" size={18} color="#475569" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDelete(review._id)}
                        disabled={isDeleting}
                        className="h-10 w-10 items-center justify-center"
                        activeOpacity={0.6}
                      >
                        <Feather name="trash-2" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Rating Stars */}
                <View className="flex-row gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Feather
                      key={star}
                      name="star"
                      size={14}
                      color={star <= review.rating ? "#F59E0B" : "#D1D5DB"}
                      fill={star <= review.rating ? "#F59E0B" : "none"}
                    />
                  ))}
                </View>

                {/* Comment */}
                {review.comment && (
                  <Text className="text-content-secondary leading-5">{review.comment}</Text>
                )}
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

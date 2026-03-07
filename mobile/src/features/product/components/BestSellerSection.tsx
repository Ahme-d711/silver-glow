import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useBestSellers } from '../hooks/useProduct';
import { ProductCard } from './ProductCard';
import { SectionHeader } from '@/components/ui/section-header';
import { useWishlist, useToggleWishlist } from '../../wishlist/hooks/useWishlist';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { useLanguage } from '@/src/hooks/useLanguage';

export const BestSellerSection = () => {
  const { user } = useAuthStore();
  const { openAuthModal } = useModalStore();
  const { data: products, isLoading } = useBestSellers();
  const { isInWishlist } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { t } = useLanguage();

  const handleWishlistToggle = (productId: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    toggleWishlist(productId);
  };

  if (isLoading) {
    return (
      <View className="px-6 py-10 items-center">
        <ActivityIndicator size="large" color="#0B1324" />
      </View>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <View className="py-8">
      <View className="px-6">
        <SectionHeader title={t('home.best_seller')} />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      >
        {products.map((product) => (
          <View key={product._id} style={{ width: 320 }}>
            <ProductCard 
              product={product} 
              isInWishlist={isInWishlist(product._id)}
              onWishlistPress={() => handleWishlistToggle(product._id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

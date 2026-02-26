import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useWishlist, useToggleWishlist } from '../hooks/useWishlist';
import { WishlistCard } from '../components/WishlistCard';
import { PageHeader } from '../../../../components/ui/page-header';
import { LoadingState } from '../../../../components/ui/LoadingState';
import { ErrorState } from '../../../../components/ui/ErrorState';

export const WishlistTemplate: React.FC = () => {
  const { data: wishlistData, isLoading, isRefetching, refetch, error } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const items = wishlistData?.data?.wishlist?.products || [];

  if (isLoading && !isRefetching) {
    return <LoadingState title="Wishlist" />;
  }

  if (error) {
    return <ErrorState title="Wishlist" onRetry={refetch} />;
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <PageHeader title="Wishlist" />

      <ScrollView 
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#192C56" />
        }
      >
        {items.length === 0 ? (
          <View className="py-20 items-center justify-center">
            <View className="bg-primary/5 p-8 rounded-full mb-4">
              <Feather name="heart" size={48} color="#192C56" />
            </View>
            <Text className="text-primary text-xl font-bold">Empty Wishlist</Text>
            <Text className="text-content-tertiary mt-2 text-center px-10">
              Start adding your favorite items to your wishlist and they will appear here!
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <WishlistCard 
              key={item._id} 
              product={item} 
              onRemove={() => toggleWishlist(item._id)}
            />
          ))
        )}
        
        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

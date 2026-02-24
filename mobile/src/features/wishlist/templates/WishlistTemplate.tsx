import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useWishlist, useToggleWishlist } from '../hooks/useWishlist';
import { WishlistCard } from '../components/WishlistCard';
import { PageHeader } from '@/components/ui/page-header';

export const WishlistTemplate: React.FC = () => {
  const { data: wishlistData, isLoading, isRefetching, refetch } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const items = wishlistData?.data?.wishlist?.products || [];

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Custom Header */}
      <PageHeader title="Wishlist" />

      <ScrollView 
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#192C56" />
        }
      >
        {isLoading && !isRefetching ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#192C56" />
          </View>
        ) : items.length === 0 ? (
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
        
        {/* Padding for bottom scroll */}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

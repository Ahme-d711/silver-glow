import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWishlist, useToggleWishlist } from '../hooks/useWishlist';
import { WishlistCard } from '../components/WishlistCard';

export const WishlistTemplate: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data: wishlistData, isLoading, isRefetching, refetch } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const items = wishlistData?.data?.wishlist?.products || [];

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Custom Header */}
      <View 
        className="bg-primary pb-8 px-6 rounded-b-[40px] shadow-lg"
        style={{ paddingTop: insets.top + 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-3xl font-bold">Wishlist</Text>
          <TouchableOpacity 
            className="bg-white/20 p-2.5 rounded-2xl"
            activeOpacity={0.7}
          >
            <Feather name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

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

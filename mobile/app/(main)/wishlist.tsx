import React from 'react';
import { View, Text } from 'react-native';
import { PageHeader } from '@/components/ui/page-header';

export default function WishlistScreen() {
  return (
    <View className="flex-1 bg-background">
      <PageHeader title="Wishlist" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-content-primary text-xl font-bold">Wishlist</Text>
        <Text className="text-content-tertiary mt-2 text-center">Your favorite items will appear here.</Text>
      </View>
    </View>
  );
}

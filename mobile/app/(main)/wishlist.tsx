import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function WishlistScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text className="text-content-primary text-xl font-bold">Wishlist</Text>
        <Text className="text-content-tertiary mt-2">Your favorite items will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

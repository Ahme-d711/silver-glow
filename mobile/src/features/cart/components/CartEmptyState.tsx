import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';

interface CartEmptyStateProps {
  onExplore: () => void;
}

export const CartEmptyState: React.FC<CartEmptyStateProps> = ({ onExplore }) => {
  return (
    <View className="flex-1 bg-background">
      <PageHeader title="My Cart" />
      <View className="flex-1 justify-center items-center px-10">
        <View className="bg-gray-100 p-8 rounded-full mb-6">
          <Feather name="shopping-cart" size={60} color="#CBD5E1" />
        </View>
        <Text className="text-2xl font-bold text-primary text-center">Your cart is empty</Text>
        <Text className="text-content-tertiary text-center mt-3 text-lg">
          Looks like you haven't added anything to your cart yet.
        </Text>
        <Button 
          title="Explore Shop"
          onPress={onExplore}
          className="mt-8 px-10"
        />
      </View>
    </View>
  );
};

import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CheckoutItemCard } from './CheckoutItemCard';
import { CartItem } from '../types/cart.types';

interface CheckoutItemsProps {
  items: CartItem[];
}

export const CheckoutItems: React.FC<CheckoutItemsProps> = ({ items }) => {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-4">
        <View className="bg-primary/10 p-2 rounded-lg mr-3">
          <Feather name="shopping-bag" size={20} color="#192C56" />
        </View>
        <Text className="text-xl font-bold text-primary">Your Items</Text>
      </View>
      {items.map((item) => (
        <CheckoutItemCard key={`${item.productId._id}-${item.size}`} item={item} />
      ))}
    </View>
  );
};

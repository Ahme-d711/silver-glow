import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../../../components/ui/button';

interface ProductDetailsFooterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isInStock: boolean;
  isAdding: boolean;
  onAddToCart: () => void;
}

export const ProductDetailsFooter: React.FC<ProductDetailsFooterProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  isInStock,
  isAdding,
  onAddToCart,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-divider flex-row items-center gap-4">
      {/* Quantity Selector */}
      <View className="flex-row items-center bg-gray-50 rounded-2xl px-2 border border-divider h-[60px]">
        <TouchableOpacity 
          onPress={onDecrement}
          className="p-2"
          disabled={quantity <= 1}
        >
          <Feather name="minus" size={20} color={quantity <= 1 ? "#CBD5E1" : "#192C56"} />
        </TouchableOpacity>
        
        <View className="w-10 items-center">
          <Text className="text-primary font-bold text-lg">{quantity}</Text>
        </View>

        <TouchableOpacity 
          onPress={onIncrement}
          className="p-2"
        >
          <Feather name="plus" size={20} color="#192C56" />
        </TouchableOpacity>
      </View>

      <Button 
        title={isInStock ? 'Add to Cart' : 'Out of Stock'}
        leftIcon="cart-outline"
        onPress={onAddToCart}
        disabled={!isInStock}
        loading={isAdding}
        className="flex-1"
        variant={isInStock ? 'primary' : 'outline'}
      />
    </View>
  );
};

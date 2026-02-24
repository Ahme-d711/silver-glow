import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProductInfoSegmentProps {
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export const ProductInfoSegment: React.FC<ProductInfoSegmentProps> = ({
  name,
  price,
  oldPrice,
  rating = 0,
  isWishlisted = false,
  onWishlistToggle,
}) => {
  return (
    <View>
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-4">
          <Text className="text-2xl font-bold text-content-primary capitalize">{name}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-2xl font-bold text-primary mr-2">
              ${(price || 0).toFixed(2)}
            </Text>
            {oldPrice && (
              <Text className="text-lg text-content-tertiary line-through">
                ${oldPrice.toFixed(2)}
              </Text>
            )}
            <View className="flex-row items-center ml-4">
              <Feather name="star" size={16} color="#F59E0B" fill="#F59E0B" />
              <Text className="ml-1 text-content-secondary font-bold">
                {(rating || 0).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          onPress={onWishlistToggle}
          className={`p-3 rounded-full ${isWishlisted ? 'bg-error/10' : 'bg-gray-100'}`}
        >
          <Feather 
            name="heart" 
            size={24} 
            color={isWishlisted ? '#EF4444' : '#64748B'} 
            fill={isWishlisted ? '#EF4444' : 'none'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

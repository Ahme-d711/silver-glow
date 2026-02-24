import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product } from '../../product/types/product.types';
import { getImageUrl } from '../../../utils/image.utils';
import { router } from 'expo-router';

interface WishlistCardProps {
  product: Product;
  onRemove: () => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ product, onRemove }) => {
  const imageUrl = getImageUrl(product.mainImage);
  
  const handlePress = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <View className="bg-white rounded-[20px] p-3 mb-4 flex-row items-center border border-divider shadow-sm">
      {/* Product Image */}
      <View className="h-40 w-36 rounded-[15px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Feather name="image" size={24} color="#CBD5E1" />
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="flex-1 ml-4 justify-between h-24 py-1">
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-lg font-bold text-primary flex-1 mr-2 capitalize" numberOfLines={1}>
              {product.nameEn}
            </Text>
            <TouchableOpacity 
              onPress={onRemove}
              className="bg-red-50 p-1.5 rounded-full"
            >
              <Feather name="heart" size={20} color="#EF4444" fill="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-content-tertiary text-sm" numberOfLines={1}>
            {product.descriptionEn || "No description available"}
          </Text>
          
          {/* <Text className="text-content-secondary text-sm mt-1">
            Size : {product.sizes?.[0]?.size || "N/A"}
          </Text> */}
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center">
            <Feather name="briefcase" size={14} color="#64748B" />
            <Text className="ml-1.5 text-lg font-bold text-primary">
              {product.price} $
            </Text>
          </View>

          <TouchableOpacity 
            onPress={handlePress}
            className="bg-primary px-5 py-2.5 rounded-xl"
          >
            <Text className="text-white font-bold text-lg">Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

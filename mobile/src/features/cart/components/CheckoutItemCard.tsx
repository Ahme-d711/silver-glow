import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem } from '../types/cart.types';
import { getImageUrl } from '../../../utils/image.utils';

interface CheckoutItemCardProps {
  item: CartItem;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({ item }) => {
  const { productId, quantity, size } = item;
  const imageUrl = getImageUrl(productId.mainImage);

  return (
    <View className="bg-white rounded-[20px] p-3 mb-4 flex-row items-center border border-divider shadow-sm opacity-90">
      {/* Product Image */}
      <View className="h-24 w-24 rounded-[12px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Feather name="image" size={20} color="#CBD5E1" />
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="flex-1 ml-4 justify-between h-20 py-0.5">
        <View>
          <Text className="text-base font-bold text-primary capitalize" numberOfLines={1}>
            {productId.nameEn}
          </Text>
          
          <Text className="text-content-tertiary text-xs" numberOfLines={1}>
            {productId.descriptionEn || "No description available"}
          </Text>
          
          <View className="flex-row items-center mt-1">
            {size && (
              <View className="bg-gray-100 px-2 py-0.5 rounded-md mr-2">
                <Text className="text-content-secondary text-[10px] font-bold">
                  Size: {size}
                </Text>
              </View>
            )}
            <View className="bg-primary/5 px-2 py-0.5 rounded-md">
              <Text className="text-primary text-[10px] font-bold">
                Qty: {quantity}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center">
          <Feather name="briefcase" size={12} color="#64748B" />
          <Text className="ml-1 text-base font-bold text-primary">
            {(productId.price * quantity).toFixed(2)} $
          </Text>
        </View>
      </View>
    </View>
  );
};

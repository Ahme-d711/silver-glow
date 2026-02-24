import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Product } from '../types/product.types';
import { getImageUrl } from '../../../utils/image.utils';
import { LinearGradient } from 'expo-linear-gradient';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onWishlistPress?: () => void;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPress, 
  onWishlistPress,
  isInWishlist = false 
}) => {
  const name = product.nameEn;
  const description = product.descriptionEn || "Your ring, your style";
  const imageUrl = getImageUrl(product.mainImage);

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-6 w-full"
      style={styles.cardContainer}
    >
      <View className="flex-1 rounded-[30px] overflow-hidden bg-[#F1F5F9]">
        <Image
          source={{ uri: imageUrl ?? '' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
        />
        
        {/* Dark Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Wishlist Button */}
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={onWishlistPress}
          className="absolute top-4 right-4 bg-black/40 p-3 rounded-full"
        >
          <Feather 
            name="heart" 
            size={20} 
            color={isInWishlist ? "#EF4444" : "white"} 
          />
        </TouchableOpacity>

        {/* Product Info with Vertical Line */}
        <View className="absolute bottom-6 left-6 right-6 flex-row items-center">
          <View className="w-1 h-12 bg-white rounded-full mr-3" />
          <View className="flex-1">
            <Text className="text-white font-bold text-lg mb-1" numberOfLines={1}>
              {name}
            </Text>
            <Text className="text-white/80 text-xs" numberOfLines={1}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 3/4,
    maxHeight: 225,
  }
});

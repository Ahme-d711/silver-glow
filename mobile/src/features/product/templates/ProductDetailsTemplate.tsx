import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProductDetails } from '../hooks/useProduct';
import { ProductImageCarousel } from '../components/ProductImageCarousel';
import { ProductInfoSegment } from '../components/ProductInfoSegment';
import { SizeSelector } from '../components/SizeSelector';
import { Feather } from '@expo/vector-icons';

interface ProductDetailsTemplateProps {
  id: string;
}

export const ProductDetailsTemplate: React.FC<ProductDetailsTemplateProps> = ({ id }) => {
  const { data: product, isLoading, error } = useProductDetails(id);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log(product);
  

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#192C56" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-error font-bold">Failed to load product</Text>
      </View>
    );
  }

  const allImages = [
    product.mainImage, 
    ...(product.images || [])
  ].filter(img => !!img); // Filter out any undefined or empty strings
  
  const normalizedSizes = product.sizes && product.sizes.length > 0 
    ? product.sizes.map(s => s.size) 
    : ['5.0', '6.0', '7.0', '8.0', '9.0']; // Fallback

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <ProductImageCarousel images={allImages} />

        {/* Content Card */}
        <View className="bg-white -mt-8 rounded-t-[40px] px-6 pt-10 pb-32">
          <ProductInfoSegment
            name={product.nameEn}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.averageRating}
            isWishlisted={isWishlisted}
            onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
          />

          <View className="mt-8">
            <Text className="text-content-secondary leading-6 text-lg">
              {product.descriptionEn || "No description available for this product."}
            </Text>
          </View>

          <SizeSelector 
            sizes={normalizedSizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* Badges */}
          <View className="flex-row items-center mt-8 gap-4">
            <View className="bg-primary/5 px-4 py-2 rounded-lg flex-row items-center border border-primary/10">
              <Text className="text-primary font-bold">15 % Discount</Text>
            </View>
            <View className="bg-green-50 px-4 py-2 rounded-lg flex-row items-center border border-green-100">
              <Feather name="truck" size={16} color="#10B981" />
              <Text className="ml-2 text-green-600 font-bold">Free</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Floating Footer - Simplified for design alignment */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-divider flex-row items-center justify-between">
        <TouchableOpacity className="bg-primary flex-1 h-[60px] rounded-2xl items-center justify-center">
            <Text className="text-white font-bold text-xl">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

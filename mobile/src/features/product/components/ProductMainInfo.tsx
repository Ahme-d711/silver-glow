import React from 'react';
import { View, Text } from 'react-native';
import { ProductInfoSegment } from './ProductInfoSegment';
import { SizeSelector } from './SizeSelector';

interface ProductMainInfoProps {
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  isInStock: boolean;
  currentStock: number;
  description?: string;
  sizes: string[];
  selectedSize?: string;
  onSizeSelect: (size: string) => void;
}

export const ProductMainInfo: React.FC<ProductMainInfoProps> = ({
  name,
  price,
  oldPrice,
  rating,
  isWishlisted,
  onWishlistToggle,
  isInStock,
  currentStock,
  description,
  sizes,
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <View className="bg-white -mt-8 rounded-t-[40px] px-6 pt-10 mb-8 border-b border-divider pb-5">
      <ProductInfoSegment
        name={name}
        price={price}
        oldPrice={oldPrice}
        rating={rating}
        isWishlisted={isWishlisted}
        onWishlistToggle={onWishlistToggle}
      />

      <View className="flex-row items-center mt-4">
        <Text className="text-content-secondary font-medium mr-2">Availability:</Text>
        {isInStock ? (
          <Text className="text-success font-bold">In Stock ({currentStock})</Text>
        ) : (
          <Text className="text-error font-bold">Out of Stock</Text>
        )}
      </View>

      <View className="mt-8">
        <Text className="text-content-secondary leading-6 text-lg">
          {description || "No description available for this product."}
        </Text>
      </View>

      <SizeSelector 
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={onSizeSelect}
      />
    </View>
  );
};

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useProductDetails } from '../hooks/useProduct';
import { ProductImageCarousel } from '../components/ProductImageCarousel';
import { ProductMainInfo } from '../components/ProductMainInfo';
import { ReviewsSection } from '../components/ReviewsSection';
import { BestSellerSection } from '../components/BestSellerSection';

import { useWishlist, useToggleWishlist } from '../../wishlist/hooks/useWishlist';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';

import { useAddToCart } from '../../cart/hooks/useCart';
import { Button } from '../../../../components/ui/button';
import { ProductDetailsFooter } from '../components/ProductDetailsFooter';
import { useLanguage } from '@/src/hooks/useLanguage';

interface ProductDetailsTemplateProps {
  id: string;
}

export const ProductDetailsTemplate: React.FC<ProductDetailsTemplateProps> = ({ id }) => {
  const { data: product, isLoading, error } = useProductDetails(id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { t, currentLanguage } = useLanguage();
  
  const { user } = useAuthStore();
  const { openAuthModal } = useModalStore();
  const { isInWishlist } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const handleWishlistToggle = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    toggleWishlist(id);
  };

  const handleAddToCart = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    
    addToCart({
      productId: id,
      quantity,
      size: selectedSize || undefined
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product, selectedSize]);

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
  
  const sizes = product.sizes || [];
  const selectedSizeData = selectedSize ? sizes.find((s) => s.size === selectedSize) : null;
  
  const currentPrice = selectedSizeData?.price || product.price;
  const currentOldPrice = selectedSizeData?.oldPrice || product.oldPrice;
  const currentStock = selectedSizeData ? selectedSizeData.stock : product.stock;
  
  const normalizedSizes = sizes.map(s => s.size);

  const isInStock = currentStock > 0;

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <ProductImageCarousel images={allImages} />

        <View className='pb-24'>
        {/* Content Card */}
        <ProductMainInfo 
          name={currentLanguage === 'ar' ? product.nameAr : product.nameEn}
          price={currentPrice}
          oldPrice={currentOldPrice}
          rating={product.averageRating}
          isWishlisted={isInWishlist(id)}
          onWishlistToggle={handleWishlistToggle}
          isInStock={isInStock}
          currentStock={currentStock}
          description={currentLanguage === 'ar' ? product.descriptionAr : product.descriptionEn}
          sizes={normalizedSizes}
          selectedSize={selectedSize || undefined}
          onSizeSelect={setSelectedSize}
        />


        <ReviewsSection productId={id} />

        <View className="mb-10">
          <BestSellerSection />
        </View>
        </View>
      </ScrollView>

      <ProductDetailsFooter 
        quantity={quantity}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        isInStock={isInStock}
        isAdding={isAdding}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

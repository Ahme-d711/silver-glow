import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '../../../../components/ui/button';
import { Feather } from '@expo/vector-icons';
import { Product } from '../../product/types/product.types';
import { getImageUrl } from '../../../utils/image.utils';
import { router } from 'expo-router';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';
import { useLanguage } from '@/src/hooks/useLanguage';

interface WishlistCardProps {
  product: Product;
  onRemove: () => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ product, onRemove }) => {
  const { t, currentLanguage } = useLanguage();
  // Use getImageUrl to get the full path for the image
  const imageUrl = getImageUrl(product.mainImage);
  
  const handlePress = () => {
    router.push(`/product/${product._id}`);
  };

  const WishlistAction = (
    <TouchableOpacity 
      onPress={onRemove}
      className="bg-red-50 p-1.5 rounded-full"
    >
      <Feather name="heart" size={20} color="#EF4444" fill="#EF4444" />
    </TouchableOpacity>
  );

  const ShopButton = (
    <Button 
      title={t('wishlist.shop_now')}
      onPress={handlePress}
      size="sm"
      className="w-32"
    />
  );

  // Use the root price and size if available, fallback to sizes array
  const displayPrice = product.price || product.sizes?.[0]?.price;
  const displaySize = product.sizes?.[0]?.size;

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={currentLanguage === 'ar' ? product.nameAr : product.nameEn}
      description={
        (currentLanguage === 'ar' ? product.descriptionAr : product.descriptionEn) || t('wishlist.no_description')
      }
      price={displayPrice}
      size={displaySize}
      imageSize="lg"
      onPress={handlePress}
      topRightAction={WishlistAction}
      bottomRightAction={ShopButton}
    />
  );
};

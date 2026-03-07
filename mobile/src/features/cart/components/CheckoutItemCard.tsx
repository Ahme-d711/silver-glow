import React from 'react';
import { CartItem } from '../types/cart.types';
import { getImageUrl } from '../../../utils/image.utils';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';
import { useLanguage } from '@/src/hooks/useLanguage';

interface CheckoutItemCardProps {
  item: CartItem;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({ item }) => {
  const { productId, quantity, size } = item;
  const imageUrl = getImageUrl(productId.mainImage);
  const { t, currentLanguage } = useLanguage();

  const getUnitPrice = () => {
    if (size && productId.sizes) {
      const sizeData = productId.sizes.find(s => s.size === size);
      if (sizeData) return sizeData.price;
    }
    return productId.price;
  };

  const unitPrice = getUnitPrice();

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={currentLanguage === 'ar' ? productId.nameAr : productId.nameEn}
      description={(currentLanguage === 'ar' ? productId.descriptionAr : productId.descriptionEn) || t('cart.no_description')}
      price={(unitPrice * quantity).toFixed(2)}
      size={size}
      quantity={quantity}
      imageSize="sm"
      isCompact={true}
    />
  );
};

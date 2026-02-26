import React from 'react';
import { CartItem } from '../types/cart.types';
import { getImageUrl } from '../../../utils/image.utils';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';

interface CheckoutItemCardProps {
  item: CartItem;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({ item }) => {
  const { productId, quantity, size } = item;
  const imageUrl = getImageUrl(productId.mainImage);

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={productId.nameEn}
      description={productId.descriptionEn || "No description available"}
      price={(productId.price * quantity).toFixed(2)}
      size={size}
      quantity={quantity}
      imageSize="sm"
      isCompact={true}
    />
  );
};

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem } from '../types/cart.types';
import { getImageUrl } from '../../../utils/image.utils';
import { useUpdateCartQuantity, useRemoveFromCart } from '../hooks/useCart';
import { useModalStore } from '../../../store/modalStore';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { productId, quantity, size } = item;
  const imageUrl = getImageUrl(productId.mainImage);
  const { openConfirmModal } = useModalStore();
  
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartQuantity();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart();

  const handleIncrement = () => {
    updateQuantity({ 
      productId: productId._id, 
      quantity: quantity + 1, 
      size 
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity({ 
        productId: productId._id, 
        quantity: quantity - 1, 
        size 
      });
    }
  };

  const handleRemove = () => {
    openConfirmModal({
      title: "Remove Item",
      message: `Are you sure you want to remove "${productId.nameEn}" from your cart?`,
      type: 'danger',
      label: 'Remove',
      onConfirm: () => removeItem({ productId: productId._id, size })
    });
  };

  const getUnitPrice = () => {
    if (size && productId.sizes) {
      const sizeData = productId.sizes.find(s => s.size === size);
      if (sizeData) return sizeData.price;
    }
    return productId.price;
  };

  const unitPrice = getUnitPrice();

  const QuantitySelector = (
    <View className="flex-row items-center bg-gray-50 rounded-xl px-2 py-1 border border-divider shadow-sm">
      <TouchableOpacity 
        onPress={handleDecrement}
        disabled={quantity <= 1 || isUpdating}
        className={`p-1 ${quantity <= 1 ? 'opacity-30' : ''}`}
      >
        <Feather name="minus-circle" size={20} color="#192C56" />
      </TouchableOpacity>
      
      <View className="w-8 items-center">
        {isUpdating ? (
          <ActivityIndicator size="small" color="#192C56" />
        ) : (
          <Text className="text-primary font-bold text-base">{quantity}</Text>
        )}
      </View>

      <TouchableOpacity 
        onPress={handleIncrement}
        disabled={isUpdating}
        className="p-1"
      >
        <Feather name="plus-circle" size={20} color="#192C56" />
      </TouchableOpacity>
    </View>
  );

  const RemoveButton = (
    <TouchableOpacity 
      onPress={handleRemove}
      disabled={isRemoving}
      className="bg-red-50 p-1.5 rounded-full"
    >
      <Feather name="trash-2" size={18} color="#EF4444" />
    </TouchableOpacity>
  );

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={productId.nameEn}
      description={productId.descriptionEn || "No description available"}
      price={(unitPrice * quantity).toFixed(2)}
      size={size}
      imageSize="lg"
      topRightAction={RemoveButton}
      bottomRightAction={QuantitySelector}
    />
  );
};

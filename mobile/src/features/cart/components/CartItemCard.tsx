import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem } from '../types/cart.types';
import { getImageUrl } from '../../../utils/image.utils';
import { useUpdateCartQuantity, useRemoveFromCart } from '../hooks/useCart';
import { useModalStore } from '../../../store/modalStore';

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
      <View className="flex-1 ml-4 justify-between h-28 py-1">
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-lg font-bold text-primary flex-1 mr-2 capitalize" numberOfLines={1}>
              {productId.nameEn}
            </Text>
            <TouchableOpacity 
              onPress={handleRemove}
              disabled={isRemoving}
              className="bg-red-50 p-1.5 rounded-full"
            >
              <Feather name="trash-2" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-content-tertiary text-sm" numberOfLines={1}>
            {productId.descriptionEn || "No description available"}
          </Text>
          
          {size && (
            <Text className="text-content-secondary text-sm mt-1">
              Size : {size}
            </Text>
          )}
        </View>

        <View className="flex-row justify-between items-center mt-2">
          {/* Price */}
          <View className="flex-row items-center">
            <Feather name="briefcase" size={14} color="#64748B" />
            <Text className="ml-1.5 text-lg font-bold text-primary">
              {(productId.price * quantity).toFixed(2)} $
            </Text>
          </View>

          {/* Quantity Selector */}
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
        </View>
      </View>
    </View>
  );
};

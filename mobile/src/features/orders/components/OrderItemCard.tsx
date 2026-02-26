import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { OrderItem, OrderStatus } from '../types/orders.types';
import { getImageUrl } from '../../../utils/image.utils';

interface OrderItemCardProps {
  item: OrderItem;
  status: OrderStatus;
  note?: string;
  date?: string;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, status, note, date }) => {
  const imageUrl = getImageUrl(item.image || item.productId?.mainImage);
  
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return { label: 'DONE', color: 'text-green-600', bg: 'bg-green-50', icon: 'checkmark-circle-outline' as const };
      case 'CANCELLED':
        return { label: 'CANCELLED', color: 'text-red-600', bg: 'bg-red-50', icon: 'close-circle-outline' as const };
      case 'PENDING':
        return { label: 'PENDING', color: 'text-[#9A3412]', bg: 'bg-[#FEF3C7]', icon: 'time-outline' as const };
      case 'PROCESSING':
      case 'CONFIRMED':
        return { label: 'PROCESSING', color: 'text-[#4338CA]', bg: 'bg-[#E0E7FF]', icon: 'cube-outline' as const };
      default:
        return { label: status, color: 'text-blue-600', bg: 'bg-blue-50', icon: 'alert-circle-outline' as const };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <View className="bg-white rounded-[20px] p-3 mb-4 flex-row items-center border border-divider shadow-sm">
      {/* Status Badge - Floating or Top Right */}
      <View className="absolute top-3 right-3 z-10">
        <View className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex-row items-center border border-divider/20`}>
          <Ionicons name={statusConfig.icon} size={14} color={statusConfig.color.startsWith('text-[#') ? statusConfig.color.replace('text-', '') : undefined} />
          <Text className={`${statusConfig.color} font-bold text-[10px] ml-1.5`}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Product Image */}
      <View className="h-28 w-28 rounded-[15px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Feather name="image" size={24} color="#CBD5E1" />
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="flex-1 ml-4 justify-between h-24 py-1">
        <View>
          <Text className="text-lg font-bold text-primary capitalize" numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text className="text-content-tertiary text-sm" numberOfLines={1}>
            {note || item.productId?.descriptionEn || "Add a touch of elegance to your"}
          </Text>
          
          {item.size && (
            <Text className="text-content-secondary text-sm mt-0.5">
              Size : {item.size}
            </Text>
          )}
        </View>

        <View className="flex-row justify-between items-end">
          <View>
             {date && (
                <View className="mb-1">
                  <Text className="text-[10px] text-content-tertiary uppercase font-bold">Order Date</Text>
                  <Text className="text-primary font-bold text-xs">{new Date(date).toLocaleDateString()}</Text>
                </View>
             )}
            <View className="flex-row items-center">
              <Feather name="briefcase" size={14} color="#64748B" />
              <Text className="ml-1.5 text-lg font-bold text-primary">
                {item.price} $
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

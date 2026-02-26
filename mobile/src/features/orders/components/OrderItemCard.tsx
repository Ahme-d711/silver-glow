import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderItem, OrderStatus } from '../types/orders.types';
import { getImageUrl } from '../../../utils/image.utils';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';

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
      case 'CONFIRMED':
        return { label: 'CONFIRMED', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'checkmark-done-outline' as const };
      case 'PROCESSING':
        return { label: 'PROCESSING', color: 'text-[#4338CA]', bg: 'bg-[#E0E7FF]', icon: 'cube-outline' as const };
      case 'SHIPPED':
        return { label: 'SHIPPED', color: 'text-purple-600', bg: 'bg-purple-50', icon: 'bus-outline' as const };
      case 'RETURNED':
        return { label: 'RETURNED', color: 'text-slate-600', bg: 'bg-slate-50', icon: 'arrow-undo-outline' as const };
      default:
        return { label: status, color: 'text-neutral-600', bg: 'bg-neutral-50', icon: 'alert-circle-outline' as const };
    }
  };

  const statusConfig = getStatusConfig(status);

  const StatusBadge = (
    <View className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex-row items-center border border-divider/20`}>
      <Ionicons 
        name={statusConfig.icon} 
        size={14} 
        color={statusConfig.color.startsWith('text-[#') ? statusConfig.color.replace('text-', '') : undefined} 
      />
      <Text className={`${statusConfig.color} font-bold text-[10px] ml-1.5`}>
        {statusConfig.label}
      </Text>
    </View>
  );

  const FooterContent = date ? (
    <View className="mb-1">
      <Text className="text-[10px] text-content-tertiary uppercase font-bold">Order Date</Text>
      <Text className="text-primary font-bold text-xs">{new Date(date).toLocaleDateString()}</Text>
    </View>
  ) : undefined;

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={item.name}
      description={note || item.productId?.descriptionEn || "Add a touch of elegance to your"}
      price={item.price}
      size={item.size}
      imageSize="md"
      statusBadge={StatusBadge}
      footerContent={FooterContent}
    />
  );
};

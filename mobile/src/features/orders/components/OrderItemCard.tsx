import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderItem, OrderStatus } from '../types/orders.types';
import { getImageUrl } from '../../../utils/image.utils';
import { GenericItemCard } from '../../../components/ui/GenericItemCard';
import { useLanguage } from '@/src/hooks/useLanguage';

interface OrderItemCardProps {
  item: OrderItem;
  status: OrderStatus;
  note?: string;
  date?: string;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, status, note, date }) => {
  const { t, currentLanguage } = useLanguage();
  const imageUrl = getImageUrl(item.image || item.productId?.mainImage);
  
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return { label: t('orders.status_delivered'), color: 'text-green-600', bg: 'bg-green-50', icon: 'checkmark-circle-outline' as const };
      case 'CANCELLED':
        return { label: t('orders.status_cancelled'), color: 'text-red-600', bg: 'bg-red-50', icon: 'close-circle-outline' as const };
      case 'PENDING':
        return { label: t('orders.status_pending'), color: 'text-[#9A3412]', bg: 'bg-[#FEF3C7]', icon: 'time-outline' as const };
      case 'CONFIRMED':
        return { label: t('orders.status_confirmed'), color: 'text-blue-600', bg: 'bg-blue-50', icon: 'checkmark-done-outline' as const };
      case 'PROCESSING':
        return { label: t('orders.status_processing'), color: 'text-[#4338CA]', bg: 'bg-[#E0E7FF]', icon: 'cube-outline' as const };
      case 'SHIPPED':
        return { label: t('orders.status_shipped'), color: 'text-purple-600', bg: 'bg-purple-50', icon: 'bus-outline' as const };
      case 'RETURNED':
        return { label: t('orders.status_returned'), color: 'text-slate-600', bg: 'bg-slate-50', icon: 'arrow-undo-outline' as const };
      default:
        return { label: status, color: 'text-neutral-600', bg: 'bg-neutral-50', icon: 'alert-circle-outline' as const };
    }
  };

  const statusConfig = getStatusConfig(status);

  const price = item.price * item.quantity;

  const StatusBadge = (
    <View className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex-row items-center border border-divider/20`}>
      <Ionicons 
        name={statusConfig.icon} 
        size={14} 
        color={statusConfig.color.startsWith('text-[#') ? statusConfig.color.replace('text-', '') : undefined} 
      />
      <Text className={`${statusConfig.color} font-bold text-[10px] ${currentLanguage === 'ar' ? 'mr-1.5' : 'ml-1.5'}`}>
        {statusConfig.label}
      </Text>
    </View>
  );

  const FooterContent = date ? (
    <View className="mb-1">
      <Text className="text-sm text-content-tertiary uppercase font-semibold">{t('orders.order_date')}</Text>
      <Text className="text-primary font-bold text-sm">
        {new Date(date).toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US')}
      </Text>
    </View>
  ) : undefined;

  return (
    <GenericItemCard
      image={imageUrl ?? undefined}
      title={currentLanguage === 'ar' ? (item.productId?.nameAr || item.name) : (item.productId?.nameEn || item.name)}
      description={note || (currentLanguage === 'ar' ? item.productId?.descriptionAr : item.productId?.descriptionEn) || t('product.no_description')}
      price={price}
      imageSize="md"
      statusBadge={StatusBadge}
      footerContent={FooterContent}
    />
  );
};

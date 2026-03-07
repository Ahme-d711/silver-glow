import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../types/orders.types';
import { useLanguage } from '@/src/hooks/useLanguage';

interface LastOrderSectionProps {
  order: Order;
}

export const LastOrderSection: React.FC<LastOrderSectionProps> = ({ order }) => {
  const { t, currentLanguage } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (currentLanguage === 'ar') {
      return date.toLocaleDateString('ar-EG', { 
        month: 'long', 
        day: 'numeric' 
      }) + `، ${date.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })}`;
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    }) + `, ${date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  const getStatusMessage = (status: string) => {
    const id = order._id.slice(-5);
    switch (status) {
      case 'DELIVERED':
        return t('orders.msg_delivered', { id });
      case 'CANCELLED':
        return t('orders.msg_cancelled', { id });
      case 'SHIPPED':
        return t('orders.msg_shipped', { id });
      default:
        return t('orders.msg_compiled', { id });
    }
  };

  return (
    <View className="mb-8">
      <Text className="text-xl font-bold text-primary mb-4">{t('orders.last_order')}</Text>
      <View className="flex-row items-center">
        <View className="bg-primary/5 p-2 rounded-xl">
          <Ionicons name="reader-outline" size={28} color="#192C56" />
          <View className={`absolute -top-1 ${currentLanguage === 'ar' ? '-left-1' : '-right-1'} bg-white rounded-full`}>
            <Ionicons name="checkmark-circle" size={16} color="#192C56" />
          </View>
        </View>
        <View className={`${currentLanguage === 'ar' ? 'mr-4' : 'ml-4'} flex-1`}>
          <Text className="text-content-tertiary text-sm font-medium">
            {formatDate(order.createdAt)}
          </Text>
          <Text className={`text-primary font-bold text-base mt-1 ${currentLanguage === 'ar' ? 'text-right' : ''}`} numberOfLines={2}>
            {getStatusMessage(order.status)}
          </Text>
        </View>
      </View>
    </View>
  );
};

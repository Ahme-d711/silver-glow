import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../types/orders.types';

interface LastOrderSectionProps {
  order: Order;
}

export const LastOrderSection: React.FC<LastOrderSectionProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
    switch (status) {
      case 'DELIVERED':
        return `Order #${order._id.slice(-5)} has been delivered`;
      case 'CANCELLED':
        return `Order #${order._id.slice(-5)} was cancelled`;
      case 'SHIPPED':
        return `Order #${order._id.slice(-5)} is on its way`;
      default:
        return `Request number ${order._id.slice(-5)}# has been compiled`;
    }
  };

  return (
    <View className="mb-8">
      <Text className="text-xl font-bold text-primary mb-4">Last Order</Text>
      <View className="flex-row items-center">
        <View className="bg-primary/5 p-2 rounded-xl">
          <Ionicons name="reader-outline" size={28} color="#192C56" />
          <View className="absolute -top-1 -right-1 bg-white rounded-full">
            <Ionicons name="checkmark-circle" size={16} color="#192C56" />
          </View>
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-content-tertiary text-sm font-medium">
            {formatDate(order.createdAt)}
          </Text>
          <Text className="text-primary font-bold text-base mt-1" numberOfLines={2}>
            {getStatusMessage(order.status)}
          </Text>
        </View>
      </View>
    </View>
  );
};

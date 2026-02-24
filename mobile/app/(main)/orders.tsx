import React from 'react';
import { View, Text } from 'react-native';
import { PageHeader } from '@/components/ui/page-header';

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-background">
      <PageHeader title="My Orders" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-medium text-gray-900">No orders yet</Text>
      </View>
    </View>
  );
}

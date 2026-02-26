import React from 'react';
import { View, Text } from 'react-native';

interface AccountStatsProps {
  totalOrders: number;
  totalBalance: number;
}

export const AccountStats: React.FC<AccountStatsProps> = ({ totalOrders, totalBalance }) => (
  <View className="px-6 mt-6">
    <View className="flex-row gap-4">
      <View className="flex-1 bg-primary/5 p-5 rounded-[24px] items-center border border-primary/10">
        <Text className="text-primary font-bold text-xl">{totalOrders || 0}</Text>
        <Text className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-1">Orders</Text>
      </View>
      <View className="flex-1 bg-primary/5 p-5 rounded-[24px] items-center border border-primary/10">
        <Text className="text-primary font-bold text-xl">{totalBalance || 0}$</Text>
        <Text className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-1">Balance</Text>
      </View>
    </View>
  </View>
);

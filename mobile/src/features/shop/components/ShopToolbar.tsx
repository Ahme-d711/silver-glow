import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ShopToolbarProps {
  onOpenFilter: () => void;
  onOpenSort: () => void;
  sortLabel: string;
  totalItems: number;
}

export const ShopToolbar: React.FC<ShopToolbarProps> = ({
  onOpenFilter,
  onOpenSort,
  sortLabel,
  totalItems,
}) => {
  return (
    <View className="px-6 py-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity 
          onPress={onOpenFilter}
          className="flex-row items-center bg-primary/5 px-4 py-2.5 rounded-xl border border-primary/10 mr-3"
        >
          <Feather name="filter" size={18} color="#192C56" />
          <Text className="ml-2 text-primary font-bold">Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onOpenSort}
          className="flex-row items-center bg-white px-4 py-2.5 rounded-xl border border-divider"
        >
          <Feather name="list" size={18} color="#64748B" />
          <Text className="ml-2 text-content-secondary font-semibold">{sortLabel}</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-content-tertiary font-medium">
        {totalItems} Items
      </Text>
    </View>
  );
};

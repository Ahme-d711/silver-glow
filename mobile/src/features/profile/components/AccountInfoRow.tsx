import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AccountInfoRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  isLast?: boolean;
}

export const AccountInfoRow: React.FC<AccountInfoRowProps> = ({ icon, label, value, isLast }) => (
  <View className={`flex-row items-center py-5 ${!isLast ? 'border-b border-slate-50' : ''}`}>
    <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center mr-4">
      <Feather name={icon} size={18} color="#192C56" />
    </View>
    <View className="flex-1">
      <Text className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</Text>
      <Text className="text-slate-800 text-[16px] font-bold mt-0.5">{value}</Text>
    </View>
  </View>
);

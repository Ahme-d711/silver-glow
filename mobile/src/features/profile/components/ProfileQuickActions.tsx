import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLanguage } from '@/src/hooks/useLanguage';

interface ProfileQuickActionsProps {
  onOrdersPress: () => void;
  onWalletPress: () => void;
}

export const ProfileQuickActions: React.FC<ProfileQuickActionsProps> = ({ 
  onOrdersPress, 
  onWalletPress 
}) => {
  const { t } = useLanguage();

  return (
    <View className="flex-row justify-between mb-8">
      <TouchableOpacity 
        onPress={onOrdersPress}
        className="bg-white flex-1 mr-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
      >
        <Feather name="package" size={20} color="#192C56" />
        <Text className="ml-2 font-bold text-primary">{t('profile.my_orders')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={onWalletPress}
        className="bg-white flex-1 ml-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
      >
        <Feather name="credit-card" size={20} color="#192C56" />
        <Text className="ml-2 font-bold text-primary">{t('profile.my_wishlist')}</Text>
      </TouchableOpacity>
    </View>
  );
};

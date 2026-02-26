import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProfileQuickActionsProps {
  onOrdersPress: () => void;
  onWishlistPress: () => void;
}

export const ProfileQuickActions: React.FC<ProfileQuickActionsProps> = ({ 
  onOrdersPress, 
  onWishlistPress 
}) => {
  return (
    <View className="flex-row justify-between mb-8">
      <TouchableOpacity 
        onPress={onOrdersPress}
        className="bg-white flex-1 mr-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
      >
        <Feather name="package" size={20} color="#192C56" />
        <Text className="ml-2 font-bold text-slate-700">My Orders</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={onWishlistPress}
        className="bg-white flex-1 ml-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
      >
        <Feather name="heart" size={20} color="#192C56" />
        <Text className="ml-2 font-bold text-slate-700">My Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CartSummaryFooterProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export const CartSummaryFooter: React.FC<CartSummaryFooterProps> = ({ 
  subtotal, 
  shipping, 
  total, 
  onCheckout 
}) => {
  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8"
      style={{ paddingBottom: 110 }} // Lift above TabBar
    >
      <View className="gap-4 mb-6">
        <View className="flex-row justify-between">
          <Text className="text-content-secondary text-lg">Subtotal</Text>
          <Text className="text-primary font-bold text-lg">${subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-content-secondary text-lg">Shipping</Text>
          <Text className="text-primary font-bold text-lg">${shipping.toFixed(2)}</Text>
        </View>
        <View className="h-[1px] bg-divider my-1" />
        <View className="flex-row justify-between">
          <Text className="text-primary font-bold text-2xl">Total</Text>
          <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={onCheckout}
      >
        <LinearGradient
          colors={['#192C56', '#2A457D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-[70px] rounded-3xl overflow-hidden items-center justify-center flex-row shadow-xl shadow-primary/40"
        >
          <Text className="text-white font-bold text-xl mr-3">Checkout Now</Text>
          <Feather name="arrow-right" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

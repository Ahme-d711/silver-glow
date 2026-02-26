import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../../../components/ui/button';

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

      <Button 
        title="Checkout Now"
        rightIcon="arrow-forward"
        onPress={onCheckout}
      />
    </View>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../../../components/ui/button';
import { useLanguage } from '@/src/hooks/useLanguage';

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
  const { t, currentLanguage } = useLanguage();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8"
      style={{ paddingBottom: 110 }} // Lift above TabBar
    >
      <View className="gap-4 mb-6">
        <View className="flex-row justify-between">
          <Text className="text-content-secondary text-lg">{t('cart.subtotal')}</Text>
          <Text className="text-primary font-bold text-lg">${subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-content-secondary text-lg">{t('cart.shipping')}</Text>
          <Text className="text-primary font-bold text-lg">${shipping.toFixed(2)}</Text>
        </View>
        <View className="h-[1px] bg-divider my-1" />
        <View className="flex-row justify-between">
          <Text className="text-primary font-bold text-2xl">{t('cart.total')}</Text>
          <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
        </View>
      </View>

      <Button 
        title={t('cart.checkout_now')}
        rightIcon={currentLanguage === 'ar' ? "arrow-back" : "arrow-forward"}
        onPress={onCheckout}
      />
    </View>
  );
};

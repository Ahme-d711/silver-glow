import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../../components/ui/button';

interface CheckoutSummaryProps {
  total: number;
  isProcessing: boolean;
  onConfirm: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ total, isProcessing, onConfirm }) => {
  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-[40px] border-t border-divider p-8"
      style={{ paddingBottom: 110 }} 
    >
      <View className="gap-3 mb-6">
        <View className="flex-row justify-between">
          <Text className="text-content-secondary text-base">Total Amount</Text>
          <Text className="text-primary font-extrabold text-2xl">${total.toFixed(2)}</Text>
        </View>
      </View>

      <Button
        title="Confirm Order"
        rightIcon="checkmark-outline"
        onPress={onConfirm}
        loading={isProcessing}
      />
    </View>
  );
};

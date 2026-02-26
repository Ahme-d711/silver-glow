import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { Button } from '../../../../components/ui/button';

interface CartGuestStateProps {
  onLogin: () => void;
}

export const CartGuestState: React.FC<CartGuestStateProps> = ({ onLogin }) => {
  return (
    <View className="flex-1 bg-background">
      <PageHeader title="My Cart" />
      <View className="flex-1 justify-center items-center px-10">
        <View className="bg-primary/10 p-8 rounded-full mb-6">
          <Feather name="shopping-bag" size={60} color="#192C56" />
        </View>
        <Text className="text-2xl font-bold text-primary text-center">Your cart is waiting</Text>
        <Text className="text-content-tertiary text-center mt-3 text-lg">
          Login to see your items and start shopping our premium collection.
        </Text>
        <Button 
          title="Login Now"
          onPress={onLogin}
          className="mt-8 px-10"
        />
      </View>
    </View>
  );
};

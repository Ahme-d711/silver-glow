import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { VerifyForm } from '../../src/features/auth/components/VerifyForm';

export default function VerifyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View className="flex-1">
        <VerifyForm />
      </View>
    </SafeAreaView>
  );
}

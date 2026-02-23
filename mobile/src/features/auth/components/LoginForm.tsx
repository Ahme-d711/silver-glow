import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

export const LoginForm = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white -mt-12 rounded-t-[40px] px-8 pt-10">
      <Input 
        label="Phone"
        autoCapitalize="none"
      />

      <Input 
        label="Password"
        isPassword
      />
      
      <Button 
        title="Login"
        onPress={() => router.replace('/(main)')}
        className="mb-4"
      />

      <Button 
        title="Join as Guest"
        variant="outline"
        onPress={() => router.replace('/(main)')}
        className="mb-8"
      />
      
      <View className="flex-row justify-center items-center">
        <Text className="text-content-secondary text-base">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-primary text-base font-bold">Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

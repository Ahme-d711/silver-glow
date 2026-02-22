import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-5 bg-white">
      <Text className="text-4xl font-bold text-gray-900">Silver Glow</Text>
      <Text className="text-lg text-gray-600 mb-10">Welcome Back</Text>
      
      <View className="w-full">
        <TextInput 
          className="w-full h-12 border border-gray-200 rounded-lg px-4 mb-4 text-base"
          placeholder="Email" 
          keyboardType="email-address" 
          autoCapitalize="none"
        />
        <TextInput 
          className="w-full h-12 border border-gray-200 rounded-lg px-4 mb-4 text-base"
          placeholder="Password" 
          secureTextEntry 
        />
        
        <TouchableOpacity 
          className="w-full h-12 bg-black rounded-lg justify-center items-center mt-2"
          onPress={() => router.replace('/(main)')}
        >
          <Text className="color-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/register')}
          className="mt-5 items-center"
        >
          <Text className="text-gray-600 text-sm">Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
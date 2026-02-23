import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  isPassword?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export const Input = ({ label, isPassword, leftIcon, error, className, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-5">
      {label && (
        <Text className="text-content-secondary text-lg mb-2 font-medium">{label}</Text>
      )}
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-4 top-4 z-10">
            <Ionicons name={leftIcon} size={20} color={error ? "#ef4444" : "#9ca3af"} />
          </View>
        )}
        <TextInput
          className={`w-full h-14 border ${
            error ? 'border-red-500' : 'border-divider'
          } rounded-2xl px-4 text-base bg-white shadow-sm ${
            isPassword ? 'pr-12' : ''
          } ${leftIcon ? 'pl-12' : ''} ${className || ''}`}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {isPassword && ( 
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-error text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

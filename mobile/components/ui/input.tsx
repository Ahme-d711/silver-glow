import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  isPassword?: boolean;
}

export const Input = ({ label, isPassword, className, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-content-secondary text-base mb-2 font-medium">{label}</Text>
      )}
      <View className="relative">
        <TextInput
          className={`w-full h-14 border border-divider rounded-2xl px-4 text-base bg-white shadow-sm ${
            isPassword ? 'pr-12' : ''
          } ${className || ''}`}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && ( 
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

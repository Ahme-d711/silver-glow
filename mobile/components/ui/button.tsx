import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline';
  textClassName?: string;
  loading?: boolean;
}

export const Button = ({ title, variant = 'primary', className, textClassName, loading, disabled, ...props }: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'outline':
        return 'bg-divider border border-divider';
      default:
        return 'bg-primary';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return 'text-content-secondary';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      className={`w-full h-14 rounded-2xl justify-center items-center ${getVariantStyles()} ${className || ''}`}
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor() === 'text-white' ? '#fff' : '#000'} />
      ) : (
        <Text className={`text-lg font-bold ${getTextColor()} ${textClassName || ''}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

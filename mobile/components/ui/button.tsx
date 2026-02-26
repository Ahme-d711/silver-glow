import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline' | 'danger' | 'ghost';
  textClassName?: string;
  loading?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  title, 
  variant = 'primary', 
  className, 
  textClassName, 
  loading, 
  disabled, 
  leftIcon,
  rightIcon,
  size = 'lg',
  ...props 
}: ButtonProps) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return ['#192C56', '#2A457D'];
      case 'danger':
        return ['#EF4444', '#DC2626'];
      default:
        return null;
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-10';
      case 'md': return 'h-12';
      case 'lg': return 'h-16';
      default: return 'h-16';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'bg-transparent border border-divider';
      case 'ghost':
        return 'bg-transparent';
      default:
        return '';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  const colors = getColors();

  const content = (
    <View className="flex-row items-center justify-center px-6 w-full h-full">
      {loading ? (
        <ActivityIndicator color={getTextColor() === 'text-white' ? '#fff' : '#192C56'} />
      ) : (
        <>
          {leftIcon && (
            <Ionicons 
              name={leftIcon} 
              size={size === 'sm' ? 18 : 22} 
              color={getTextColor() === 'text-white' ? '#fff' : '#192C56'} 
              style={{ marginRight: 10 }}
            />
          )}
          <Text className={`${size === 'sm' ? 'text-base' : 'text-xl'} font-bold ${getTextColor()} ${textClassName || ''}`}>
            {title}
          </Text>
          {rightIcon && (
            <Ionicons 
              name={rightIcon} 
              size={size === 'sm' ? 18 : 22} 
              color={getTextColor() === 'text-white' ? '#fff' : '#192C56'} 
              style={{ marginLeft: 10 }}
            />
          )}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      className={`${getHeight()} rounded-2xl overflow-hidden justify-center items-center ${getVariantStyles()} ${!className?.includes('w-') ? 'w-full' : ''} ${variant === 'primary' || variant === 'danger' ? 'shadow-xl shadow-primary/40' : ''} ${className || ''}`}
      activeOpacity={0.8}
      disabled={disabled || loading}
      {...props}
    >
      {colors ? (
        <LinearGradient
          colors={colors as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};


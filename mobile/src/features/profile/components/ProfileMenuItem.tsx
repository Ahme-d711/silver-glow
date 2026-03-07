import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/src/hooks/useLanguage';

export interface ProfileMenuItemProps {
  icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap;
  iconType?: 'Feather' | 'Ionicons';
  iconColor: string;
  bgColor: string;
  title: string;
  rightLabel?: string;
  onPress: () => void;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ 
  icon, 
  iconType = 'Feather', 
  iconColor, 
  bgColor, 
  title, 
  rightLabel, 
  onPress
}) => {
  const { currentLanguage } = useLanguage();

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center justify-between py-4 ${currentLanguage === 'ar' ? 'flex-row-reverse' : ''}`}
      activeOpacity={0.7}
    >
      <View className={`flex-row items-center ${currentLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
        <View 
          className={`w-11 h-11 rounded-full items-center justify-center ${currentLanguage === 'ar' ? 'ml-4' : 'mr-4'}`}
          style={{ backgroundColor: bgColor }}
        >
          {iconType === 'Feather' ? (
            <Feather name={icon as any} size={20} color={iconColor} />
          ) : (
            <Ionicons name={icon as any} size={20} color={iconColor} />
          )}
        </View>
        <Text className="text-content-primary text-lg font-bold">{title}</Text>
      </View>
      <View className={`flex-row items-center ${currentLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
        {rightLabel && (
          <Text className={`text-content-tertiary text-sm ${currentLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}>{rightLabel}</Text>
        )}
        <Feather name={currentLanguage === 'ar' ? 'chevron-left' : 'chevron-right'} size={20} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );
};

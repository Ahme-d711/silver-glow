import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

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
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center justify-between py-4"
    activeOpacity={0.7}
  >
    <View className="flex-row items-center">
      <View 
        className="w-11 h-11 rounded-full items-center justify-center mr-4"
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
    <View className="flex-row items-center">
      {rightLabel && (
        <Text className="text-content-tertiary text-sm mr-2">{rightLabel}</Text>
      )}
      <Feather name="chevron-right" size={20} color="#94A3B8" />
    </View>
  </TouchableOpacity>
);

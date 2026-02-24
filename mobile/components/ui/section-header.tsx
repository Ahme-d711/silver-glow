import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  className = ""
}) => {
  return (
    <View className={`flex-row justify-between items-center mb-6 ${className}`}>
      <Text className="text-2xl font-bold text-content-primary">
        {title}
      </Text>
    </View>
  );
};

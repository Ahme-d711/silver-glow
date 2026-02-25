import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  showBackButton = true,
  rightElement
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="bg-primary pb-6 px-6 rounded-b-[40px] shadow-lg"
      style={{ paddingTop: insets.top + 10 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {showBackButton && (
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4 p-2 rounded-xl"
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-3xl font-bold flex-1" numberOfLines={1}>
            {title}
          </Text>
        </View>

        {rightElement && (
          <View className="ml-4">
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
};

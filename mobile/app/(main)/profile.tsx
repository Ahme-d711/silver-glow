import React from 'react';
import { View, Text } from 'react-native';
import { PageHeader } from '@/components/ui/page-header';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background">
      <PageHeader title="Profile" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-medium text-gray-900">Profile Content Coming Soon</Text>
      </View>
    </View>
  );
}

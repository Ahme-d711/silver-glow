import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useCategories } from '../hooks/useCategories';
import { CategoryCard } from './CategoryCard';
import { useRouter } from 'expo-router';

import { SectionHeader } from '@/components/ui/section-header';

export const HomeCategories = () => {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="p-6 items-center">
        <ActivityIndicator size="large" color="#0B1324" />
      </View>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <View className="p-6">
      <SectionHeader 
        title="Our Categories"
      />

      <View className="flex-row flex-wrap justify-between">
        {categories.map((category) => (
          <CategoryCard 
            key={category._id} 
            category={category} 
            onPress={() => router.push({
              pathname: `/category/${category._id}` as any,
              params: { name: category.nameEn }
            })}
          />
        ))}
      </View>
    </View>
  );
};

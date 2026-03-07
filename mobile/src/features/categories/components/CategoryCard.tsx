import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Category } from '../types/category.types';
import { getImageUrl } from '../../../utils/image.utils';
import { useLanguage } from '@/src/hooks/useLanguage';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const { currentLanguage } = useLanguage();
  const name = currentLanguage === 'ar' ? category.nameAr : category.nameEn;
  const imageUrl = getImageUrl(category.image);

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 w-[48%]"
      style={styles.cardContainer}
    >
      <View className="flex-1 rounded-[40px] overflow-hidden bg-divider/10">
        <Image
          source={{ uri: imageUrl ?? '' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
        />
        
        {/* Floating Label - Pill Shape */}
        <View className="absolute bottom-6 left-4 right-4 bg-[#E5E7EB] rounded-full py-4 px-6 shadow-md flex-row items-center justify-between">
          <Text className="text-[#0B1324] font-bold text-base flex-1 mr-2" numberOfLines={1}>
            {name}
          </Text>
          <Feather name={currentLanguage === 'ar' ? "chevron-left" : "chevron-right"} size={20} color="#0B1324" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 4/5,
  }
});

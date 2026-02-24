import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Subcategory } from '../types/subcategory.types';
import { getImageUrl } from '../../../utils/image.utils';

interface SubcategoryCardProps {
  subcategory: Subcategory;
  onPress?: () => void;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = ({ subcategory, onPress }) => {
  const name = subcategory.nameEn;
  const imageUrl = getImageUrl(subcategory.image || '');

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 w-[48%]"
      style={styles.cardContainer}
    >
      <View className="flex-1 rounded-[30px] overflow-hidden bg-divider/10 border border-divider/20">
        <Image
          source={{ uri: imageUrl ?? '' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
        />
        
        {/* Semi-transparent overlay for text readability */}
        <View className="absolute inset-0 bg-black/10" />

        {/* Label Container */}
        <View className="absolute bottom-4 left-3 right-3 bg-white/90 backdrop-blur-md rounded-2xl py-3 px-4 flex-row items-center justify-between border border-white/20">
          <Text className="text-primary font-bold text-sm flex-1 mr-1" numberOfLines={1}>
            {name}
          </Text>
          <Feather name="arrow-right" size={14} color="#192C56" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 1,
  }
});

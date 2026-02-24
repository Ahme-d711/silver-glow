import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useAds } from '../hooks/useAds';
import { getImageUrl } from '../../../utils/image.utils';
import { Ad } from '../types/ad.types';

const { width } = Dimensions.get('window');


export const HomeAds = () => {
  const { data: ads, isLoading } = useAds();
  

  const renderItem = ({ item }: { item: Ad }) => (
    <View className="px-6 py-2">
      <View className="h-48 rounded-[32px] overflow-hidden shadow-sm">
        {/* Background Image */}
        <Image 
          source={{ uri: getImageUrl(item.photo) as string }} 
          className="absolute inset-0 w-full h-full"
          contentFit="cover"
        />
        
        {/* Dark Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(11, 19, 36, 0.7)']}
          className="absolute inset-0"
        />

        {/* Content */}
        <View className="p-6 justify-between flex-1">
          <View>
            <Text className="text-white text-2xl font-bold leading-8">
              {item.nameEn}
            </Text>
            <Text className="text-white/80 text-sm mt-1 leading-5">
              {item.nameAr}
            </Text>
          </View>

          {/* Shop Now Button */}
          <View className="flex-row justify-end">
            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-primary px-8 py-3 rounded-2xl border-white border"
            >
              <Text className="text-white font-bold text-base">Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading || !Array.isArray(ads) || ads.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <Carousel
        loop
        width={width}
        height={210}
        autoPlay={true}
        autoPlayInterval={3000}
        data={ads || []}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  );
};

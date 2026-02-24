import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getImageUrl } from '@/src/utils/image.utils';

const { width } = Dimensions.get('window');

interface ProductImageCarouselProps {
  images: string[];
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View className="relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: getImageUrl(img) ?? '' }}
            style={{ width, height: 400 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Floating Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-6 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg"
        style={{ top: insets.top + 10 }}
      >
        <Feather name="arrow-left" size={24} color="#192C56" />
      </TouchableOpacity>

      {/* Indicators */}
      <View className="absolute bottom-10 w-full flex-row justify-center gap-2">
        {images.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              activeIndex === index ? "w-6 bg-primary" : "w-2 bg-primary/30"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

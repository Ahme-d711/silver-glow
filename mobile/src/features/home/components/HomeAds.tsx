import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Button } from '../../../../components/ui/button';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useAds } from '../hooks/useAds';
import { getImageUrl } from '../../../utils/image.utils';
import { Ad } from '../types/ad.types';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  SharedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width;
const CARD_WIDTH = width - 48;

export const HomeAds = () => {
  const { data: ads, isLoading } = useAds();
  const router = useRouter();
  const progressValue = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAdPress = (item: Ad) => {
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error("Couldn't load page", err));
    } else if (item.productId) {
      const productId = typeof item.productId === 'string' ? item.productId : item.productId._id;
      router.push({
        pathname: '/product/[id]' as any,
        params: { id: productId }
      });
    }
  };

  const renderItem = ({ item, index, animationValue }: { item: Ad; index: number; animationValue: any }) => {
    // Determine which photo to show: mobilePhoto is preferred on mobile app
    const adImage = item.mobilePhoto || item.photo;
    
    return (
      <View style={{ width: PAGE_WIDTH }} className="px-6">
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => handleAdPress(item)}
          className="h-[260px] rounded-[32px] overflow-hidden bg-slate-100 shadow-sm"
          style={{ elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 }}
        >
          <Image 
            source={{ uri: getImageUrl(adImage) ?? '' }} 
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={300}
          />
          
          <LinearGradient
            colors={['transparent', 'rgba(11, 19, 36, 0.85)']}
            className="absolute left-0 right-0 bottom-0 h-full"
          />

          <View className="flex-1 p-8 justify-end">
            <View className="bg-white/20 px-3 py-1.5 rounded-xl self-start mb-3 border border-white/30 backdrop-blur-md">
              <Text className="text-white text-[10px] font-black uppercase tracking-[1.5px]">Exclusive Offer</Text>
            </View>
            
            <Text className="text-white text-3xl font-black mb-1 tracking-tight" numberOfLines={1}>
              {item.nameEn}
            </Text>
            <Text className="text-white/90 text-sm font-semibold leading-5 mb-5" numberOfLines={2}>
              {item.descriptionEn}
            </Text>

            <View className="flex-row items-center">
              <View className="h-12 px-8 rounded-2xl overflow-hidden justify-center items-center relative shadow-lg">
                <Text className="text-white text-sm font-black z-10">Shop Now</Text>
                <LinearGradient
                  colors={['#192C56', '#0B1324']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading || !Array.isArray(ads) || ads.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <Carousel
        loop
        width={PAGE_WIDTH}
        height={280}
        autoPlay={true}
        autoPlayInterval={5000}
        data={ads}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
        }}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />

      <View className="flex-row justify-center items-center mt-4">
        {ads.map((_, index) => {
          return (
            <PaginationItem
              key={index}
              index={index}
              animValue={progressValue}
              length={ads.length}
            />
          );
        })}
      </View>
    </View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: SharedValue<number>;
}> = (props) => {
  const { animValue, index, length } = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [width, width * 3, width];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
    }

    return {
      width: interpolate(
        animValue.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        animValue.value,
        inputRange,
        [0.4, 1, 0.4],
        Extrapolate.CLAMP
      ),
    };
  }, [animValue, index, length]);

  return (
    <Animated.View
      className="h-2 rounded-full mx-1"
      style={[
        {
          backgroundColor: '#192C56',
        },
        animStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({});

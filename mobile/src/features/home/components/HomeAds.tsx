import { View, Text, Dimensions, StyleSheet, Linking } from 'react-native';
import { Button } from '../../../../components/ui/button';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useAds } from '../hooks/useAds';
import { getImageUrl } from '../../../utils/image.utils';
import { Ad } from '../types/ad.types';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');


export const HomeAds = () => {
  const { data: ads, isLoading } = useAds();
  const router = useRouter();

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

  const renderItem = ({ item }: { item: Ad }) => (
    <View className="px-6">
      {/* Container that allows overflow for the button */}
      <View className="h-56 relative shadow-sm">
        {/* Rounded background layer clipping the image and gradient */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: getImageUrl(item.photo) ?? '' }} 
            style={styles.backgroundImage}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* Content Layer */}
        <View className="flex-1 p-8 justify-center">
          <View className="pr-20">
            <Text className="text-white text-2xl font-bold mb-2 leading-7">
              {item.nameEn}
            </Text>
            <Text className="text-white/90 text-sm font-medium leading-5">
              {item.descriptionEn}
            </Text>
          </View>
        </View>

        {/* Shop Now Button - Positioned absolutely relative to the main h-48 container */}
        <Button 
          title="Shop Now"
          className="absolute -bottom-4 right-0 w-[120px] h-12 rounded-full border-[3px] border-white z-10"
          textClassName="text-white text-base font-bold"
          activeOpacity={0.8}
          onPress={() => handleAdPress(item)}
        />
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
        height={230}
        autoPlay={true}
        autoPlayInterval={3000}
        data={ads || []}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9', // Fallback color
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
});

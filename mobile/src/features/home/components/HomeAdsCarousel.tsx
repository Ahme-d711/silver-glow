import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { SharedValue } from 'react-native-reanimated';

import { Ad } from '../types/ad.types';
import {
  HOME_ADS_PAGE_WIDTH,
  HOME_ADS_CAROUSEL_HEIGHT,
} from '../constants/homeAds.constants';
import { AdSlide } from './AdSlide';

type HomeAdsCarouselProps = {
  ads: Ad[];
  isAr: boolean;
  shopLabel: string;
  featuredLabel: string;
  progressValue: SharedValue<number>;
  onSnapToItem: (index: number) => void;
  onAdPress: (item: Ad) => void;
};

export function HomeAdsCarousel({
  ads,
  isAr,
  shopLabel,
  featuredLabel,
  progressValue,
  onSnapToItem,
  onAdPress,
}: HomeAdsCarouselProps) {
  return (
    <Carousel
      loop
      width={HOME_ADS_PAGE_WIDTH}
      height={HOME_ADS_CAROUSEL_HEIGHT}
      autoPlay
      autoPlayInterval={5000}
      data={ads}
      onProgressChange={(_, absoluteProgress) => {
        progressValue.value = absoluteProgress;
      }}
      onSnapToItem={onSnapToItem}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.94,
        parallaxScrollingOffset: 36,
      }}
      scrollAnimationDuration={900}
      renderItem={({ item }) => (
        <AdSlide
          item={item}
          isAr={isAr}
          onPress={() => onAdPress(item)}
          shopLabel={shopLabel}
          featuredLabel={featuredLabel}
        />
      )}
    />
  );
}

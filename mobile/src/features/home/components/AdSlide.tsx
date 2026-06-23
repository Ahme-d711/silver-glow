import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { getImageUrl } from '../../../utils/image.utils';
import { Ad } from '../types/ad.types';
import {
  HOME_ADS_PAGE_WIDTH,
  adSlideStyles,
} from '../constants/homeAds.constants';
import { AdSlideContent } from './AdSlideContent';

type AdSlideProps = {
  item: Ad;
  isAr: boolean;
  onPress: () => void;
  shopLabel: string;
  featuredLabel: string;
};

export function AdSlide({
  item,
  isAr,
  onPress,
  shopLabel,
  featuredLabel,
}: AdSlideProps) {
  const adImage = item.mobilePhoto || item.photo;
  const title = isAr ? item.nameAr : item.nameEn;
  const description = isAr ? item.descriptionAr : item.descriptionEn;

  return (
    <View style={{ width: HOME_ADS_PAGE_WIDTH }} className="px-5">
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        className="rounded-[28px] overflow-hidden bg-slate-100"
        style={adSlideStyles.cardShadow}
      >
        <Image
          source={{ uri: getImageUrl(adImage) ?? '' }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={300}
        />

        <LinearGradient
          colors={['transparent', 'rgba(11, 19, 36, 0.35)', 'rgba(11, 19, 36, 0.92)']}
          locations={[0.35, 0.72, 1]}
          style={adSlideStyles.bottomGradient}
        />

        <View style={adSlideStyles.content}>
          <AdSlideContent
            title={title}
            description={description}
            featuredLabel={featuredLabel}
            shopLabel={shopLabel}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

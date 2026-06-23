import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSharedValue } from 'react-native-reanimated';

import { useAds } from '../hooks/useAds';
import { useAdPress } from '../hooks/useAdPress';
import { HomeAdsCarousel } from './HomeAdsCarousel';
import { AdsPagination } from './AdsPagination';

export const HomeAds = () => {
  const { data: ads, isLoading } = useAds();
  const { handleAdPress } = useAdPress();
  const progressValue = useSharedValue<number>(0);
  const [, setActiveIndex] = useState(0);
  const { i18n, t } = useTranslation();

  const isAr = i18n.language?.startsWith('ar');
  const shopLabel = t('wishlist.shop_now', { defaultValue: 'Shop Now' });
  const featuredLabel = isAr ? 'عرض حصري' : 'Featured';

  if (isLoading || !Array.isArray(ads) || ads.length === 0) {
    return null;
  }

  return (
    <View className="mt-5">
      <HomeAdsCarousel
        ads={ads}
        isAr={isAr}
        shopLabel={shopLabel}
        featuredLabel={featuredLabel}
        progressValue={progressValue}
        onSnapToItem={setActiveIndex}
        onAdPress={handleAdPress}
      />

      <AdsPagination length={ads.length} animValue={progressValue} />
    </View>
  );
};

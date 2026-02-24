import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { HomeAds } from '../components/HomeAds';
import { HomeCategories } from '../../categories/components/HomeCategories';
import { BestSellerSection } from '../../product/components/BestSellerSection';
import { ProductTabsSection } from '../../product/components/ProductTabsSection';

export const HomeTemplate = () => {
  return (
    <SafeAreaView className="flex-1 bg-background pb-8" edges={['top']}>
      <HomeHeader />
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <HomeAds />
        <HomeCategories />
        <BestSellerSection />
        <ProductTabsSection />
        <View className="mb-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { HomeAds } from '../components/HomeAds';
import { HomeCategories } from '../../categories/components/HomeCategories';

export const HomeTemplate = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <HomeHeader />
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <HomeAds />
        <HomeCategories />
        <View className="p-6">
          {/* Future Home Content */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useBestSellers } from '../hooks/useProduct';
import { ProductCard } from './ProductCard';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';

export const BestSellerSection = () => {
  const { data: products, isLoading } = useBestSellers();

  if (isLoading) {
    return (
      <View className="px-6 py-10 items-center">
        <ActivityIndicator size="large" color="#0B1324" />
      </View>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <View className="py-8">
      <View className="px-6">
        <SectionHeader title="Best Seller" />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      >
        {products.map((product) => (
          <View key={product._id} style={{ width: 320 }}>
            <ProductCard product={product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

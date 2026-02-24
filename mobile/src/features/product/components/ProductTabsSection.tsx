import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useHomeProducts, useHomeSections } from '../hooks/useProduct';
import { ProductCard } from './ProductCard';
import { SectionHeader } from '@/components/ui/section-header';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const ProductTabsSection = () => {
  const router = useRouter();
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);

  const { data: sections = [], isLoading: isSectionsLoading } = useHomeSections();
  const { data: products = [], isLoading: isProductsLoading } = useHomeProducts(
    activeSectionId ? { sectionIds: [activeSectionId] } : {}
  );

  // Combine "All" with fetched sections
  const tabs = [
    { _id: undefined, nameAr: 'الكل', nameEn: 'All' },
    ...sections
  ];

  return (
    <View className="px-6 py-10">
      <SectionHeader title="Our Products" />

      {/* Tabs Layout */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-8"
        contentContainerStyle={{ gap: 12 }}
      >
        {tabs.map((tab) => {
          const isActive = activeSectionId === tab._id;
          
          return (
            <TouchableOpacity
              key={tab._id || "all"}
              onPress={() => setActiveSectionId(tab._id)}
              className={`px-8 py-3 rounded-2xl border-2 transition-all ${
                isActive
                  ? "bg-primary border-primary"
                  : "bg-divider/5 border-divider/20"
              }`}
            >
              <Text className={`font-bold uppercase tracking-wider ${
                isActive ? "text-white" : "text-content-tertiary"
              }`}>
                {tab.nameEn}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Products Grid */}
      <View className="flex-row flex-wrap justify-between min-h-[400px]">
        {isProductsLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#0B1324" />
          </View>
        ) : products.length > 0 ? (
          products.slice(0, 8).map((product) => (
            <View key={product._id} className="w-[48%]">
              <ProductCard product={product} />
            </View>
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-content-tertiary text-lg">No products found</Text>
          </View>
        )}
      </View>

      {/* View All Button */}
      <View className="mt-8">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/shop')}
          className="flex-row items-center justify-center bg-primary/5 border border-primary/10 py-5 rounded-[24px]"
        >
          <Text className="text-primary font-bold text-lg mr-3">
            More Products
          </Text>
          <View className="bg-primary/10 p-2 rounded-full">
            <Feather name="arrow-right" size={18} color="#192C56" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

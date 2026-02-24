import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductCard } from '../../product/components/ProductCard';
import { Pagination } from '@/components/ui/pagination';
import { Product } from '../../product/types/product.types';

interface ShopProductGridProps {
  products: Product[];
  isLoading: boolean;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export const ShopProductGrid: React.FC<ShopProductGridProps> = ({
  products,
  isLoading,
  pagination,
  currentPage,
  onPageChange,
  onRefresh,
}) => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#192C56" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => (
        <View style={{ width: '48%', marginBottom: 16 }}>
          <ProductCard product={item} />
        </View>
      )}
      ListFooterComponent={
        pagination ? (
          <Pagination 
            currentPage={currentPage}
            totalPages={pagination.pages}
            onPageChange={onPageChange}
          />
        ) : null
      }
      ListEmptyComponent={
        <View className="py-20 items-center">
          <Feather name="shopping-bag" size={64} color="#CBD5E1" />
          <Text className="text-xl text-content-tertiary font-medium mt-4">No products found</Text>
        </View>
      }
      onRefresh={onRefresh}
      refreshing={false}
    />
  );
};

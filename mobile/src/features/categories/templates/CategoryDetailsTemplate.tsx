import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PageHeader } from '../../../../components/ui/page-header';
import { LoadingState } from '../../../../components/ui/LoadingState';
import { ErrorState } from '../../../../components/ui/ErrorState';
import { useSubcategories } from '../hooks/useCategories';
import { SubcategoryCard } from '../components/SubcategoryCard';
import { Feather } from '@expo/vector-icons';

export const CategoryDetailsTemplate = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const router = useRouter();
  const { data: subcategories, isLoading, refetch, isRefetching, error } = useSubcategories(id);

  if (isLoading && !isRefetching) {
    return <LoadingState title={name || 'Category Details'} />;
  }

  if (error) {
    return <ErrorState title={name || 'Category Details'} onRetry={refetch} />;
  }

  return (
    <View className="flex-1 bg-white">
      <PageHeader title={name || 'Category Details'} />

      <ScrollView 
        className="flex-1 px-6 pt-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#192C56" />
        }
      >
        {!subcategories || subcategories.length === 0 ? (
          <View className="py-20 items-center justify-center">
            <View className="bg-primary/5 p-8 rounded-full mb-4">
              <Feather name="layers" size={48} color="#192C56" />
            </View>
            <Text className="text-primary text-xl font-bold">No Subcategories</Text>
            <Text className="text-content-tertiary mt-2 text-center px-10">
              There are no subcategories available for this category yet.
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {subcategories.map((subcategory) => (
              <SubcategoryCard 
                key={subcategory._id} 
                subcategory={subcategory}
                onPress={() => {
                  router.push({
                    pathname: '/shop',
                    params: { 
                      categoryId: id,
                      subCategoryId: subcategory._id 
                    }
                  });
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

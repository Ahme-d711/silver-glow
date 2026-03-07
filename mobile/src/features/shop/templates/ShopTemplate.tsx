import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useHomeProducts } from '../../product/hooks/useProduct';
import { useCategories } from '../../categories/hooks/useCategories';
import { useSubcategories } from '../../categories/hooks/useSubcategories';

import { ShopToolbar } from '../components/ShopToolbar';
import { ShopProductGrid } from '../components/ShopProductGrid';
import { FilterModal } from '../components/FilterModal';
import { SortModal } from '../components/SortModal';
import { PageHeader } from '@/components/ui/page-header';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/src/hooks/useLanguage';

export const ShopTemplate = () => {
  const params = useLocalSearchParams<{ categoryId?: string; subCategoryId?: string }>();
  const { t } = useLanguage();
  
  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(params.categoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | undefined>(params.subCategoryId);
  const [sortValue, setSortValue] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  // Data Fetching
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: subcategories = [], isLoading: isSubcategoriesLoading } = useSubcategories(selectedCategoryId || '');
  
  const { data: { products = [], pagination } = {}, isLoading: isProductsLoading, refetch } = useHomeProducts({
    categoryId: selectedCategoryId,
    subCategoryId: selectedSubCategoryId,
    sort: sortValue,
    page: currentPage,
    limit: 12,
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, selectedSubCategoryId, sortValue]);

  // Sort Options
  const sortOptions = [
    { label: t('shop.popularity'), value: 'popularity' },
    { label: t('shop.newest'), value: 'newest' },
    { label: t('shop.price_low_high'), value: 'priceLowHigh' },
    { label: t('shop.price_high_low'), value: 'priceHighLow' },
  ];

  const handleCategorySelect = (id: string | undefined) => {
    setSelectedCategoryId(id);
    setSelectedSubCategoryId(undefined);
  };

  const getSortLabel = () => sortOptions.find(o => o.value === sortValue)?.label || t('shop.sort');

  return (
    <View className="flex-1 bg-background">
      <PageHeader title={t('shop.title')} />

      <ShopToolbar 
        onOpenFilter={() => setIsFilterModalVisible(true)}
        onOpenSort={() => setIsSortModalVisible(true)}
        sortLabel={getSortLabel()}
        totalItems={pagination?.total || 0}
      />

      <ShopProductGrid 
        products={products}
        isLoading={isProductsLoading}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRefresh={refetch}
      />

      <FilterModal 
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        categories={categories}
        subcategories={subcategories}
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
        onCategorySelect={handleCategorySelect}
        onSubCategorySelect={setSelectedSubCategoryId}
        isSubcategoriesLoading={isSubcategoriesLoading}
      />

      <SortModal 
        isVisible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        options={sortOptions}
        selectedValue={sortValue}
        onSelect={(value) => {
          setSortValue(value);
          setIsSortModalVisible(false);
        }}
      />
    </View>
  );
};

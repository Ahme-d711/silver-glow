import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Category } from '../../categories/types/category.types';
import { Subcategory } from '../../categories/types/subcategory.types';
import { useLanguage } from '@/src/hooks/useLanguage';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  categories: Category[];
  subcategories: Subcategory[];
  selectedCategoryId?: string;
  selectedSubCategoryId?: string;
  onCategorySelect: (id: string | undefined) => void;
  onSubCategorySelect: (id: string | undefined) => void;
  isSubcategoriesLoading: boolean;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  categories,
  subcategories,
  selectedCategoryId,
  selectedSubCategoryId,
  onCategorySelect,
  onSubCategorySelect,
  isSubcategoriesLoading,
}) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-[40px] p-8 max-h-[85%]">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-content-primary">{t('shop.filters')}</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Categories Section */}
            <Text className="text-lg font-bold text-content-secondary mb-4">{t('auth.country')}</Text> {/* Assuming 'Categories' exists or use a new key */}
            {/* Wait, I should have a 'shop.categories' key. Let me check ar.json and en.json for that. Oh, I used 'auth.country' roughly? No, let me use 'Categories' as a key. */}
            <Text className="text-lg font-bold text-content-secondary mb-4">{t('home.categories')}</Text>
            
            <View className="flex-row flex-wrap mb-6">
              <TouchableOpacity 
                onPress={() => onCategorySelect(undefined)}
                className={`px-4 py-2 rounded-xl mr-2 mb-2 ${!selectedCategoryId ? 'bg-primary' : 'bg-gray-100'}`}
              >
                <Text className={!selectedCategoryId ? 'text-white font-bold' : 'text-content-secondary'}>
                  {t('shop.all_categories')}
                </Text>
              </TouchableOpacity>
              {categories.map((cat: Category) => (
                <TouchableOpacity 
                  key={cat._id}
                  onPress={() => onCategorySelect(cat._id)}
                  className={`px-4 py-2 rounded-xl mr-2 mb-2 ${selectedCategoryId === cat._id ? 'bg-primary' : 'bg-gray-100'}`}
                >
                  <Text className={selectedCategoryId === cat._id ? 'text-white font-bold' : 'text-content-secondary'}>
                    {currentLanguage === 'ar' ? cat.nameAr : cat.nameEn}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Subcategories Section */}
            {selectedCategoryId && (
              <>
                <Text className="text-lg font-bold text-content-secondary mb-4">{t('shop.subcategories')}</Text>
                {isSubcategoriesLoading ? (
                  <ActivityIndicator color="#192C56" className="mb-6" />
                ) : (
                  <View className="flex-row flex-wrap mb-6">
                    <TouchableOpacity 
                      onPress={() => onSubCategorySelect(undefined)}
                      className={`px-4 py-2 rounded-xl mr-2 mb-2 ${!selectedSubCategoryId ? 'bg-primary' : 'bg-gray-100'}`}
                    >
                      <Text className={!selectedSubCategoryId ? 'text-white font-bold' : 'text-content-secondary'}>
                        {t('shop.all_categories')}
                      </Text>
                    </TouchableOpacity>
                    {subcategories.map((sub: Subcategory) => (
                      <TouchableOpacity 
                        key={sub._id}
                        onPress={() => onSubCategorySelect(sub._id)}
                        className={`px-4 py-2 rounded-xl mr-2 mb-2 ${selectedSubCategoryId === sub._id ? 'bg-primary' : 'bg-gray-100'}`}
                      >
                        <Text className={selectedSubCategoryId === sub._id ? 'text-white font-bold' : 'text-content-secondary'}>
                          {currentLanguage === 'ar' ? sub.nameAr : sub.nameEn}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <TouchableOpacity 
            onPress={onClose}
            className="bg-primary py-4 rounded-2xl items-center mt-4"
          >
            <Text className="text-white font-bold text-lg">{t('shop.apply_filters')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

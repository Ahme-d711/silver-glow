import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string;
  onSelect: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
}) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-content-primary">Size</Text>
        <TouchableOpacity>
          <Text className="text-content-tertiary font-medium underline">Guide</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <TouchableOpacity
              key={size}
              onPress={() => onSelect(size)}
              className={`min-w-[50px] h-[40px] items-center justify-center rounded-lg border-2 ${
                isSelected 
                  ? "bg-primary border-primary" 
                  : "bg-white border-divider"
              }`}
            >
              <Text className={`font-bold ${isSelected ? "text-white" : "text-content-secondary"}`}>
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type AdSlideContentProps = {
  title: string;
  description?: string;
  featuredLabel: string;
  shopLabel: string;
};

export function AdSlideContent({
  title,
  description,
  featuredLabel,
  shopLabel,
}: AdSlideContentProps) {
  return (
    <>
      <View className="bg-white/15 px-2.5 py-1 rounded-full self-start mb-2.5 border border-white/20">
        <Text className="text-white text-[9px] font-bold uppercase tracking-[1.2px]">
          {featuredLabel}
        </Text>
      </View>

      <Text
        className="text-white text-[17px] font-bold leading-[22px] tracking-tight"
        numberOfLines={2}
      >
        {title}
      </Text>

      {!!description && (
        <Text
          className="text-white/75 text-[12px] leading-[17px] mt-1.5"
          numberOfLines={2}
        >
          {description}
        </Text>
      )}

      <View className="flex-row items-center mt-3.5">
        <View className="h-9 px-4 rounded-full bg-white flex-row items-center gap-1.5">
          <Text className="text-primary text-[12px] font-bold">{shopLabel}</Text>
          <Feather name="arrow-right" size={14} color="#192C56" />
        </View>
      </View>
    </>
  );
}

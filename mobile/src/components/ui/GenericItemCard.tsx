import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';

export interface GenericItemCardProps {
  image?: string;
  title: string;
  description?: string;
  price?: string | number;
  size?: string;
  quantity?: number;
  imageSize?: 'sm' | 'md' | 'lg';
  topRightAction?: React.ReactNode;
  bottomRightAction?: React.ReactNode;
  statusBadge?: React.ReactNode;
  footerContent?: React.ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  isCompact?: boolean;
}

export const GenericItemCard: React.FC<GenericItemCardProps> = ({
  image,
  title,
  description,
  price,
  size,
  quantity,
  imageSize = 'lg',
  topRightAction,
  bottomRightAction,
  statusBadge,
  footerContent,
  onPress,
  containerStyle,
  isCompact = false,
}) => {
  const getImageStyle = () => {
    switch (imageSize) {
      case 'sm':
        return styles.imageSmall;
      case 'md':
        return styles.imageMedium;
      case 'lg':
      default:
        return styles.imageLarge;
    }
  };

  const getContentHeight = () => {
    switch (imageSize) {
      case 'sm':
        return 'h-18';
      case 'md':
        return 'h-24';
      case 'lg':
      default:
        return 'h-32'; // Increased to match larger image height
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className={`bg-white rounded-[20px] p-3 mb-4 flex-row items-center border border-divider shadow-sm relative ${isCompact ? 'opacity-90' : ''}`}
      style={containerStyle}
    >
      {/* Status Badge - Floating */}
      {statusBadge && (
        <View className="absolute top-3 right-3 z-10">
          {statusBadge}
        </View>
      )}

      {/* Product Image */}
      <View style={[getImageStyle(), styles.imageContainer]}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.fullImage} 
            contentFit="cover" 
            transition={300} 
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Feather name="image" size={imageSize === 'sm' ? 20 : 24} color="#CBD5E1" />
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className={`flex-1 ml-4 justify-between ${getContentHeight()} py-1`}>
        <View>
          <View className="flex-row justify-between items-start">
            <Text 
              className={`${imageSize === 'sm' ? 'text-base' : 'text-lg'} font-bold text-primary flex-1 mr-2 capitalize`} 
              numberOfLines={1}
            >
              {title}
            </Text>
            {topRightAction && !statusBadge && (
              <View>{topRightAction}</View>
            )}
          </View>
          
          {description && (
            <Text className="text-content-tertiary text-sm" numberOfLines={1}>
              {description}
            </Text>
          )}
          <View>
            {footerContent}
            {price !== undefined && (
              <View className="flex-row items-center mt-2">
                <Feather name="briefcase" size={imageSize === 'sm' ? 12 : 14} color="#64748B" />
                <Text className={`ml-1.5 ${imageSize === 'sm' ? 'text-base' : 'text-lg'} font-bold text-primary`}>
                  {price} $
                </Text>
              </View>
            )}
          </View>

        </View>

        <View className="flex-row justify-between items-center">

          <View className="flex-row items-center">
            {size && (
              <View className={`${imageSize === 'sm' ? 'bg-gray-100 px-2 py-0.5 rounded-md' : ''} mr-2`}>
                <Text className={`${imageSize === 'sm' ? 'text-content-secondary text-[10px] font-bold' : 'text-content-secondary text-sm'}`}>
                  {imageSize === 'sm' ? `Size: ${size}` : `Size : ${size}`}
                </Text>
              </View>
            )}
            {quantity !== undefined && imageSize === 'sm' && (
              <View className="bg-primary/5 px-2 py-0.5 rounded-md">
                <Text className="text-primary text-[10px] font-bold">
                  Qty: {quantity}
                </Text>
              </View>
            )}
          </View>
          {bottomRightAction && (
             <View>{bottomRightAction}</View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    backgroundColor: '#F3F4F6', // gray-100
  },
  imageSmall: {
    height: 80, // h-24
    width: 80,  // w-24
    borderRadius: 12,
  },
  imageMedium: {
    height: 96, // h-28
    width: 96,  // w-28
    borderRadius: 15,
  },
  imageLarge: {
    height: 144, // h-40
    width: 128, // w-36
    borderRadius: 15,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

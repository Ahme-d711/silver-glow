import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

export const AuthHero = () => {
  return (
    <View className="h-[450px] w-full relative">
      <Image 
        source={require('../../../../assets/images/login-image.svg')} 
        className="w-full h-full"
        contentFit="cover"
      />
      {/* Logo */}
      <View className="absolute top-16 left-8">
        <Image 
          source={require('../../../../assets/images/logo.svg')} 
          className="w-24 h-12"
          contentFit="contain"
        />
      </View>
    </View>
  );
};

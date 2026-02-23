import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

export const AuthHero = () => {
  return (
    <View style={{ height: 480, width: '100%', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <Image 
        source={require('../../../../assets/images/login-image.jpg')} 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
        transition={200}
      />
      {/* Logo Container */}
      <View style={{ position: 'absolute', top: 64, left: 20, zIndex: 10 }}>
        <Image 
          source={require('@/assets/images/logo.png')} 
          style={{ width: 50, height: 50 }}
          contentFit="contain"
          transition={200}
        />
      </View>
    </View>
  );
};

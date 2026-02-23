import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const LOGO_SIZE = width * 0.4;

export const SplashScreen = () => {
  const shimmerX = useSharedValue(-LOGO_SIZE);

  useEffect(() => {
    // Run exactly 2 times then stop (as requested for professional feel)
    shimmerX.value = withRepeat(
      withTiming(LOGO_SIZE * 1.5, {
        duration: 1500,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
      2,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }, { rotate: '25deg' }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Shimmer Light Sweep Overlay */}
          <Animated.View style={[styles.shimmerContainer, shimmerStyle]}>
            <LinearGradient
              colors={[
                'transparent',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.4)', // The "Silver Glow" peak
                'rgba(255, 255, 255, 0.05)',
                'transparent'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>
        </View>
        <Text style={styles.title}>Silver Glow</Text>
        <Text style={styles.subtitle}>Since 2007</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1324',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Mask the shimmer to the logo area
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: '#FFFFFF',
  },
  shimmerContainer: {
    position: 'absolute',
    top: -LOGO_SIZE,
    bottom: -LOGO_SIZE,
    width: LOGO_SIZE * 0.6,
  },
  shimmerGradient: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    letterSpacing: 1,
  },
});

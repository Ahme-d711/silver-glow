import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { useModalStore } from '../../store/modalStore';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export const AuthModal: React.FC = () => {
  const { isAuthModalVisible, closeAuthModal } = useModalStore();
  const router = useRouter();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    if (isAuthModalVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      scale.value = withTiming(0.85, { duration: 250 });
    }
  }, [isAuthModalVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleLogin = () => {
    closeAuthModal();
    // Use setTimeout to ensure modal is closed before navigation
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  if (!isAuthModalVisible) return null;

  return (
    <Modal
      transparent
      visible={isAuthModalVisible}
      animationType="none"
      onRequestClose={closeAuthModal}
    >
      <View className="flex-1 items-center justify-center p-6">
        {/* Animated Background Overlay */}
        <Animated.View 
          style={[StyleSheet.absoluteFill, backdropStyle]}
          className="bg-black/60"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeAuthModal} />
        </Animated.View>

        {/* Modal Content */}
        <Animated.View 
          style={[styles.modalContent, animatedStyle]}
          className="bg-white rounded-[40px] overflow-hidden shadow-2xl w-full max-w-[340px]"
        >
          <LinearGradient
            colors={['#192C56', '#0B1324']}
            className="pt-10 pb-8 items-center px-6"
          >
            <View className="bg-white/10 p-5 rounded-full mb-5">
              <View className="bg-white p-4 rounded-full">
                <Feather name="lock" size={32} color="#192C56" />
              </View>
            </View>
            
            <Text className="text-white text-2xl font-bold text-center">
              Login Required
            </Text>
            <Text className="text-white/70 text-center mt-2 leading-5 font-medium">
              Join our community to save your favorites and share your experience.
            </Text>
          </LinearGradient>

          <View className="p-8">
            <TouchableOpacity 
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#192C56', '#2A457D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-[60px] rounded-2xl overflow-hidden items-center justify-center flex-row shadow-lg shadow-primary/30"
              >
                <Text className="text-white font-bold text-lg mr-2">Login Now</Text>
                <Feather name="arrow-right" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={closeAuthModal}
              className="mt-4 pt-2 items-center"
              activeOpacity={0.6}
            >
              <Text className="text-content-tertiary font-bold text-base">
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    elevation: 24,
  },
});

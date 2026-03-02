import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useModalStore } from '../../store/modalStore';

export const AppModal: React.FC = () => {
  const { isVisible, config, closeModal } = useModalStore();
  const router = useRouter();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      scale.value = withTiming(0.85, { duration: 250 });
    }
  }, [isVisible]);

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

  const handleConfirm = () => {
    if (config.type === 'auth') {
      closeModal();
      setTimeout(() => {
        router.push('/login');
      }, 300);
    } else {
      config.onConfirm?.();
      closeModal();
    }
  };

  if (!isVisible) return null;

  const isDanger = config.type === 'danger' || config.type === 'error';
  const confirmLabel = config.confirmLabel || (config.type === 'auth' ? 'Login Now' : 'Dismiss');
  const showCancel = config.type === 'auth' || config.type === 'danger' || config.type === 'warning';

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={closeModal}
    >
      <View className="flex-1 items-center justify-center p-6">
        <Animated.View 
          style={[StyleSheet.absoluteFill, backdropStyle]}
          className="bg-black/60"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
        </Animated.View>

        <Animated.View 
          style={[styles.modalContent, animatedStyle]}
          className="bg-primary rounded-[28px] overflow-hidden shadow-2xl w-full max-w-[340px] p-8"
        >
          <Text className="text-white text-xl font-bold leading-tight mb-2">
            {config.title}
          </Text>
          
          <Text className="text-white/70 text-base leading-6 mb-10">
            {config.message}
          </Text>

          <View className="flex-row items-center justify-end space-x-6">
            {showCancel && (
              <TouchableOpacity 
                onPress={closeModal}
                activeOpacity={0.6}
                className="px-4 h-12 items-center justify-center"
              >
                <Text className="text-white/50 font-bold text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              onPress={handleConfirm}
              activeOpacity={0.8}
              style={{ backgroundColor: isDanger ? '#FF4B55' : (config.type === 'auth' ? '#2A457D' : '#4CAF50') }}
              className="px-8 h-12 rounded-full items-center justify-center"
            >
              <Text className="text-white font-bold text-base">
                {confirmLabel}
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

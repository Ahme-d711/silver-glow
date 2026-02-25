import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
} from 'react-native-reanimated';
import { useModalStore } from '../../store/modalStore';

export const ConfirmModal: React.FC = () => {
  const { 
    isConfirmModalVisible, 
    confirmTitle, 
    confirmMessage, 
    confirmType,
    confirmLabel,
    onConfirm,
    closeConfirmModal 
  } = useModalStore();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    if (isConfirmModalVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      scale.value = withTiming(0.85, { duration: 250 });
    }
  }, [isConfirmModalVisible]);

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
    onConfirm();
    closeConfirmModal();
  };

  if (!isConfirmModalVisible) return null;

  const isDanger = confirmType === 'danger';
  const primaryColor = isDanger ? '#EF4444' : '#F59E0B'; // Red for danger, Amber for warning
  const secondaryColor = isDanger ? '#DC2626' : '#D97706';
  const iconName = isDanger ? 'trash-2' : 'alert-triangle';

  return (
    <Modal
      transparent
      visible={isConfirmModalVisible}
      animationType="none"
      onRequestClose={closeConfirmModal}
    >
      <View className="flex-1 items-center justify-center p-6">
        {/* Animated Background Overlay */}
        <Animated.View 
          style={[StyleSheet.absoluteFill, backdropStyle]}
          className="bg-black/60"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeConfirmModal} />
        </Animated.View>

        {/* Modal Content */}
        <Animated.View 
          style={[styles.modalContent, animatedStyle]}
          className="bg-white rounded-[40px] overflow-hidden shadow-2xl w-full max-w-[340px]"
        >
          <LinearGradient
            colors={[primaryColor, secondaryColor]}
            className="pt-10 pb-8 items-center px-6"
          >
            <View className="bg-white/10 p-5 rounded-full mb-5">
              <View className="bg-white p-4 rounded-full">
                <Feather name={iconName} size={40} color={primaryColor} />
              </View>
            </View>
            
            <Text className="text-white text-2xl font-bold text-center">
              {confirmTitle}
            </Text>
            <Text className="text-white/80 text-center mt-2 leading-5 font-medium">
              {confirmMessage}
            </Text>
          </LinearGradient>

          <View className="p-8">
            <TouchableOpacity 
              onPress={handleConfirm}
              activeOpacity={0.8}
              className="mb-4"
            >
              <LinearGradient
                colors={[primaryColor, secondaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-[60px] rounded-2xl overflow-hidden items-center justify-center shadow-lg shadow-error/30"
              >
                <Text className="text-white font-bold text-lg">{confirmLabel}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={closeConfirmModal}
              activeOpacity={0.6}
              className="items-center"
            >
              <Text className="text-content-tertiary font-bold text-base">
                Cancel
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

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
          className="bg-primary rounded-[28px] overflow-hidden shadow-2xl w-full max-w-[340px] p-8"
        >
          <Text className="text-white text-xl font-bold leading-tight mb-2">
            {confirmTitle}
          </Text>
          
          <Text className="text-white/70 text-base leading-6 mb-10">
            {confirmMessage}
          </Text>

          <View className="flex-row items-center justify-end space-x-6">

            <TouchableOpacity 
              onPress={closeConfirmModal}
              activeOpacity={0.6}
              className="px-4 h-12 items-center justify-center"
            >
              <Text className="text-white/50 font-bold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleConfirm}
              activeOpacity={0.8}
              style={{ backgroundColor: isDanger ? '#FF4B55' : '#4CAF50' }}
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


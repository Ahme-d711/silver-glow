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

const { width } = Dimensions.get('window');

export const StatusModal: React.FC = () => {
  const { 
    isStatusModalVisible, 
    statusType, 
    statusTitle, 
    statusMessage, 
    closeStatusModal 
  } = useModalStore();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    if (isStatusModalVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      scale.value = withTiming(0.85, { duration: 250 });
    }
  }, [isStatusModalVisible]);

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

  if (!isStatusModalVisible) return null;

  const isSuccess = statusType === 'success';
  const primaryColor = isSuccess ? '#10B981' : '#EF4444'; // Success (Emerald) vs Error (Red)
  const secondaryColor = isSuccess ? '#059669' : '#DC2626';
  const iconName = isSuccess ? 'check-circle' : 'alert-circle';

  return (
    <Modal
      transparent
      visible={isStatusModalVisible}
      animationType="none"
      onRequestClose={closeStatusModal}
    >
      <View className="flex-1 items-center justify-center p-6">
        {/* Animated Background Overlay */}
        <Animated.View 
          style={[StyleSheet.absoluteFill, backdropStyle]}
          className="bg-black/60"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeStatusModal} />
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
              {statusTitle}
            </Text>
            <Text className="text-white/80 text-center mt-2 leading-5 font-medium">
              {statusMessage}
            </Text>
          </LinearGradient>

          <View className="p-8">
            <TouchableOpacity 
              onPress={closeStatusModal}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[primaryColor, secondaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-[60px] rounded-2xl overflow-hidden items-center justify-center border-b-4 border-black/10"
              >
                <Text className="text-white font-bold text-lg">Dismiss</Text>
              </LinearGradient>
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

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLanguage } from '@/src/hooks/useLanguage';

interface EditProfileImagePickerProps {
  imageUri: string | null;
  onPickImage: () => Promise<void>;
}

export const EditProfileImagePicker: React.FC<EditProfileImagePickerProps> = ({ imageUri, onPickImage }) => {
  const { t } = useLanguage();

  return (
    <View className="items-center py-10">
      <TouchableOpacity 
        onPress={onPickImage}
        activeOpacity={0.8}
        className="relative"
      >
        <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm bg-slate-100 items-center justify-center">
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          ) : (
            <Ionicons name="person" size={56} color="#94A3B8" />
          )}
        </View>
        <View className="absolute bottom-1 right-1 bg-primary w-10 h-10 rounded-full items-center justify-center border-4 border-white shadow-md">
          <Feather name="camera" size={16} color="white" />
        </View>
      </TouchableOpacity>
      <Text className="text-slate-400 text-xs mt-4 font-bold uppercase tracking-widest">
        {t('profile.tap_to_change')}
      </Text>
    </View>
  );
};

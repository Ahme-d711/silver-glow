import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../auth/store/authStore';
import { getImageUrl } from '../../../utils/image.utils';
import { useLanguage } from '@/src/hooks/useLanguage';

export const HomeHeader = () => {
  const user = useAuthStore((state) => state.user);
  const { t } = useLanguage();

  return (
    <View className="bg-primary pt-14 pb-6 px-6 rounded-b-[40px]">
      {/* Top Section: User Info & Notification */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center">
          {/* Avatar */}
          <View className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden mr-3">
             {user?.picture ? (
               <Image 
                 source={{ uri: getImageUrl(user.picture) as string }} 
                 className="w-full h-full"
                 resizeMode="cover"
               />
             ) : (
               <View className="w-full h-full bg-secondary items-center justify-center">
                 <Ionicons name="person" size={24} color="#192C56" />
               </View>
             )}
          </View>
          
          {/* Text Info */}
          <View>
            <Text className="text-white text-xl font-bold">{user?.name || t('auth.user_fallback')}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="wallet-outline" size={16} color="white" />
              <Text className="text-white/80 text-base ml-1">{t('home.balance')}: ${user?.totalBalance || 0}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-white/10 h-14 rounded-2xl px-4">
        <Ionicons name="search-outline" size={24} color="white" className="opacity-60" />
        <TextInput 
          placeholder={t('common.search')}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          className="flex-1 ml-3 text-white text-lg"
        />
      </View>
    </View>
  );
};

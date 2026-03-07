import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImageUrl } from '../../../utils/image.utils';
import { useLanguage } from '@/src/hooks/useLanguage';

interface ProfileInfoCardProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
  } | null;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ user }) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <View className={`bg-white rounded-[32px] p-6 flex-row items-center shadow-xl shadow-black/5 border border-slate-50 mb-8 ${currentLanguage === 'ar' ? 'flex-row-reverse' : ''}`}>
      <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100">
        {user?.picture ? (
          <Image 
            source={{ uri: getImageUrl(user.picture) as string }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-slate-100 items-center justify-center">
            <Ionicons name="person" size={32} color="#94A3B8" />
          </View>
        )}
      </View>
      <View className={`${currentLanguage === 'ar' ? 'mr-5' : 'ml-5'} flex-1`}>
        <Text className={`text-content-primary text-xl font-bold ${currentLanguage === 'ar' ? 'text-right' : ''}`}>
          {user?.name || t('auth.user_fallback')}
        </Text>
        <Text className={`text-content-tertiary text-sm mt-1 ${currentLanguage === 'ar' ? 'text-right' : ''}`}>
          {user?.email || t('auth.email_placeholder')}
        </Text>
      </View>
    </View>
  );
};

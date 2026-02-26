import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImageUrl } from '../../../utils/image.utils';

interface ProfileInfoCardProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
  } | null;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ user }) => {
  return (
    <View className="bg-white rounded-[32px] p-6 flex-row items-center shadow-xl shadow-black/5 border border-slate-50 mb-8">
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
      <View className="ml-5">
        <Text className="text-content-primary text-xl font-bold">{user?.name || 'Guest User'}</Text>
        <Text className="text-content-tertiary text-sm mt-1">{user?.email || 'Login to see your email'}</Text>
      </View>
    </View>
  );
};

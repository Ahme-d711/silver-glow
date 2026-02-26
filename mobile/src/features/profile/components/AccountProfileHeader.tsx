import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { User } from '../../auth/types/auth.types';
import { getImageUrl } from '../../../utils/image.utils';

interface AccountProfileHeaderProps {
  user: User | null;
}

export const AccountProfileHeader: React.FC<AccountProfileHeaderProps> = ({ user }) => (
  <View className="items-center py-10">
    <View className="relative">
      <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm bg-slate-100 items-center justify-center">
        {user?.picture ? (
          <Image 
            source={{ uri: getImageUrl(user.picture) as string }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person" size={56} color="#94A3B8" />
        )}
      </View>
      <View className="absolute bottom-1 right-1 bg-primary w-10 h-10 rounded-full items-center justify-center border-4 border-white">
        <Feather name="camera" size={16} color="white" />
      </View>
    </View>
    
    <Text className="text-slate-800 text-2xl font-bold mt-5">{user?.name || 'Guest'}</Text>
    <View className="bg-emerald-50 px-4 py-1 rounded-full mt-2 flex-row items-center">
      <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
      <Text className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
        {user?.role || 'User'}
      </Text>
    </View>
  </View>
);

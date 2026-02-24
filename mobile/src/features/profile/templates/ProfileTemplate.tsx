import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { getImageUrl } from '../../../utils/image.utils';
import { LinearGradient } from 'expo-linear-gradient';
import { PageHeader } from '@/components/ui/page-header';

const { width } = Dimensions.get('window');

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap;
  iconType?: 'Feather' | 'Ionicons';
  iconColor: string;
  bgColor: string;
  title: string;
  rightLabel?: string;
  onPress: () => void;
  isLower?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  iconType = 'Feather', 
  iconColor, 
  bgColor, 
  title, 
  rightLabel, 
  onPress,
  isLower = false
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center justify-between py-4"
    activeOpacity={0.7}
  >
    <View className="flex-row items-center">
      <View 
        className="w-11 h-11 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: bgColor }}
      >
        {iconType === 'Feather' ? (
          <Feather name={icon as any} size={20} color={iconColor} />
        ) : (
          <Ionicons name={icon as any} size={20} color={iconColor} />
        )}
      </View>
      <Text className="text-content-primary text-lg font-bold">{title}</Text>
    </View>
    <View className="flex-row items-center">
      {rightLabel && (
        <Text className="text-content-tertiary text-sm mr-2">{rightLabel}</Text>
      )}
      <Feather name="chevron-right" size={20} color="#94A3B8" />
    </View>
  </TouchableOpacity>
);

export const ProfileTemplate = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <PageHeader title="Profile" />

      <ScrollView 
        className="flex-1 -mt-8"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-10">
          {/* User Info Card */}
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

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity 
              onPress={() => router.push('/(main)/orders')}
              className="bg-white flex-1 mr-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
            >
              <Feather name="package" size={20} color="#192C56" />
              <Text className="ml-2 font-bold text-slate-700">My Orders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => router.push('/(main)/wishlist')}
              className="bg-white flex-1 ml-3 flex-row items-center justify-center py-4 rounded-[20px] border border-slate-100 shadow-sm"
            >
              <Feather name="heart" size={20} color="#192C56" />
              <Text className="ml-2 font-bold text-slate-700">My Wishlist</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View>
            <MenuItem 
              title="Account informations" 
              icon="user" 
              iconColor="#192C56" 
              bgColor="#F1F5F9"
              onPress={() => {}} 
            />
            <MenuItem 
              title="Change password" 
              icon="lock" 
              iconColor="#10B981" 
              bgColor="#ECFDF5"
              onPress={() => {}} 
            />
            <MenuItem 
              title="App Theme" 
              icon="sun" 
              iconColor="#F59E0B" 
              bgColor="#FFFBEB"
              rightLabel="Light"
              onPress={() => {}} 
            />
            <MenuItem 
              title="App Language" 
              icon="language" 
              iconType="Ionicons"
              iconColor="#3B82F6" 
              bgColor="#EFF6FF"
              rightLabel="English"
              onPress={() => {}} 
            />
            <MenuItem 
              title="Need help?" 
              icon="headphones" 
              iconColor="#F97316" 
              bgColor="#FFF7ED"
              rightLabel="contact with us"
              onPress={() => {}} 
            />
            <MenuItem 
              title="Logout" 
              icon="log-out" 
              iconColor="#EF4444" 
              bgColor="#FEF2F2"
              onPress={handleLogout} 
            />
          </View>

          {/* Version */}
          <View className="items-center mt-10">
            <Text className="text-slate-400 text-sm">Version 1.0.1</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

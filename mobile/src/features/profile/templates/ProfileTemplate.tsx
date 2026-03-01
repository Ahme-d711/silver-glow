import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { PageHeader } from '@/components/ui/page-header';
import { ProfileInfoCard } from '../components/ProfileInfoCard';
import { ProfileQuickActions } from '../components/ProfileQuickActions';
import { ProfileMenuItem } from '../components/ProfileMenuItem';

export const ProfileTemplate = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { openConfirmModal } = useModalStore();

  const handleLogout = () => {
    openConfirmModal({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      type: 'danger',
      label: 'LOGOUT',
      onConfirm: async () => {
        await logout();
        router.replace('/login');
      },
    });
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
          <ProfileInfoCard user={user} />

          {/* Quick Actions */}
          <ProfileQuickActions 
            onOrdersPress={() => router.push('/(main)/orders')}
            onWishlistPress={() => router.push('/(main)/wishlist')}
          />

          {/* Menu Items */}
          <View>
            <ProfileMenuItem 
              title="Account informations" 
              icon="user" 
              iconColor="#192C56" 
              bgColor="#F1F5F9"
              onPress={() => router.push('/(main)/account-info')} 
            />
            <ProfileMenuItem 
              title="Change password" 
              icon="lock" 
              iconColor="#10B981" 
              bgColor="#ECFDF5"
              onPress={() => router.push('/(main)/change-password')} 
            />
            <ProfileMenuItem 
              title="App Theme" 
              icon="sun" 
              iconColor="#F59E0B" 
              bgColor="#FFFBEB"
              rightLabel="Light"
              onPress={() => {}} 
            />
            <ProfileMenuItem 
              title="App Language" 
              icon="language" 
              iconType="Ionicons"
              iconColor="#3B82F6" 
              bgColor="#EFF6FF"
              rightLabel="English"
              onPress={() => {}} 
            />
            <ProfileMenuItem 
              title="Need help?" 
              icon="headphones" 
              iconColor="#F97316" 
              bgColor="#FFF7ED"
              rightLabel="contact with us"
              onPress={() => router.push('/(main)/need-help' as any)} 
            />
            <ProfileMenuItem 
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

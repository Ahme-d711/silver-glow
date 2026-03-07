import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { PageHeader } from '@/components/ui/page-header';
import { ProfileInfoCard } from '../components/ProfileInfoCard';
import { ProfileQuickActions } from '../components/ProfileQuickActions';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { useLanguage } from '@/src/hooks/useLanguage';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

export const ProfileTemplate = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { openConfirmModal } = useModalStore();
  const { t } = useLanguage();

  const handleLogout = () => {
    openConfirmModal({
      title: t('profile.logout'),
      message: t('navigation.logout_confirm_desc'),
      type: 'danger',
      label: t('navigation.confirm_logout'),
      onConfirm: async () => {
        await logout();
        router.replace('/login');
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <PageHeader title={t('profile.title')} />

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
            onWalletPress={() => router.push('/(main)/wallet')}
          />

          {/* Menu Items */}
          <View>
            <ProfileMenuItem 
              title={t('profile.account_info')} 
              icon="user" 
              iconColor="#192C56" 
              bgColor="#F1F5F9"
              onPress={() => router.push('/(main)/account-info')} 
            />
            <ProfileMenuItem 
              title={t('profile.change_password')} 
              icon="lock" 
              iconColor="#10B981" 
              bgColor="#ECFDF5"
              onPress={() => router.push('/(main)/change-password')} 
            />
            <ProfileMenuItem 
              title={t('profile.app_theme')} 
              icon="sun" 
              iconColor="#F59E0B" 
              bgColor="#FFFBEB"
              rightLabel={t('profile.theme_light')}
              onPress={() => {}} 
            />
            
            <LanguageSwitcher />

            <ProfileMenuItem 
              title={t('profile.need_help')} 
              icon="headphones" 
              iconColor="#F97316" 
              bgColor="#FFF7ED"
              rightLabel={t('profile.contact_us')}
              onPress={() => router.push('/(main)/need-help' as any)} 
            />
            <ProfileMenuItem 
              title={t('profile.logout')} 
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

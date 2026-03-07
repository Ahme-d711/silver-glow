import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { PageHeader } from '@/components/ui/page-header';
import { AccountInfoRow } from '../components/AccountInfoRow';
import { AccountProfileHeader } from '../components/AccountProfileHeader';
import { AccountStats } from '../components/AccountStats';
import { useLanguage } from '@/src/hooks/useLanguage';

export const AccountInfoTemplate = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { t, currentLanguage } = useLanguage();

  const getGenderLabel = () => {
    if (!user?.gender) return t('profile.not_specified');
    if (user.gender === 'male') return t('auth.male');
    if (user.gender === 'female') return t('auth.female');
    return user.gender;
  };

  return (
    <View className="flex-1 bg-white">
      <PageHeader 
        title={t('profile.account_info')} 
        rightElement={
          <TouchableOpacity onPress={() => router.push('/(main)/edit-profile')}>
            <Feather name="edit-3" size={24} color="white" />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <AccountProfileHeader user={user} />

        {/* Info Card */}
        <View className="px-6">
          <Text className="text-slate-400 text-sm font-bold mb-2 ml-1">
            {t('profile.personal_details')}
          </Text>
          <AccountInfoRow 
            icon="user" 
            label={t('auth.full_name')} 
            value={user?.name || t('profile.not_provided')} 
          />
          <AccountInfoRow 
            icon="mail" 
            label={t('auth.email')} 
            value={user?.email || t('profile.not_provided')} 
          />
          <AccountInfoRow 
            icon="phone" 
            label={t('auth.phone')} 
            value={user?.phone || t('profile.not_provided')} 
          />
          <AccountInfoRow 
            icon="heart" 
            label={t('auth.gender')} 
            value={getGenderLabel()} 
          />
          <AccountInfoRow 
            icon="map-pin" 
            label={t('checkout.shipping_address')} 
            value={user?.address || t('profile.no_address')} 
            isLast 
          />
        </View>

        <AccountStats 
          totalOrders={user?.totalOrders || 0} 
          totalBalance={user?.totalBalance || 0} 
        />
        
        <View className="px-6 mt-10">
          <Text className="text-slate-300 text-center text-xs">
            {t('profile.member_since')} {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

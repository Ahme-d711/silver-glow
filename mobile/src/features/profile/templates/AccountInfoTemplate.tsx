import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { PageHeader } from '@/components/ui/page-header';
import { AccountInfoRow } from '../components/AccountInfoRow';
import { AccountProfileHeader } from '../components/AccountProfileHeader';
import { AccountStats } from '../components/AccountStats';

export const AccountInfoTemplate = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-white">
      <PageHeader 
        title="Account Information" 
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
          <Text className="text-slate-400 text-sm font-bold mb-2 ml-1">Personal Details</Text>
          <AccountInfoRow 
            icon="user" 
            label="Full Name" 
            value={user?.name || 'Not provided'} 
          />
          <AccountInfoRow 
            icon="mail" 
            label="Email Address" 
            value={user?.email || 'Not provided'} 
          />
          <AccountInfoRow 
            icon="phone" 
            label="Phone Number" 
            value={user?.phone || 'Not provided'} 
          />
          <AccountInfoRow 
            icon="heart" 
            label="Gender" 
            value={user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'} 
          />
          <AccountInfoRow 
            icon="map-pin" 
            label="Address" 
            value={user?.address || 'No address set yet'} 
            isLast 
          />
        </View>

        <AccountStats 
          totalOrders={user?.totalOrders || 0} 
          totalBalance={user?.totalBalance || 0} 
        />
        
        <View className="px-6 mt-10">
          <Text className="text-slate-300 text-center text-xs">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

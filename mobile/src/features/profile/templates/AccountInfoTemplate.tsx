import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store/authStore';
import { getImageUrl } from '../../../utils/image.utils';
import { PageHeader } from '@/components/ui/page-header';

interface InfoRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, isLast }) => (
  <View className={`flex-row items-center py-5 ${!isLast ? 'border-b border-slate-50' : ''}`}>
    <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center mr-4">
      <Feather name={icon} size={18} color="#192C56" />
    </View>
    <View className="flex-1">
      <Text className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</Text>
      <Text className="text-slate-800 text-[16px] font-bold mt-0.5">{value}</Text>
    </View>
  </View>
);

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
        {/* Profile Header */}
        <View className="items-center py-10">
          <View className="relative">
            <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm">
              {user?.picture ? (
                <Image 
                  source={{ uri: getImageUrl(user.picture) as string }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-slate-100 items-center justify-center">
                  <Ionicons name="person" size={56} color="#94A3B8" />
                </View>
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

        {/* Info Card */}
        <View className="px-6">
          <View className="bg-white rounded-[32px] p-6 shadow-2xl shadow-slate-200 border border-slate-50">
            <Text className="text-slate-400 text-sm font-bold mb-2 ml-1">Personal Details</Text>
            
            <InfoRow 
              icon="user" 
              label="Full Name" 
              value={user?.name || 'Not provided'} 
            />
            <InfoRow 
              icon="mail" 
              label="Email Address" 
              value={user?.email || 'Not provided'} 
            />
            <InfoRow 
              icon="phone" 
              label="Phone Number" 
              value={user?.phone || 'Not provided'} 
            />
            <InfoRow 
              icon="heart" 
              label="Gender" 
              value={user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'} 
            />
            <InfoRow 
              icon="map-pin" 
              label="Address" 
              value={user?.address || 'No address set yet'} 
              isLast 
            />
          </View>
        </View>

        {/* Stats Card */}
        <View className="px-6 mt-6">
          <View className="flex-row gap-4">
            <View className="flex-1 bg-primary/5 p-5 rounded-[24px] items-center border border-primary/10">
              <Text className="text-primary font-bold text-xl">{user?.totalOrders || 0}</Text>
              <Text className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-1">Orders</Text>
            </View>
            <View className="flex-1 bg-primary/5 p-5 rounded-[24px] items-center border border-primary/10">
              <Text className="text-primary font-bold text-xl">{user?.totalBalance || 0}$</Text>
              <Text className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mt-1">Balance</Text>
            </View>
          </View>
        </View>
        
        <View className="px-6 mt-10">
          <Text className="text-slate-300 text-center text-xs">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

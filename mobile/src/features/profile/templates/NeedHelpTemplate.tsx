import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { useSettings } from '../../settings/hooks/useSettings';

export const NeedHelpTemplate = () => {
  const { data: settingsResponse, isLoading } = useSettings();
  const settings = settingsResponse?.data?.settings;

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <PageHeader title="Need Help" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#192C56" />
        </View>
      </View>
    );
  }

  const handleEmailPress = () => {
    if (settings?.contactEmail) {
      Linking.openURL(`mailto:${settings.contactEmail}`);
    }
  };

  const handlePhonePress = () => {
    if (settings?.contactPhone) {
      Linking.openURL(`tel:${settings.contactPhone}`);
    }
  };

  const handleFacebookPress = () => {
    if (settings?.facebookLink) {
      let url = settings.facebookLink;
      if (!url.startsWith('http')) {
        url = `https://${url}`;
      }
      Linking.openURL(url);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <PageHeader title="Need Help" />
      
      <ScrollView 
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-primary mb-6">Contact Info</Text>

        {/* Email */}
        <TouchableOpacity 
          onPress={handleEmailPress}
          className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
        >
          <View className="bg-slate-200 p-3 rounded-2xl mr-4">
            <Feather name="mail" size={24} color="#192C56" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-sm mb-1">Our friendly team is here to help</Text>
            <Text className="text-primary font-bold text-lg">{settings?.contactEmail || 'BlueWhale2025@company.com'}</Text>
          </View>
        </TouchableOpacity>

        {/* Phone */}
        <TouchableOpacity 
          onPress={handlePhonePress}
          className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
        >
          <View className="bg-slate-200 p-3 rounded-2xl mr-4">
            <Feather name="phone" size={24} color="#192C56" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-sm mb-1">Phone number</Text>
            <Text className="text-primary font-bold text-lg">{settings?.contactPhone || '+201152136068'}</Text>
          </View>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity 
          onPress={handleFacebookPress}
          className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
        >
          <View className="bg-slate-200 p-3 rounded-2xl mr-4">
            <FontAwesome name="facebook" size={24} color="#192C56" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-sm mb-1">Facebook account</Text>
            <Text className="text-primary font-bold text-lg">{settings?.facebookLink?.replace('https://', '')?.replace('www.', '') || 'BlueWhale-group'}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { PageHeader } from '../../../../components/ui/page-header';
import { useSettings } from '../../settings/hooks/useSettings';
import { useLanguage } from '@/src/hooks/useLanguage';

export const NeedHelpTemplate = () => {
  const { data: settingsResponse, isLoading } = useSettings();
  const { t, currentLanguage } = useLanguage();
  const settings = settingsResponse?.data;

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <PageHeader title={t('profile.need_help')} />
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

  return (
    <View className="flex-1 bg-white">
      <PageHeader title={t('profile.need_help')} />
      
      <ScrollView 
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-primary mb-6">{t('profile.contact_info')}</Text>

        {/* Email */}
        <TouchableOpacity 
          onPress={handleEmailPress}
          className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
        >
          <View className={`${currentLanguage === 'ar' ? 'ml-4' : 'mr-4'} bg-slate-200 p-3 rounded-2xl`}>
            <Feather name="mail" size={24} color="#192C56" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-sm mb-1">{t('profile.support_hint')}</Text>
            <Text className="text-primary font-bold text-lg">{settings?.contactEmail || 'BlueWhale2025@company.com'}</Text>
          </View>
        </TouchableOpacity>

        {/* Phone */}
        <TouchableOpacity 
          onPress={handlePhonePress}
          className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
        >
          <View className={`${currentLanguage === 'ar' ? 'ml-4' : 'mr-4'} bg-slate-200 p-3 rounded-2xl`}>
            <Feather name="phone" size={24} color="#192C56" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-sm mb-1">{t('auth.phone')}</Text>
            <Text className="text-primary font-bold text-lg">{settings?.contactPhone || '+201152136068'}</Text>
          </View>
        </TouchableOpacity>

        {/* Social Links */}
        {settings?.socialLinks?.map((social, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => {
              let url = social.link;
              if (!url.startsWith('http')) {
                url = `https://${url}`;
              }
              Linking.openURL(url);
            }}
            className="flex-row items-center bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100"
          >
            <View className={`${currentLanguage === 'ar' ? 'ml-4' : 'mr-4'} bg-slate-200 p-3 rounded-2xl`}>
              {(() => {
                const platform = social.platform.toLowerCase();
                const link = social.link.toLowerCase();
                
                if (platform.includes('facebook') || link.includes('facebook.com') || link.includes('fb.watch')) {
                  return <FontAwesome name="facebook" size={24} color="#1877F2" />;
                }
                if (platform.includes('whatsapp') || link.includes('wa.me') || link.includes('whatsapp.com')) {
                  return <FontAwesome name="whatsapp" size={24} color="#25D366" />;
                }
                if (platform.includes('instagram') || link.includes('instagram.com')) {
                  return <FontAwesome name="instagram" size={24} color="#E4405F" />;
                }
                if (platform.includes('tiktok') || link.includes('tiktok.com')) {
                  return <FontAwesome5 name="tiktok" size={24} color="#000000" />;
                }
                if (platform.includes('youtube') || link.includes('youtube.com') || link.includes('youtu.be')) {
                  return <FontAwesome name="youtube-play" size={24} color="#FF0000" />;
                }
                if (platform.includes('twitter') || platform.includes(' x ') || link.includes('twitter.com') || link.includes('x.com')) {
                  return <FontAwesome name="twitter" size={24} color="#1DA1F2" />;
                }
                if (platform.includes('snapchat') || link.includes('snapchat.com')) {
                  return <FontAwesome name="snapchat-ghost" size={24} color="#FFFC00" />;
                }
                if (platform.includes('linkedin') || link.includes('linkedin.com')) {
                  return <FontAwesome name="linkedin" size={24} color="#0077B5" />;
                }
                if (platform.includes('telegram') || link.includes('t.me')) {
                  return <FontAwesome name="send" size={24} color="#0088CC" />;
                }
                
                return <Feather name="globe" size={24} color="#192C56" />;
              })()}
            </View>
            <View className="flex-1">
              <Text className="text-slate-500 text-sm mb-1 capitalize">{social.platform}</Text>
              <Text className="text-primary font-bold text-lg" numberOfLines={1}>
                {social.link.replace('https://', '').replace('http://', '').replace('www.', '')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

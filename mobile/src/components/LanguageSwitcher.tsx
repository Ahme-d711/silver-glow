import React from 'react';
import { ProfileMenuItem } from '../features/profile/components/ProfileMenuItem';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { toggleLanguage, currentLanguage, t } = useLanguage();

  return (
    <ProfileMenuItem 
      title={t('profile.app_language')} 
      icon="language" 
      iconType="Ionicons"
      iconColor="#3B82F6" 
      bgColor="#EFF6FF"
      rightLabel={currentLanguage === 'en' ? 'English' : 'العربية'}
      onPress={toggleLanguage} 
    />
  );
};

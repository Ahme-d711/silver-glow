import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const STORE_LANGUAGE_KEY = 'user-language';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    const isRTL = newLanguage === 'ar';

    try {
      // 1. Persist selection
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, newLanguage);
      
      // 2. Change i18next language
      await i18n.changeLanguage(newLanguage);

      // 3. Handle RTL and Reload
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
        
        // Using a more robust delay and error handling for reload
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          // Some versions of expo-updates have issues with direct calls in some environments
          // Calling it without any hidden arguments (like from an event)
          await Updates.reloadAsync();
        } catch (reloadError) {
          console.error('Failed to reload app automatically:', reloadError);
          // Fallback: Notify user to restart manually if reload fails
        }
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return {
    t,
    i18n,
    currentLanguage,
    toggleLanguage,
    isRTL: I18nManager.isRTL,
  };
};

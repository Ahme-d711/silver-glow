import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import en from './en.json';
import ar from './ar.json';

const STORE_LANGUAGE_KEY = 'user-language';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

let isInitialized = false;

export const initI18n = async () => {
  if (isInitialized) return;

  let savedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);

  if (!savedLanguage) {
    const deviceLanguage = Localization.getLocales()[0]?.languageCode;
    savedLanguage = deviceLanguage === 'ar' ? 'ar' : 'en';
  }

  const isRTL = savedLanguage === 'ar';

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  isInitialized = true;
};

export default i18n;

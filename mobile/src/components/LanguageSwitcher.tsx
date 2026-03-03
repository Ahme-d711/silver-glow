import React from 'react';
import { View, Text, TouchableOpacity, I18nManager, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const STORE_LANGUAGE_KEY = 'user-language';

export const LanguageSwitcher = () => {
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
        // Delay reload slightly to ensure AsyncStorage is settled if needed
        // but Updates.reloadAsync is usually sufficient
        setTimeout(() => {
          Updates.reloadAsync();
        }, 100);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={toggleLanguage}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>
          {currentLanguage === 'en' ? 'العربية' : 'English'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF', // Premium blue - adjusted to match Silver Glow if needed
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

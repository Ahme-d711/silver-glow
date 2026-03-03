import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenNative from 'expo-splash-screen';
import { QueryProvider } from '../src/providers/QueryProvider';
import { setupInterceptors } from '../src/services/api/interceptors';
import { useAuthStore } from '../src/features/auth/store/authStore';
import { SplashScreen } from '../src/components/common/SplashScreen';
import { AppModal } from '../src/components/ui/AppModal';
import { initI18n } from "../src/i18n";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreenNative.preventAutoHideAsync();

export default function RootLayout() {
  const logout = useAuthStore((state) => state.logout);
  const initialize = useAuthStore((state) => state.initialize);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const setupApp = async () => {
      await initI18n();
      setupInterceptors(logout);
      await initialize();
      setI18nReady(true);
    };

    setupApp();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreenNative.hideAsync();
    }
  }, [isLoading]);

  if (isLoading || !i18nReady) {
    return <SplashScreen />;
  }

  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="light" />
      <AppModal />
    </QueryProvider>
  );
}

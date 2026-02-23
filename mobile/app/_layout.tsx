import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryProvider } from '../src/providers/QueryProvider';
import { AuthProvider } from '../src/providers/AuthProvider';
import { setupInterceptors } from '../src/services/api/interceptors';
import { useAuthStore } from '../src/features/auth/store/authStore';
import "../global.css";

export default function RootLayout() {
  const logout = useAuthStore((state) => state.logout);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    setupInterceptors(logout);
    initialize();
  }, []);

  return (
    <QueryProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </QueryProvider>
  );
}

import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/features/auth/store/authStore';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Wait for auth to initialize before redirecting
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(main)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TransactionProvider } from "@/contexts/TransactionContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export const unstable_settings = {
  anchor: '(tabs)',
};

// biar splash screen gak hilang duluan sebelum font siap
SplashScreen.preventAutoHideAsync();

// komponen kecil ini tugasnya mantau status login, lalu redirect kalau perlu
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments(); // baca folder aktif sekarang
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // masih ngecek token, jangan lakuin apa-apa dulu
    const inAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !inAuthGroup) {
      // belum login tapi coba akses halaman selain (auth) paksa ke Login
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      // udah login tapi masih di halaman Login/Register paksa ke Home
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // jangan render apa-apa dulu selama font belum siap
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <TransactionProvider>
          <AuthGuard>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthGuard>
          <StatusBar style="auto" />
        </TransactionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
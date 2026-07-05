import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TransactionProvider } from "@/contexts/TransactionContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export const unstable_settings = {
  anchor: '(tabs)',
};

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
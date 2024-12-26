import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
import 'react-native-reanimated';
import '@/global.css';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppInit from '@/src/components/AppInit';
import { AuthProvider } from '@/src/features/auth-context';
import { delay } from '@/src/helper/utils';
import useAppState from '@/src/hooks/networking/use-app-state';
import useOnlineManager from '@/src/hooks/networking/use-online-manager';
import { CustomDialogLoadingProvider } from '@/src/components/CustomDialogLoading/CustomDialogLoadingProvider';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(auth)/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ChickenPie: require('../assets/fonts/Chicken-Pie.ttf'),
    SfPro100: require('../assets/fonts/SF-Pro-Text-Thin.otf'),
    SfPro200: require('../assets/fonts/SF-Pro-Text-Ultralight.otf'),
    SfPro300: require('../assets/fonts/SF-Pro-Text-Light.otf'),
    SfPro400: require('../assets/fonts/SF-Pro-Text-Regular.otf'),
    SfPro500: require('../assets/fonts/SF-Pro-Text-Medium.otf'),
    SfPro600: require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
    SfPro700: require('../assets/fonts/SF-Pro-Text-Bold.otf'),
    SfPro900: require('../assets/fonts/SF-Pro-Text-Black.otf'),
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  useOnlineManager();
  useAppState();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function hideSplashScreen() {
      await delay(1500);

      SplashScreen.hideAsync();
    }

    if (loaded) {
      hideSplashScreen();
    }
  }, [loaded]);

  if (!loaded) {
    return <AppInit />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <CustomDialogLoadingProvider>
            <AuthProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Slot />
              </ThemeProvider>
            </AuthProvider>
          </CustomDialogLoadingProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

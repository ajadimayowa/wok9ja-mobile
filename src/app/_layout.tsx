import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toastify from '../components/alerts/toast';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from '../store/store';

// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    primaryFont: require('../assets/fonts/Niramit-Regular.ttf'),
    primaryFontSemiBold: require('../assets/fonts/Niramit-Medium.ttf'),
    primaryFontBold: require('../assets/fonts/Niramit-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Provider store={store}>
      <StatusBar style='auto' />
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Splash screen' }} />
        <Stack.Screen name="home-unauth" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen name="login" options={{ title: '' }} />
        <Stack.Screen name="reset-password" options={{ title: 'Reset password' }} />
        <Stack.Screen name="request-password-reset" options={{ headerShown: true, title: 'Request reset' }} />
        <Stack.Screen name="registration" options={{ title: '' }} />
        <Stack.Screen name="verification-screen" options={{ title: '' }} />
        <Stack.Screen name="(dashboard)" options={
          { headerShown: false }} />
        {/* <Stack.Screen name="service" options={{title: 'Service Screen' }} /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <Toast />
    </Provider>
    // </ThemeProvider>
  );
}

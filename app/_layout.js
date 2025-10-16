import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
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
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

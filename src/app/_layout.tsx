import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/global.css';
import { messages } from '~/locales/en/messages.po';

SplashScreen.preventAutoHideAsync();

i18n.loadAndActivate({ locale: 'en', messages });

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nProvider i18n={i18n}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


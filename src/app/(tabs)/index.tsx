import { useLingui } from '@lingui/react/macro';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <View className="items-center gap-6">
        <Text className="text-4xl font-bold text-foreground">
          {t`Hello World`}
        </Text>

        <Text className="text-center text-lg text-foreground">
          {t`Welcome to the minimal Expo app template`}
        </Text>

        <Text className="text-center text-sm text-foreground/70">
          {t`Built with Expo, Lingui, NativeWind, and Bun`}
        </Text>

        <View className="mt-8 rounded-lg bg-primary px-6 py-3">
          <Text className="text-base font-semibold text-primary-foreground">
            {t`Get Started`}
          </Text>
        </View>
      </View>
    </View>
  );
}


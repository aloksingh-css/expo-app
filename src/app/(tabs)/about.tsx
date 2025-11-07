import { useLingui } from '@lingui/react/macro';
import { Text, View } from 'react-native';

export default function AboutScreen() {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <View className="items-center gap-4">
        <Text className="text-3xl font-bold text-foreground">
          {t`About`}
        </Text>
        <Text className="text-center text-base text-foreground/80">
          {t`This is a minimal Expo template with modern tooling.`}
        </Text>
      </View>
    </View>
  );
}


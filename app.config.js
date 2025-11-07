module.exports = {
  expo: {
    name: 'Expo Minimal Template',
    slug: 'expo-minimal-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },

    plugins: [
      'expo-router',
      'expo-localization',
      'expo-font',
    ],

    experiments: {
      typedRoutes: true,
    },

    assetBundlePatterns: ['**/*'],

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.example.expominimal',
    },

    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.example.expominimal',
    },

    extra: {
      router: {
        origin: false,
      },
    },
  },
};


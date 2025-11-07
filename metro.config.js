const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Add NativeWind configuration
const nativeWindConfig = withNativeWind(config, {
  input: './src/global.css',
  inlineRem: 16,
});

// Add Lingui transformer
nativeWindConfig.transformer = {
  ...nativeWindConfig.transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
};

// Add .po and .pot as source extensions
nativeWindConfig.resolver = {
  ...nativeWindConfig.resolver,
  sourceExts: [...nativeWindConfig.resolver.sourceExts, 'po', 'pot'],
};

// Watch locales folder
nativeWindConfig.watchFolders = [path.resolve(projectRoot, 'locales')];

module.exports = nativeWindConfig;


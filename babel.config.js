module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '~': './',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.po'],
        },
      ],
      '@lingui/babel-plugin-lingui-macro',
      'react-native-worklets/plugin',
      'react-native-reanimated/plugin',
    ],
  };
};


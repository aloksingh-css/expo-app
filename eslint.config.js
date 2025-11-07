// eslint.config.js
const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
const tailwind = require('eslint-plugin-tailwindcss');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  // Expo base (includes React/React Native, import, hooks, TS support)
  ...expo,

  // Add Tailwind
  tailwind.configs['flat/recommended'] ?? {
    plugins: { tailwindcss: tailwind },
    rules: tailwind.configs.recommended.rules,
  },

  // Custom rules
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
      'import/no-unresolved': 'off',
      'react/display-name': 'off',
    },
  },

  // Prettier last
  prettierRecommended,

  // Ignores
  { ignores: ['locales/**/*', 'assets/**/*', '.expo/**/*'] },
]);


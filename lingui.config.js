import { defineConfig } from '@lingui/cli';

export default defineConfig({
  sourceLocale: 'en',
  locales: ['en'],
  catalogs: [
    {
      path: 'locales/{locale}/messages',
      include: ['src'],
      exclude: ['node_modules', 'locales'],
    },
  ],
  format: 'po',
});


// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://livn.tr',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'tr', locales: { tr: 'tr-TR', en: 'en-US' } },
    }),
  ],
  // Betik ve stiller ayrı dosya olarak üretilir; böylece katı Content-Security-Policy (public/_headers) satır içi kod gerektirmez.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  // Kod renklendirme satır içi style üretir (CSP engeller); kod blokları sitenin kendi stiliyle gösterilir.
  markdown: { syntaxHighlight: false },
});

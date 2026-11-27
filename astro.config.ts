import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { target } from './src/config/site';

/**
 * Domain und Basis-Pfad kommen aus src/config/deploy.ts (Preview oder Produktion).
 * Seiten, die nicht in die Sitemap gehören (Platzhalter mit noindex, 404), filtert `filter`.
 */
export default defineConfig({
  site: target.site,
  base: target.base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !/\/(legal-notice|privacy|404)\/$/.test(pathname);
      },
    }),
  ],
});

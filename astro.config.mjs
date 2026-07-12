import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isSitemapExcluded } from './src/data/sitemap-exclude.ts';

export default defineConfig({
  site: 'https://dieselpartsource.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        try {
          const pathname = new URL(page).pathname;
          return !isSitemapExcluded(pathname);
        } catch {
          return true;
        }
      },
    }),
  ],
});

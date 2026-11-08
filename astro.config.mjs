import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rashidsami10000-afk.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});

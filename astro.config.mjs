import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rashidali.github.io/portfolio',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
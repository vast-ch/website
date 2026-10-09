import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import netlify from '@astrojs/netlify';

import astrowind from './vendor/integration';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',

  // Pages of the previous site, folded into the temporary one.
  redirects: {
    '/services/data-science': '/services',
    '/services/data-science-machine-learning': '/services',
    '/services/web-development': '/services',
    '/services/app-development': '/services',
    '/industries': '/services',
    '/industries/energy': '/services',
    '/industries/research': '/services',
    '/industries/sport-industry': '/services',
  },

  integrations: [
    sitemap(),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    // Loads src/config.yaml as the `astrowind:config` virtual module.
    astrowind({
      config: './src/config.yaml',
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },

  adapter: netlify(),
});

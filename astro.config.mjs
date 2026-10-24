// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://miskywayra.com.ar', // provisorio hasta definir el dominio
  // Todas las URLs terminan en barra, como las genera el build (carpeta/index.html):
  // links, canonical y sitemap coinciden y el host no tiene que redirigir
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    build: {
      // lightningcss (default in Vite 8) folds `animation-timeline` into the `animation`
      // shorthand, which Chrome rejects: scroll-driven animations vanish in the build.
      cssMinify: 'esbuild',
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['300 700'],
      styles: ['normal', 'italic'], // la itálica real; solo se descarga donde se usa
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});

// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Dominio y subcarpeta. La vista previa de GitHub Pages los cambia por variables de entorno
  // (ver .github/workflows/vista-previa.yml); en la máquina y en el dominio final, la raíz.
  site: process.env.SITIO_URL ?? 'https://miskywayra.com.ar', // provisorio hasta definir el dominio
  base: process.env.SITIO_BASE ?? '/',
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
      // Títulos, textos principales, nombres: serif condensada de alto contraste
      provider: fontProviders.fontsource(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      weights: ['400'],
      styles: ['normal', 'italic'], // la itálica real; solo se descarga donde se usa
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      // Cuerpo, nav, botones, datos: la sans de la misma familia, recta y formal
      provider: fontProviders.fontsource(),
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});

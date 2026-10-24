import type { APIRoute } from 'astro';
import { ruta, esVistaPrevia } from '../lib/rutas';

// robots.txt con la dirección real del sitio (sale de `site` y `base` en astro.config.mjs).
// En la vista previa no se indexa nada.
export const GET: APIRoute = ({ site }) =>
  new Response(
    esVistaPrevia
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(ruta('/sitemap-index.xml'), site).href}\n`,
  );

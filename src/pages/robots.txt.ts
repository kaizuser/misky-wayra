import type { APIRoute } from 'astro';

// robots.txt con la dirección real del sitio (sale de `site` en astro.config.mjs)
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`);

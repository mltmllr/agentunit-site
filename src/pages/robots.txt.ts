import type { APIRoute } from 'astro';
import { target } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('In astro.config.ts fehlt `site`.');
  const sitemap = new URL(`${target.base.replace(/\/+$/, '')}/sitemap-index.xml`, site).href;
  // Preview: Crawler ausschließen. Produktion: alles erlaubt.
  const rules = target.indexable ? 'Allow: /' : 'Disallow: /';
  return new Response(`User-agent: *\n${rules}\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

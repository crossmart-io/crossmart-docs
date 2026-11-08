import type { APIRoute } from 'astro';
import { SITE_URL, SITEMAP_INDEX_PATH } from '../data/site.ts';

/** Every crawler may read every page. */
const ALL_USER_AGENTS = '*';
const ALLOW_ALL_PATH = '/';

/**
 * `/robots.txt`, written at build time: allows every crawler and points it at the sitemap index.
 * nginx serves it as `text/plain` by its extension.
 */
export const GET: APIRoute = () => {
  const lines = [
    `User-agent: ${ALL_USER_AGENTS}`,
    `Allow: ${ALLOW_ALL_PATH}`,
    '',
    `Sitemap: ${new URL(SITEMAP_INDEX_PATH, SITE_URL)}`,
  ];
  return new Response(`${lines.join('\n')}\n`);
};

import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE_URL } from './data/site';
import { MARKDOWN_MEDIA_TYPE, markdownPathFor } from './lib/markdown-alternate';

const ALTERNATE_RELATION = 'alternate';

/** Starlight's not-found page, which has no Markdown copy. */
const NOT_FOUND_ROUTE_ID = '404';

/** Points every page at its Markdown copy, for AI agents (`<link rel="alternate">`). */
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  if (route.id === NOT_FOUND_ROUTE_ID) {
    return;
  }
  route.head.push({
    tag: 'link',
    attrs: {
      rel: ALTERNATE_RELATION,
      type: MARKDOWN_MEDIA_TYPE,
      href: new URL(markdownPathFor(context.url.pathname), SITE_URL).href,
    },
  });
});

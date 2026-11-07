/**
 * Every page has a Markdown copy for AI agents: `/sellers/stock/` is also served at
 * `/sellers/stock.md`, and the home page at `/index.md`. nginx maps both forms to the
 * `index.md` file the build writes next to each `index.html`.
 */
export const MARKDOWN_FILE_NAME = 'index.md';
export const MARKDOWN_EXTENSION = '.md';
export const MARKDOWN_MEDIA_TYPE = 'text/markdown';

const TRAILING_SLASHES = /\/+$/;

/** The `.md` URL path of the page at `pathname`. */
export function markdownPathFor(pathname: string): string {
  const pagePath = pathname.replace(TRAILING_SLASHES, '');
  return pagePath ? `${pagePath}${MARKDOWN_EXTENSION}` : `/${MARKDOWN_FILE_NAME}`;
}

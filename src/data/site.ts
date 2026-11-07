/**
 * Where the docs and the services they describe live. `astro.config.mjs`, the page head and the
 * build scripts read these, so each URL is written once.
 */
export const SITE_URL = 'https://docs.crossmart.io';

/** crossmart.io, which publishes the API catalog for every Crossmart API. */
const MARKETING_SITE_URL = 'https://crossmart.io';

export const LLMS_TXT_PATH = '/llms.txt';

export const EXTERNAL_URLS = {
  /** The API catalog (RFC 9727). */
  apiCatalog: `${MARKETING_SITE_URL}/.well-known/api-catalog`,
  /** The OpenAPI document for the REST API. */
  openApiSpec: 'https://api.crossmart.io/api/docs-json',
} as const;

export const DOCS_PAGES = {
  developers: `${SITE_URL}/developers/`,
} as const;

/**
 * Web linking (RFC 8288) values for the HTTP `Link` header and the page head. They are `as const`
 * objects rather than enums because the build scripts that generate the nginx config import
 * them, and Node's type stripping cannot run enums.
 */
import { MARKDOWN_MEDIA_TYPE } from '../lib/markdown-alternate.ts';
import { DOCS_PAGES, EXTERNAL_URLS, LLMS_TXT_PATH, SITE_URL } from './site.ts';

/** Link relations (RFC 8288, RFC 8631, RFC 9727). */
export const LinkRelation = {
  /** A machine-readable description, such as an OpenAPI document. */
  ServiceDesc: 'service-desc',
  /** Documentation for people. */
  ServiceDoc: 'service-doc',
  ApiCatalog: 'api-catalog',
  DescribedBy: 'describedby',
  Alternate: 'alternate',
} as const;
export type LinkRelation = (typeof LinkRelation)[keyof typeof LinkRelation];

export const LinkMediaType = {
  OpenApiJson: 'application/vnd.oai.openapi+json',
  Html: 'text/html',
  PlainText: 'text/plain',
  Markdown: MARKDOWN_MEDIA_TYPE,
} as const;
export type LinkMediaType = (typeof LinkMediaType)[keyof typeof LinkMediaType];

/** A link target: where it points and what it is. */
export interface WebLink {
  href: string;
  rel: LinkRelation;
  type?: LinkMediaType;
}

/**
 * Sent in the `Link` header of every page, so an agent that fetches any page can find the
 * APIs, the developer docs and this site's brief. Each page also links its own Markdown copy.
 */
export const AGENT_DISCOVERY_LINKS: readonly WebLink[] = [
  { href: EXTERNAL_URLS.apiCatalog, rel: LinkRelation.ApiCatalog },
  {
    href: EXTERNAL_URLS.openApiSpec,
    rel: LinkRelation.ServiceDesc,
    type: LinkMediaType.OpenApiJson,
  },
  { href: DOCS_PAGES.developers, rel: LinkRelation.ServiceDoc, type: LinkMediaType.Html },
  {
    href: new URL(LLMS_TXT_PATH, SITE_URL).href,
    rel: LinkRelation.DescribedBy,
    type: LinkMediaType.PlainText,
  },
];

/** One `Link` header value (RFC 8288, section 3). */
export function formatLinkHeader(links: readonly WebLink[]): string {
  return links
    .map(({ href, rel, type }) => [
      `<${href}>`,
      `rel="${rel}"`,
      ...(type ? [`type="${type}"`] : []),
    ])
    .map((parts) => parts.join('; '))
    .join(', ');
}

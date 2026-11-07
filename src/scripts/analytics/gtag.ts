import {
  CONSENT_ANALYTICS_DENIED,
  CONSENT_ANALYTICS_GRANTED,
  CONSENT_DEFAULTS,
  GA_COOKIE_PREFIX,
  GA_DISABLE_PREFIX,
  GTAG_SCRIPT_URL,
} from '../../data/analytics';

type GtagCommand = 'js' | 'config' | 'event' | 'consent';
type GtagArgs = [command: GtagCommand, ...args: unknown[]];

declare global {
  interface Window {
    [gaDisableFlag: `ga-disable-${string}`]: boolean | undefined;
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

const EXPIRED_COOKIE = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

/** gtag.js reads the `arguments` object itself from the data layer, not an array copy. */
function installGtag(): (...args: GtagArgs) => void {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(..._args: GtagArgs): void {
    window.dataLayer?.push(arguments);
  };
  return window.gtag;
}

function injectScript(measurementId: string): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = `${GTAG_SCRIPT_URL}?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function isGtagLoaded(): boolean {
  return typeof window.gtag === 'function';
}

/**
 * Loads GA4 for a visitor who has accepted: the denied defaults go first, as Consent Mode v2
 * requires, then the analytics grant, then gtag.js itself.
 */
export function loadGtag(measurementId: string): void {
  window[`${GA_DISABLE_PREFIX}${measurementId}`] = false;
  if (isGtagLoaded()) {
    window.gtag?.('consent', 'update', CONSENT_ANALYTICS_GRANTED);
    return;
  }
  const gtag = installGtag();
  gtag('consent', 'default', CONSENT_DEFAULTS);
  gtag('consent', 'update', CONSENT_ANALYTICS_GRANTED);
  gtag('js', new Date());
  gtag('config', measurementId);
  injectScript(measurementId);
}

/** The domains a cookie for this host may have been set on, from the host up to the site. */
function cookieDomains(): string[] {
  const labels = window.location.hostname.split('.');
  return labels.slice(0, -1).map((_, index) => labels.slice(index).join('.'));
}

function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim() ?? '')
    .filter((name) => name.startsWith(GA_COOKIE_PREFIX));
  for (const name of names) {
    document.cookie = `${name}=; ${EXPIRED_COOKIE}`;
    for (const domain of cookieDomains()) {
      document.cookie = `${name}=; ${EXPIRED_COOKIE}; domain=.${domain}`;
    }
  }
}

/**
 * Withdraws consent on a page where GA already runs: it stops sending (not even the cookieless
 * pings Consent Mode would otherwise send), stops storing, and its cookies are removed.
 */
export function revokeGtag(measurementId: string): void {
  window[`${GA_DISABLE_PREFIX}${measurementId}`] = true;
  window.gtag?.('consent', 'update', CONSENT_ANALYTICS_DENIED);
  clearAnalyticsCookies();
}

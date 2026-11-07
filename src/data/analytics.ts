/**
 * Google Analytics 4 behind Google Consent Mode v2, in its basic form: gtag.js loads only after
 * the visitor accepts, so no request reaches Google before consent. This is the one place that
 * reads the Measurement ID; when it is unset, nothing loads and no banner shows. It mirrors
 * crossmart.io, and both sites can report to the same GA4 property.
 */

/** Where the docs send people that counts as a conversion. */
const APP_URL = 'https://app.crossmart.io';
const GITHUB_ORG_URL = 'https://github.com/crossmart-io';

/** Set at build time (`PUBLIC_GA_MEASUREMENT_ID`); empty or missing turns analytics off. */
export const GA_MEASUREMENT_ID: string | undefined =
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;

export const GTAG_SCRIPT_URL = 'https://www.googletagmanager.com/gtag/js';

/** Cookies GA4 sets (`_ga` and `_ga_<container id>`), cleared when a visitor withdraws consent. */
export const GA_COOKIE_PREFIX = '_ga';

/** GA's own opt-out switch: while `window['ga-disable-<id>']` is true, gtag.js sends nothing. */
export const GA_DISABLE_PREFIX = 'ga-disable-';

/** Where the visitor's choice is remembered in localStorage. */
export const CONSENT_STORAGE_KEY = 'crossmart.cookie-consent';

/** The answers a visitor can give the banner. */
export enum ConsentChoice {
  Granted = 'granted',
  Denied = 'denied',
}

/** The value Consent Mode gives each storage type. */
export enum ConsentState {
  Granted = 'granted',
  Denied = 'denied',
}

/** Consent Mode v2 defaults, set before gtag.js loads: everything off except what the site needs. */
export const CONSENT_DEFAULTS = {
  ad_storage: ConsentState.Denied,
  ad_user_data: ConsentState.Denied,
  ad_personalization: ConsentState.Denied,
  analytics_storage: ConsentState.Denied,
  functionality_storage: ConsentState.Granted,
  security_storage: ConsentState.Granted,
  wait_for_update: 500,
} as const;

/** Accepting turns on analytics only. Crossmart runs no ads, so ad storage stays denied. */
export const CONSENT_ANALYTICS_GRANTED = { analytics_storage: ConsentState.Granted } as const;
export const CONSENT_ANALYTICS_DENIED = { analytics_storage: ConsentState.Denied } as const;

/** The conversion events the docs send, named as on crossmart.io so both report together. Parameters never carry what a visitor typed. */
export enum AnalyticsEvent {
  SignUpClick = 'sign_up_click',
  GithubClick = 'github_click',
}

/** Links whose clicks are tracked, matched by where they point. */
export const TRACKED_LINKS = [
  { event: AnalyticsEvent.SignUpClick, hrefPrefix: APP_URL },
  { event: AnalyticsEvent.GithubClick, hrefPrefix: GITHUB_ORG_URL },
] as const;

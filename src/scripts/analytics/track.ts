import { AnalyticsEvent, ConsentChoice, GA_MEASUREMENT_ID } from '../../data/analytics';
import { readConsentChoice } from './consent-store';

/** Extra detail sent with an event. Never put anything a visitor typed in here. */
export interface AnalyticsEventParams {
  link_text?: string;
  link_url?: string;
}

/** Sends a GA4 event, or does nothing when GA is not configured or the visitor has not accepted. */
export function trackEvent(event: AnalyticsEvent, params: AnalyticsEventParams = {}): void {
  if (!GA_MEASUREMENT_ID || readConsentChoice() !== ConsentChoice.Granted) return;
  window.gtag?.('event', event, params);
}

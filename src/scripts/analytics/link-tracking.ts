import { TRACKED_LINKS } from '../../data/analytics';
import { trackEvent } from './track';

const LINK_SELECTOR = 'a[href]';
const LINK_TEXT_MAX_LENGTH = 100;

function linkText(link: HTMLAnchorElement): string {
  const text = link.textContent?.replace(/\s+/g, ' ').trim() || link.getAttribute('aria-label');
  return (text ?? '').slice(0, LINK_TEXT_MAX_LENGTH);
}

function onClick(event: MouseEvent): void {
  const link =
    event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(LINK_SELECTOR) : null;
  if (!link) return;
  const tracked = TRACKED_LINKS.find(({ hrefPrefix }) => link.href.startsWith(hrefPrefix));
  if (!tracked) return;
  trackEvent(tracked.event, { link_text: linkText(link), link_url: link.href });
}

/**
 * Tracks the conversion links (Start now, GitHub, docs) wherever they appear, by where they
 * point, so components need no tracking code of their own.
 */
export function trackLinkClicks(): void {
  document.addEventListener('click', onClick, { capture: true });
}

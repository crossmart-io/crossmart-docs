import { ConsentChoice, GA_MEASUREMENT_ID } from '../../data/analytics';
import { isConsentChoice, readConsentChoice, saveConsentChoice } from './consent-store';
import { isGtagLoaded, loadGtag, revokeGtag } from './gtag';
import { trackLinkClicks } from './link-tracking';

const BANNER_SELECTOR = '[data-consent-banner]';
const CHOICE_SELECTOR = '[data-consent-choice]';
const OPEN_SELECTOR = '[data-consent-open]';

let returnFocusTo: HTMLElement | null = null;

function applyChoice(measurementId: string, choice: ConsentChoice): void {
  if (choice === ConsentChoice.Granted) {
    loadGtag(measurementId);
  } else if (isGtagLoaded()) {
    revokeGtag(measurementId);
  }
}

function show(banner: HTMLElement): void {
  banner.hidden = false;
}

function hide(banner: HTMLElement): void {
  banner.hidden = true;
  returnFocusTo?.focus();
  returnFocusTo = null;
}

/** Reopened from "Cookie settings": focus moves into the banner and returns after a choice. */
function reopen(banner: HTMLElement, trigger: HTMLElement): void {
  returnFocusTo = trigger;
  show(banner);
  banner.focus();
}

function bindChoices(banner: HTMLElement, measurementId: string): void {
  banner.querySelectorAll<HTMLButtonElement>(CHOICE_SELECTOR).forEach((button) => {
    const choice = button.value;
    if (!isConsentChoice(choice)) return;
    button.addEventListener('click', () => {
      saveConsentChoice(choice);
      applyChoice(measurementId, choice);
      hide(banner);
    });
  });
}

function bindSettingsLinks(banner: HTMLElement): void {
  document.querySelectorAll<HTMLElement>(OPEN_SELECTOR).forEach((trigger) => {
    // Hidden in the markup, since without this script it could not do anything.
    trigger.hidden = false;
    trigger.addEventListener('click', () => reopen(banner, trigger));
  });
}

/**
 * Re-applies a saved choice on every page, or asks for one. Nothing from Google loads until the
 * visitor accepts.
 */
export function initConsent(): void {
  const banner = document.querySelector<HTMLElement>(BANNER_SELECTOR);
  if (!GA_MEASUREMENT_ID || !banner) return;
  // Starlight renders the footer inside the content column's stacking context, where the
  // sidebar would cover the banner; as a direct child of <body> it sits above the page.
  document.body.append(banner);
  bindChoices(banner, GA_MEASUREMENT_ID);
  bindSettingsLinks(banner);
  trackLinkClicks();
  const saved = readConsentChoice();
  if (saved) {
    applyChoice(GA_MEASUREMENT_ID, saved);
  } else {
    show(banner);
  }
}

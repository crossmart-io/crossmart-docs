import { CONSENT_STORAGE_KEY, ConsentChoice } from '../../data/analytics';

const CHOICES: readonly string[] = Object.values(ConsentChoice);

export function isConsentChoice(value: string | null): value is ConsentChoice {
  return value !== null && CHOICES.includes(value);
}

/** The visitor's saved choice, or null when they have not chosen or storage is unavailable. */
export function readConsentChoice(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return isConsentChoice(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Saves the choice; when storage is blocked it lasts for this page only. */
export function saveConsentChoice(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private modes can refuse storage; the banner will simply ask again next time.
  }
}

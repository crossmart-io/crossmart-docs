/** The site's privacy policy, which covers these docs too. */
const PRIVACY_POLICY_URL = 'https://crossmart.io/privacy/';

/** Copy for the cookie banner and the footer link that reopens it. */
export const CONSENT_COPY = {
  label: 'Cookie consent',
  message:
    'We use cookies from Google Analytics to understand how visitors use the Crossmart docs. No ads, no selling data.',
  privacyLabel: 'Privacy policy',
  privacyHref: PRIVACY_POLICY_URL,
  accept: 'Accept',
  reject: 'Reject',
  settings: 'Cookie settings',
} as const;

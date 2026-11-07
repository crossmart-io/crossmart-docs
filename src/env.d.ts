interface ImportMetaEnv {
  /** The GA4 Measurement ID (`G-XXXXXXXXXX`). Unset means no analytics and no consent banner. */
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

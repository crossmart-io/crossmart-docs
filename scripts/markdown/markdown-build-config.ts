/** What the Markdown build needs to know about a site. */
export interface MarkdownBuildConfig {
  /** The public origin, used for canonical and absolute link URLs. */
  siteUrl: string;
  /** The Astro output folder. */
  distDir: URL;
  /** The file Astro writes for each page (`/pricing/` is `/pricing/index.html`). */
  htmlFileName: string;
  /** The Markdown file written next to it. */
  markdownFileName: string;
  /** The element that holds the page content. */
  contentSelector: string;
  /** Elements dropped from the content before converting it. */
  removedSelectors: readonly string[];
  /** Built HTML files, relative to `distDir`, that are not pages (such as `404.html`). */
  excludedFiles?: readonly string[];
}

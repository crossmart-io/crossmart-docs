/**
 * Settings for the Markdown copies of the built pages ("Markdown for agents"). Every built
 * `index.html` gets an `index.md` next to it, which nginx serves for `Accept: text/markdown`
 * and at `<page>.md`.
 */
import { SITE_URL } from '../../src/data/site.ts';
import { MARKDOWN_FILE_NAME } from '../../src/lib/markdown-alternate.ts';
import type { MarkdownBuildConfig } from './markdown-build-config.ts';

export const MARKDOWN_BUILD_CONFIG: MarkdownBuildConfig = {
  siteUrl: SITE_URL,
  distDir: new URL('../../dist/', import.meta.url),
  htmlFileName: 'index.html',
  markdownFileName: MARKDOWN_FILE_NAME,
  // Starlight's <main>: the page title, the content and its footer.
  contentSelector: 'main',
  removedSelectors: [
    // Not content: code, styles, interactive controls and decoration.
    'script',
    'style',
    'noscript',
    'template',
    'svg',
    'button',
    'form',
    'input',
    'select',
    'textarea',
    'dialog',
    '[hidden]',
    '[aria-hidden="true"]',
    // Tab panels are all kept and labelled, so the tab buttons are not needed.
    '[role="tablist"]',
    // Pictures without a description say nothing in text.
    'img[alt=""]',
    'img:not([alt])',
    // Heading permalinks ("Section titled …"), the code copy button and the frame's
    // "Terminal window" label.
    '.sl-anchor-link',
    '.expressive-code .copy',
    '.expressive-code .sr-only',
    // The edit link and previous/next pagination.
    'main footer',
  ],
};

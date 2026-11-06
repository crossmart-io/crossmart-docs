// Checks every internal link and anchor in the built site (dist/), including the API reference
// pages that starlight-openapi generates and starlight-links-validator can't see.
// Run it after `pnpm build` with `pnpm check:links`.
import { existsSync, statSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST_DIR = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE_ORIGIN = 'https://docs.crossmart.io';
const HTML_EXTENSION = '.html';
const INDEX_FILE = 'index.html';
const LINK_PATTERN = /\s(?:href|src)="([^"]+)"/g;
const ID_PATTERN = /\sid="([^"]+)"/g;
const EXTERNAL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(HTML_EXTENSION))
    .map((entry) => join(entry.parentPath, entry.name));
}

function pagePath(file) {
  const path = `/${relative(DIST_DIR, file)}`;
  return path.endsWith(`/${INDEX_FILE}`) ? path.slice(0, -INDEX_FILE.length) : path;
}

/** Resolves a path the way nginx serves it (deploy/nginx.conf.template): file, folder, `.html`. */
function targetFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const withoutSlash = decoded.replace(/\/$/, '');
  const candidates = [
    join(DIST_DIR, decoded),
    join(DIST_DIR, decoded, INDEX_FILE),
    join(DIST_DIR, `${withoutSlash}${HTML_EXTENSION}`),
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

const htmlFiles = await listHtmlFiles(DIST_DIR);
const pages = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(ID_PATTERN)].map((match) => match[1]));
  pages.set(file, { html, ids });
}

const problems = [];
let checkedLinks = 0;
for (const [file, { html }] of pages) {
  const base = new URL(pagePath(file), SITE_ORIGIN);
  for (const [, rawLink] of html.matchAll(LINK_PATTERN)) {
    const link = rawLink.replaceAll('&amp;', '&');
    if (EXTERNAL_PATTERN.test(link) && !link.startsWith(SITE_ORIGIN)) continue;
    const url = new URL(link, base);
    if (url.origin !== SITE_ORIGIN) continue;
    checkedLinks += 1;
    const target = targetFile(url.pathname);
    if (!target) {
      problems.push(`${pagePath(file)} → ${link}: no such page or file`);
      continue;
    }
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (anchor && target.endsWith(HTML_EXTENSION) && !pages.get(target)?.ids.has(anchor)) {
      problems.push(`${pagePath(file)} → ${link}: no #${anchor} on that page`);
    }
  }
}

if (problems.length > 0) {
  console.error(`${problems.length} broken links:\n${[...new Set(problems)].join('\n')}`);
  process.exit(1);
}
console.log(`Checked ${checkedLinks} internal links in ${pages.size} pages: all resolve.`);

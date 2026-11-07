/**
 * Writes a Markdown copy of every built page for AI agents ("Markdown for agents"). Runs after
 * `astro build`: `node scripts/build-markdown.ts`.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HtmlPageConverter } from './markdown/html-page-converter.ts';
import type { MarkdownBuildConfig } from './markdown/markdown-build-config.ts';
import { MARKDOWN_BUILD_CONFIG } from './markdown/markdown.constants.ts';

const URL_PATH_SEPARATOR = '/';

/** The built pages: every `index.html` under the output folder, except excluded files. */
async function findPages(config: MarkdownBuildConfig): Promise<string[]> {
  const distPath = fileURLToPath(config.distDir);
  const entries = await readdir(distPath, { recursive: true });
  const excluded = new Set(config.excludedFiles ?? []);
  return entries
    .map((entry) => entry.split(sep).join(URL_PATH_SEPARATOR))
    .filter((entry) => entry.split(URL_PATH_SEPARATOR).at(-1) === config.htmlFileName)
    .filter((entry) => !excluded.has(entry))
    .sort();
}

/** `sellers/stock/index.html` is the page `https://docs.crossmart.io/sellers/stock/`. */
function pageUrlFor(htmlFile: string, config: MarkdownBuildConfig): URL {
  const pagePath = htmlFile.slice(0, -config.htmlFileName.length);
  return new URL(`${URL_PATH_SEPARATOR}${pagePath}`, config.siteUrl);
}

async function buildMarkdown(config: MarkdownBuildConfig): Promise<void> {
  const distPath = fileURLToPath(config.distDir);
  const converter = new HtmlPageConverter(config);
  const pages = await findPages(config);
  let written = 0;
  for (const htmlFile of pages) {
    const htmlPath = join(distPath, htmlFile);
    const markdown = converter.convert(
      await readFile(htmlPath, 'utf8'),
      pageUrlFor(htmlFile, config),
    );
    if (markdown === undefined) {
      console.warn(`markdown: no "${config.contentSelector}" in ${htmlFile}, skipped`);
      continue;
    }
    const markdownPath = join(htmlPath, '..', config.markdownFileName);
    await writeFile(markdownPath, markdown);
    written += 1;
  }
  console.log(
    `markdown: wrote ${written} of ${pages.length} pages to ${relative(process.cwd(), distPath)}`,
  );
}

await buildMarkdown(MARKDOWN_BUILD_CONFIG);

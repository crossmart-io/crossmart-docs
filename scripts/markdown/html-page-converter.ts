import type { Element, Root, RootContent, Text } from 'hast';
import { select, selectAll } from 'hast-util-select';
import { toString } from 'hast-util-to-string';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm, { type Options as GfmOptions } from 'remark-gfm';
import remarkStringify, { type Options as StringifyOptions } from 'remark-stringify';
import { unified } from 'unified';
import { SKIP, visit } from 'unist-util-visit';
import type { MarkdownBuildConfig } from './markdown-build-config.ts';

/** How the Markdown is written: GitHub-style, the dialect agents read best. */
/** Unpadded tables: the same table in far fewer tokens. */
const GFM_OPTIONS: GfmOptions = { tablePipeAlign: false };

const STRINGIFY_OPTIONS: StringifyOptions = {
  bullet: '-',
  emphasis: '_',
  strong: '*',
  fence: '`',
  fences: true,
  rule: '-',
  listItemIndent: 'one',
};

/** Attributes that hold a URL, made absolute so links work outside the site. */
const URL_ATTRIBUTES = ['href', 'src'] as const;

/** Expressive Code (Starlight) names a code block's language on the `<pre>`. */
const CODE_LANGUAGE_ATTRIBUTE = 'dataLanguage';
const CODE_LANGUAGE_CLASS_PREFIX = 'language-';
/** An empty Expressive Code line holds a lone line break. */
const LINE_BREAK_AT_END = /\n$/;

const SELECTORS = {
  title: 'title',
  description: 'meta[name="description"]',
  canonical: 'link[rel="canonical"]',
  codeBlock: 'pre',
  code: 'code',
  codeLine: '.ec-line',
  tabPanel: '[role="tabpanel"]',
} as const;

/** hast property names for the attributes tab panels use. */
const ARIA_LABELLED_BY = 'ariaLabelledBy';
const HIDDEN = 'hidden';

const FRONT_MATTER_FENCE = '---';

/** hast node types. Comments (such as an inlined SVG's XML prolog) are never content. */
const ELEMENT_NODE = 'element';
const COMMENT_NODE = 'comment';

/** The page facts that go in the front matter. */
export interface PageMetadata {
  title: string;
  description: string;
  url: string;
}

/**
 * Turns one built HTML page into clean Markdown: front matter with the page's title,
 * description and canonical URL, then the main content with absolute links.
 */
export class HtmlPageConverter {
  private readonly config: MarkdownBuildConfig;

  constructor(config: MarkdownBuildConfig) {
    this.config = config;
  }

  /** Returns `undefined` when the page has no content element. */
  convert(html: string, pageUrl: URL): string | undefined {
    const document = unified().use(rehypeParse).parse(html);
    const content = select(this.config.contentSelector, document);
    if (!content) {
      return undefined;
    }
    const metadata = this.readMetadata(document, pageUrl);
    this.labelTabPanels(content);
    this.removeNoise(content);
    this.absolutizeUrls(content, pageUrl);
    this.normalizeCodeBlocks(content);
    return `${this.frontMatter(metadata)}\n\n${this.toMarkdown(content).trim()}\n`;
  }

  private readMetadata(document: Root, pageUrl: URL): PageMetadata {
    const title = select(SELECTORS.title, document);
    return {
      title: title ? toString(title).trim() : '',
      description: this.attribute(select(SELECTORS.description, document), 'content') ?? '',
      url: this.attribute(select(SELECTORS.canonical, document), 'href') ?? pageUrl.href,
    };
  }

  /**
   * Tabs (such as curl and TypeScript versions of a step) show one panel at a time. In Markdown
   * every panel is shown, headed by its tab's name; the tab list itself is removed as noise.
   */
  private labelTabPanels(content: Element): void {
    for (const panel of selectAll(SELECTORS.tabPanel, content)) {
      delete panel.properties[HIDDEN];
      const tabId = this.firstToken(panel, ARIA_LABELLED_BY);
      const tab = tabId ? select(`#${tabId}`, content) : undefined;
      if (tab) {
        panel.children.unshift(this.labelElement(toString(tab).trim()));
      }
    }
  }

  private labelElement(label: string): Element {
    const text: Text = { type: 'text', value: label };
    const strong: Element = {
      type: 'element',
      tagName: 'strong',
      properties: {},
      children: [text],
    };
    return { type: 'element', tagName: 'p', properties: {}, children: [strong] };
  }

  private removeNoise(content: Element): void {
    const noise = new Set<Element>(
      this.config.removedSelectors.flatMap((selector) => selectAll(selector, content)),
    );
    visit(content, (node, index, parent) => {
      const isNoise = node.type === COMMENT_NODE || (node.type === ELEMENT_NODE && noise.has(node));
      if (parent && index !== undefined && isNoise) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
      return undefined;
    });
  }

  private absolutizeUrls(content: Element, pageUrl: URL): void {
    visit(content, ELEMENT_NODE, (node) => {
      for (const name of URL_ATTRIBUTES) {
        const value = node.properties[name];
        if (typeof value === 'string') {
          node.properties[name] = new URL(value, pageUrl).href;
        }
      }
    });
  }

  /**
   * Expressive Code (Starlight) wraps each line in its own element and names the language on
   * the `<pre>`. Rebuilds the code as plain lines, and copies the language onto `<code>` so the
   * fenced block is labelled (```ts).
   */
  private normalizeCodeBlocks(content: Element): void {
    for (const pre of selectAll(SELECTORS.codeBlock, content)) {
      const code = select(SELECTORS.code, pre);
      if (!code) {
        continue;
      }
      const lines = selectAll(SELECTORS.codeLine, code);
      if (lines.length > 0) {
        const text: Text = {
          type: 'text',
          value: lines.map((line) => toString(line).replace(LINE_BREAK_AT_END, '')).join('\n'),
        };
        code.children = [text];
      }
      const language = pre.properties[CODE_LANGUAGE_ATTRIBUTE];
      if (typeof language === 'string') {
        code.properties.className = [`${CODE_LANGUAGE_CLASS_PREFIX}${language}`];
      }
    }
  }

  private toMarkdown(content: Element): string {
    const processor = unified()
      .use(rehypeRemark)
      .use(remarkGfm, GFM_OPTIONS)
      .use(remarkStringify, STRINGIFY_OPTIONS);
    const root: Root = { type: 'root', children: content.children as RootContent[] };
    return processor.stringify(processor.runSync(root));
  }

  /** YAML front matter; JSON strings are valid YAML scalars and escape safely. */
  private frontMatter(metadata: PageMetadata): string {
    const lines = Object.entries(metadata).map(
      ([key, value]) => `${key}: ${JSON.stringify(value)}`,
    );
    return [FRONT_MATTER_FENCE, ...lines, FRONT_MATTER_FENCE].join('\n');
  }

  /** Reads an ID-list attribute such as `aria-labelledby`, which hast parses into tokens. */
  private firstToken(element: Element, name: string): string | undefined {
    const value = element.properties[name];
    const token = Array.isArray(value) ? value[0] : value;
    return typeof token === 'string' ? token : undefined;
  }

  private attribute(element: Element | undefined, name: string): string | undefined {
    const value = element?.properties[name];
    return typeof value === 'string' ? value : undefined;
  }
}

# Contributing to crossmart-docs

Thanks for helping improve the Crossmart documentation. Fixes to typos, unclear steps and outdated
screens are as welcome as new guides.

This repository holds the documentation site at [docs.crossmart.io](https://docs.crossmart.io).
Changes to the platform itself (the API, connectors, SDKs, MCP server) belong in
[crossmart-io/crossmart](https://github.com/crossmart-io/crossmart), and changes to the web app in
[crossmart-io/crossmart-web](https://github.com/crossmart-io/crossmart-web).

## Run the site

Requires Node.js 22.23+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:4321, reloads as you edit
```

## Add or edit a page

Pages live in `src/content/docs/`, in Markdown (`.md`) or MDX (`.mdx`). The file path is the URL:
`src/content/docs/sellers/stock.md` is served at `/sellers/stock/`.

1. Create the file with a frontmatter `title` and `description`:

   ```md
   ---
   title: Stock
   description: How Crossmart keeps stock in sync across your stores.
   ---
   ```

2. Write the page. Use MDX when you need Starlight components such as `<Aside>`, `<Steps>` or
   `<Tabs>` from `@astrojs/starlight/components`.
3. Add the page to the sidebar in `astro.config.mjs`. The sidebar is listed by hand, so a page
   that isn't there is only reachable by its URL.
4. Link to other pages with root-relative paths ending in a slash, such as `/sellers/pricing/`.

The developer, agent, channel and n8n pages mirror files in
[crossmart-io/crossmart](https://github.com/crossmart-io/crossmart) (see the README). If you change
one, mention it in the pull request so both stay in sync.

## Run the checks

Run these before opening a pull request:

```bash
pnpm format       # Prettier
pnpm build        # type check, build, and validate links between pages
pnpm check:links  # after a build: every internal link and anchor, including the API reference
```

## Pull requests

- Keep each pull request focused on one topic.
- Use [Conventional Commits](https://www.conventionalcommits.org) for commit messages, such as
  `docs(sellers): explain stock buffers` or `fix: broken link in the quickstart`.
- Describe what changed and why in the pull request.

## License of contributions

By contributing, you agree that:

- documentation content (everything under `src/content/`) is licensed under
  [CC BY 4.0](LICENSE-CONTENT), and
- code (site configuration, components, scripts, styles, the Dockerfile) is licensed under the
  [MIT License](LICENSE).

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md). Report security issues as described in
[SECURITY.md](SECURITY.md), never in a public issue.

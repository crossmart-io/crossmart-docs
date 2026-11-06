---
title: Continue
description: Connect Continue to Crossmart's MCP server with an API key in requestOptions headers. Unverified against Continue's docs.
---

**Unverified.** [docs.continue.dev](https://docs.continue.dev/customize/deep-dives/mcp) documents
remote servers (`type: streamable-http`, `url`) and a `requestOptions` block for them whose
[reference](https://docs.continue.dev/reference) includes `headers`, but shows no MCP example
with headers. The config below follows the reference; it has not been confirmed.

## Connect

Create a key ([how](/agents/#or-use-an-api-key)), then add this to `~/.continue/config.yaml`, or
create a block file in `.continue/mcpServers/` (a block file also needs top-level `name`,
`version` and `schema`):

```yaml
mcpServers:
  - name: Crossmart
    type: streamable-http
    url: https://mcp.crossmart.io/mcp
    requestOptions:
      headers:
        x-api-key: cm_…
```

Continue documents `${{ secrets.NAME }}` only inside `env`, so whether it works in headers is
also unconfirmed. If the server answers `401`, the header is not being sent; write to
[hello@crossmart.io](mailto:hello@crossmart.io) with your Continue version.

## Check

The MCP section of Continue's settings lists **Crossmart** and its tools in agent mode.

## Skills

Continue has no documented `SKILL.md` support. Its closest feature is rules in
`.continue/rules`; you can copy the safety rules of the [Crossmart skill](/agents/skill/) into
one.

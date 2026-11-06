---
title: Goose
description: Connect Goose to Crossmart's MCP server as a remote Streamable HTTP extension with an API key header, and install the Crossmart skill.
---

**Unverified in the docs, confirmed in the source.** The
[Goose docs](https://goose-docs.ai/docs/getting-started/using-extensions) document remote
`streamable_http` extensions but don't show headers; the
[extension config](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/extension.rs)
has a `headers` map and `goose configure` asks for custom headers. Skills:
[using skills](https://goose-docs.ai/docs/guides/context-engineering/using-skills).

Goose is now maintained by the Agentic AI Foundation (AAIF).

## Connect

Create a key ([how](/agents/#or-use-an-api-key)). Run `goose configure` → **Add Extension** →
**Remote Extension (Streamable HTTP)**:

1. Name: `crossmart`.
2. URI: `https://mcp.crossmart.io/mcp`.
3. "Would you like to add custom headers?" → yes. Header name: `x-api-key`. Header value: your
   key.

This writes an entry like the following to `~/.config/goose/config.yaml`:

```yaml
extensions:
  crossmart:
    enabled: true
    type: streamable_http
    name: crossmart
    uri: https://mcp.crossmart.io/mcp
    headers:
      x-api-key: cm_…
    timeout: 300
```

The key is stored as written; keep the file private.
`goose session --with-streamable-http-extension` can't send headers, so it won't work for
Crossmart.

## Check

Start `goose session` and ask "list my Crossmart stores".

## Install the skill

```bash
git clone --depth 1 https://github.com/crossmart-io/crossmart.git /tmp/crossmart
cp -R /tmp/crossmart/skills/crossmart ~/.agents/skills/       # or .agents/skills/ in a project
```

`/skills` lists it. The repository is private for now; see [the Crossmart skill](/agents/skill/).

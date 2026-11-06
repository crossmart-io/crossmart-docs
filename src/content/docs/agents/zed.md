---
title: Zed
description: Connect Zed to Crossmart's MCP server with OAuth sign-in or an API key sent as a bearer token, and install the Crossmart skill.
---

Checked on 2026-11-06 against [zed.dev/docs/ai/mcp](https://zed.dev/docs/ai/mcp) and
[zed.dev/docs/ai/skills](https://zed.dev/docs/ai/skills). Zed starts an OAuth sign-in for remote
servers that have no `Authorization` header, so an API key goes in `Authorization: Bearer`.

## Connect

**Settings → AI → MCP Servers → Add Server → Add Remote Server**, or add this to your settings
file (**zed: open settings**):

```json
{
  "context_servers": {
    "crossmart": {
      "url": "https://mcp.crossmart.io/mcp",
      "headers": { "Authorization": "Bearer cm_…" }
    }
  }
}
```

- **OAuth:** leave `headers` out. Zed opens the sign-in; sign in to Crossmart, pick a workspace
  and approve the access ([details](/agents/#sign-in-with-oauth)).
- **API key:** [create one](/agents/#or-use-an-api-key) and paste it after `Bearer`. The docs
  don't document environment variables in `headers`, so the key itself goes in the file.

## Check

The Agent Panel's settings show **crossmart** with a green indicator and its tools.

## Install the skill

```bash
git clone --depth 1 https://github.com/crossmart-io/crossmart.git /tmp/crossmart
cp -R /tmp/crossmart/skills/crossmart ~/.agents/skills/       # or .agents/skills/ in a trusted project
```

Zed finds skills only directly under the skills folder, not nested deeper. The repository is
private for now; see [the Crossmart skill](/agents/skill/).

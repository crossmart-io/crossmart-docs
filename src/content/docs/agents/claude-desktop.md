---
title: Claude Desktop
description: Connect Claude Desktop to Crossmart as a custom connector with OAuth sign-in, or through a local bridge that sends an API key.
---

Checked on 2026-11-06 against
[modelcontextprotocol.io: connect local servers](https://modelcontextprotocol.io/docs/develop/connect-local-servers),
[claude.com: custom connectors](https://claude.com/docs/connectors/custom/add-unlisted) and the
[mcp-remote README](https://github.com/geelen/mcp-remote).

Claude Desktop adds **remote** servers as custom connectors, which sign in with OAuth. Its config
file starts **local** (stdio) servers only, so an API key needs a local bridge.

## Sign in with OAuth

Add Crossmart as a custom connector with the URL `https://mcp.crossmart.io/mcp` and choose
**Sign in**. Custom connectors are shared by claude.ai, Claude Desktop and the mobile apps; the
steps are in the [claude.ai guide](/agents/claude-ai/).

## Or connect with an API key

Create a key ([how](/agents/#or-use-an-api-key)). The config file opens from
**Settings → Developer → Edit Config**:

| OS      | Path                                                              |
| ------- | ----------------------------------------------------------------- |
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |
| Linux   | `~/.config/Claude/claude_desktop_config.json`                     |

[`mcp-remote`](https://github.com/geelen/mcp-remote) is a small open-source stdio proxy that
forwards to a remote server and adds headers. It needs Node.js. It is a third-party project, not
part of Claude or Crossmart; pin a version you've reviewed if your security policy asks for it.

```json
{
  "mcpServers": {
    "crossmart": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.crossmart.io/mcp",
        "--header",
        "x-api-key:${CROSSMART_API_KEY}"
      ],
      "env": { "CROSSMART_API_KEY": "cm_…" }
    }
  }
}
```

Write `x-api-key:${CROSSMART_API_KEY}` without a space after the colon: the mcp-remote README
notes that Claude Desktop on Windows does not escape spaces inside `args`.

You can also run Crossmart's own local MCP server; see
[MCP server → Claude Desktop](/developers/mcp/#connect-with-an-api-key).

## Check

Restart Claude Desktop. The tools menu in a new chat lists **crossmart** with its tools.

## Install the skill

Zip the `skills/crossmart` folder (the zip must contain the `crossmart` folder with `SKILL.md`
inside), then **Customize → Skills → + → Upload a skill**. Skills need code execution turned on
(**Settings → Capabilities**). See
[Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
and [the Crossmart skill](/agents/skill/).

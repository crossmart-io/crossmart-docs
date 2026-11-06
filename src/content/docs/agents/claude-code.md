---
title: Claude Code
description: Connect Claude Code to Crossmart's MCP server with OAuth sign-in or an API key, and install the Crossmart skill.
---

Checked on 2026-11-06 against [code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)
and [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills). Claude Code supports
both OAuth sign-in and an API key header.

## Sign in with OAuth

```bash
claude mcp add --transport http crossmart https://mcp.crossmart.io/mcp
```

Start a Claude Code session, run `/mcp`, choose **crossmart** and **Authenticate**. Sign in to
Crossmart in the browser, choose a workspace and approve the access (see
[Sign in with OAuth](/agents/#sign-in-with-oauth)).

`--scope user` makes the server available in every project; the default (`local`) keeps it to
the current project.

## Or connect with an API key

Create a key ([how](/agents/#or-use-an-api-key)) and export it in your shell:

```bash
export CROSSMART_API_KEY="cm_…"
claude mcp add --transport http crossmart https://mcp.crossmart.io/mcp \
  --header "x-api-key: $CROSSMART_API_KEY"
```

This stores the key in `~/.claude.json`. To share the server with a team without sharing a key,
commit a `.mcp.json` at the repository root instead. Claude Code expands `${VAR}` in `url` and
`headers`, so each person's own environment supplies the key:

```json
{
  "mcpServers": {
    "crossmart": {
      "type": "http",
      "url": "https://mcp.crossmart.io/mcp",
      "headers": { "x-api-key": "${CROSSMART_API_KEY}" }
    }
  }
}
```

Use the name `CROSSMART_API_KEY`: Claude Code leaves some well-known credential variables (such
as `ANTHROPIC_API_KEY`) empty in remote headers.

## Check

```bash
claude mcp list          # crossmart … ✓ Connected
```

In a session, `/mcp` lists the server and its tools.

## Install the skill

```bash
git clone --depth 1 https://github.com/crossmart-io/crossmart.git /tmp/crossmart
cp -R /tmp/crossmart/skills/crossmart ~/.claude/skills/     # or .claude/skills/ in a project
```

Claude loads it when a request matches, or run `/crossmart`. The repository is private for now;
see [the Crossmart skill](/agents/skill/).

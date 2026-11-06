---
title: Hermes Agent
description: Connect Nous Research's Hermes Agent to Crossmart's MCP server with an API key, and install the Crossmart skill.
---

Checked on 2026-11-06 against
[hermes-agent docs: MCP](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp),
[CLI commands](https://hermes-agent.nousresearch.com/docs/reference/cli-commands) and
[skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills). An API key
header is supported.

[Hermes Agent](https://github.com/NousResearch/hermes-agent) by Nous Research has a built-in MCP
client.

## Connect

Create a key ([how](/agents/#or-use-an-api-key)), then add this to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  crossmart:
    url: 'https://mcp.crossmart.io/mcp'
    headers:
      x-api-key: '${CROSSMART_API_KEY}'
```

Put `CROSSMART_API_KEY=cm_…` in `~/.hermes/.env` (or the profile's secret source). Hermes refuses
to connect when a `${VAR}` in `url` or `headers` is unresolved, instead of sending it literally.

## Check

```bash
hermes mcp list
hermes mcp test crossmart
```

## Install the skill

```bash
hermes skills install crossmart-io/crossmart/skills/crossmart
```

Hermes scans a skill before installing it. You can also copy the `skills/crossmart` folder to
`~/.hermes/skills/`. The repository is private for now; see [the Crossmart skill](/agents/skill/).

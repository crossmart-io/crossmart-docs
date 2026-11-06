---
title: Meta Muse
description: What is known about connecting Meta Muse to Crossmart through a custom connector with OAuth. Unverified; Meta doesn't document MCP connectors.
---

**Unverified.** Meta's official posts
([launch](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/),
[Muse for Small Business](https://about.fb.com/news/2026/09/introducing-muse-small-business/)) and
its [help center](https://www.meta.com/help/artificial-intelligence/1687253048996149/) say Muse
supports **custom connectors**, but don't document MCP URLs, headers or OAuth for them. There is
no documented way to send an API key.

## What is documented

- You ask Muse to create a custom connector; it may look up the service's API information, and
  it keeps credentials in its **Secure Credentials Store**. Meta doesn't review custom
  connectors.
- Businesses can submit a connector to Meta's directory through
  [platform.muse.ai](https://platform.muse.ai/docs). Meta reviews them.

## What third parties report (not confirmed by Meta)

- **Settings → Connectors → add custom connector**, paste a public HTTPS MCP URL, then sign in
  with OAuth.
- Muse can write its own MCP client on its VM and save it as a skill.

## Recommendation

Add `https://mcp.crossmart.io/mcp` as a custom connector and
[sign in with OAuth](/agents/#sign-in-with-oauth). Don't give Muse a key in chat to "build a
connector": it would sit in a conversation, and the connector would be unreviewed.

Muse's skill format is not documented, so the Crossmart skill can't be installed there yet.

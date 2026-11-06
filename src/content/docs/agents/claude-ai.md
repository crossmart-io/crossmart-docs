---
title: claude.ai custom connectors
description: Add Crossmart to claude.ai as a custom connector and sign in with OAuth, or use an API key header in organizations that have the request-headers beta.
sidebar:
  label: claude.ai
---

Checked on 2026-11-06 against
[claude.com: add a custom connector](https://claude.com/docs/connectors/custom/add-unlisted),
[connector authentication](https://claude.com/docs/connectors/building/authentication) and
[support.claude.com](https://support.claude.com/en/articles/11175166).

Custom connectors are shared by claude.ai, Claude Desktop and the mobile apps.

## Sign in with OAuth

1. Pro, Max and Ultra: **Customize → Connectors → Add custom connector**. Team and Enterprise: an
   Owner opens **Organization settings → Connectors → Add → Custom → Web**.
2. Name: `Crossmart`. URL: `https://mcp.crossmart.io/mcp`.
3. Choose **Sign in**. Sign in to Crossmart, pick a workspace and approve what Claude may do.

No key is pasted, and each person connects with their own account and role. See
[Sign in with OAuth](/agents/#sign-in-with-oauth).

## Or: request headers (beta, some organizations)

If your organization is in Anthropic's request-headers beta, the connector dialog shows a
**Request headers** section:

1. Add the connector as above, with Authentication: **No sign-in**.
2. Under **Request headers**, add `x-api-key` with your key as the value
   ([create one](/agents/#or-use-an-api-key)). `x-api-key` is one of the pre-approved header
   names.

The key is shared by everyone in the organization who uses the connector, so create it with the
smallest role that works (usually **Viewer** or **Editor**). Authentication settings can't be
edited later; remove the connector and add it again to change the key.

If you don't see **Request headers**, your organization is not in the beta: sign in with OAuth.

## Install the skill

Zip the `skills/crossmart` folder and upload it under **Customize → Skills → + → Upload a skill**
(code execution must be on). See
[Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
and [the Crossmart skill](/agents/skill/).

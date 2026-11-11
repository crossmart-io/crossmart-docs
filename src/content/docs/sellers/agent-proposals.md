---
title: Agent proposals
description: Changes from AI agents you connect, such as Claude or ChatGPT, wait for your approval in Crossmart. See what each change would do, approve or reject it, or let agents apply changes directly.
---

When an AI agent you [connected](/agents/) (Claude, ChatGPT, Cursor or any other MCP client)
wants to change your catalog, stock or listings, the change doesn't happen on its own. It waits
under **Agent → Review** until you approve it. Reading is never held up: agents can look up
products, stock, orders and reports as before.

[Crossmart Agent](/sellers/crossmart-agent/), the agent inside Crossmart, asks for approval in its
own chat, so its changes don't appear here.

## Review a proposal

Open **Agent** in the sidebar, then the **Review** tab, and choose **Outside agents** (**AI
suggestions**, the other choice, holds Crossmart's own AI content). The number on **Agent**, the
**Needs attention** list on [Home](/sellers/home/), and the bell in the header tell you when
something is waiting. Old links to `/agent-proposals` open this list. Each proposal shows:

- What it does, in one line ("Add 20 units (stock received)", "Change the catalog price of
  MUG-1"), and the product or store it touches.
- Which agent proposed it and for whom, such as **Claude for Dana**.
- The values before and after: the old price struck through next to the new one, or a title with
  the changed words marked.

Choose **Approve** to make the change, or **Reject** to drop it. Some changes need an extra tick
before **Approve** works: deleting something or taking it off sale, changing what buyers pay, and
changes that touch more than 5 items.

An approved change is made as the agent, with the access it has at that moment. If you
disconnected the agent in the meantime, or your role no longer allows the change, it is not made
and the proposal shows why under **Failed**.

Waiting proposals are under **Waiting**; the other tabs keep the history: **Applied**,
**Rejected**, **Failed** and **Expired**. A proposal
nobody decides within 7 days expires, and nothing changes. The agent can check where its
proposals stand, so it knows when you approved, rejected or let one expire.

## In the activity log

An approved change appears in the activity log (**Activity** on Home) credited to the agent, the person it acts for, and who
approved it: "Claude (agent, for Dana, approved by Lee)". Rejections are logged too. Crossmart
Agent's page shows proposals in its event stream as they arrive.

## Who can approve

Owners and Admins can approve any proposal. Other roles need **Approve suggestions** and also the
permission the change itself needs, such as **Edit products** for a price change: approving never
lets anyone make a change their own role doesn't allow. Everyone who can see AI suggestions can
see proposals.

## Let agents apply changes directly

Owners and Admins can change this under **Settings → General → Outside agents' changes**, then
**Save**:

- **Wait for my approval** (the default for every workspace): changes become proposals.
- **Apply directly**: agents make changes at once, within the access you gave them, and every
  change is still in the activity log.

The change is recorded in the activity log. Only a person signed in to Crossmart can change it; an
agent or API key cannot.

## What counts as an agent

- **Agents that sign in with OAuth** (Claude.ai, ChatGPT and others that ask you to approve
  access): their changes wait, whether they use the MCP server or call the API directly.
- **Any MCP session**, including one set up with an API key: its changes wait.
- **Scripts and integrations that call the API with an API key** (n8n, Zapier, your own code) are
  not agents here. They keep making changes directly, as they always have. Give such a key only
  the role it needs, and revoke it under **Settings → Developers → API keys** when it's no longer
  used.

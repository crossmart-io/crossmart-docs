---
title: Home and Needs attention
description: What Home shows first, the Needs attention list (stores to reconnect, listings a store refused, changes waiting for review), and how the sidebar badges and the bell count the same things.
---

**Home** is the first page in the sidebar. It shows, from the top:

1. **Needs attention**: everything that is waiting for you.
2. **Getting started**: the first steps, until your setup is done.
3. **Sales**: your sales over time, once orders come in.

**Activity**, at the top of the page, opens the activity log: every change in the workspace, who
made it and when. **Add product** starts a [new product](/sellers/products/).

## Needs attention

Each row has the button that deals with it:

| Row                                                        | Button                                                                                                                                                                                    |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A store that needs reconnecting, or has a connection error | **Reconnect**, to approve Crossmart on the channel again                                                                                                                                  |
| A disconnected store whose listings are still live         | **Open store**                                                                                                                                                                            |
| A listing a store refused, per product and store           | **Fix**: the store's own fix when it named one (such as **Choose a category**, which opens the product with that store's listing), otherwise the listing with its error and **Try again** |
| Changes from outside agents, or AI suggestions, waiting    | **Review**, which opens **Agent → Review** on that source                                                                                                                                 |

Home lists the latest few of each kind. When there are more, a link such as **All 12 failed
listings** opens the full list. When nothing is waiting, the card makes way for one line: **All
good. Nothing needs you right now.**

You only see the rows your role can act on: stores and listings need permission to view stores,
and the changes to review need permission to view suggestions.

## One count everywhere

Home, the sidebar badges and the bell read the same numbers, so they always agree:

- The **Stores** badge counts stores to reconnect and failed listings.
- The **Agent** badge counts changes waiting under **Review**: AI suggestions and outside agents'
  changes.
- The bell has a notice for each of them, next to its other notices, such as billing.

The counts refresh after each change you make, so fixing a listing lowers them at once.

## For developers

The list comes from `GET /api/v1/workspaces/{workspaceId}/attention?limit=5` (permission
`workspace:view`). It returns a `total` and four sections, `stores`, `listings`, `proposals` and
`suggestions`, each with a `count` and up to `limit` (at most 20) latest items. A section is
`null` when the caller lacks the permission its page needs. See the
[API reference](/developers/api/).

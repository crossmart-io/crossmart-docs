---
title: Listing states
description: The eight states a product can have on a store (draft, needs details, ready, publishing, published, failed, removing, removed) and how to fix a listing that needs details or failed.
---

Every product has one state on each store. You see it on the product's **Channels** card, in the
store's **Listings** tab, and in the API and MCP tools as `displayState`.

| State                | In the API      | Meaning                                                            | What to do                                    |
| -------------------- | --------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| **Draft**            | `draft`         | Not in this store                                                  | Add it to the store if you want it there      |
| **Needs details**    | `needs_details` | In the store, but the store's setup or the product lacks something | Fix what it names (below)                     |
| **Ready to publish** | `ready`         | In the store and publishable, not sent yet                         | Nothing: it goes with the next sync           |
| **Publishing**       | `publishing`    | Being sent to the store now                                        | Wait; it usually takes seconds                |
| **Published**        | `published`     | Live in the store                                                  | Nothing. **View in store** opens the listing  |
| **Failed**           | `failed`        | The store refused the last publish or update                       | Read the reason, fix it, then **Try again**   |
| **Removing**         | `removing`      | Being taken off the store                                          | Wait                                          |
| **Removed**          | `removed`       | Off the store until you add it back                                | Add it to the store again if you want it back |

## When a listing needs details

A **Needs details** listing says what is missing, with a button that opens the right place:

| Missing                                                     | Where to fix it                                                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Reconnect the store                                         | **Reconnect** on the store's page, and approve Crossmart again                                |
| A shipping, payment or return policy; where items ship from | The eBay store's **Settings → Listing defaults** ([eBay](/channels/ebay/#listing-defaults))   |
| The country and the product page address                    | The Google store's **Settings → Listing setup**                                               |
| Who made the items, a shipping or processing profile        | The Etsy store's **Settings**                                                                 |
| Images                                                      | The product's images: add at least one at a public `https` address                            |
| Set the product to Active                                   | The product's status                                                                          |
| Name the product's options                                  | The product's variants: give each option a name, such as Size                                 |
| A category for this store                                   | The [listing editor](/sellers/listing-editor/#only-in-this-store): **Choose a category**      |
| The required item specifics                                 | The [listing editor](/sellers/listing-editor/#only-in-this-store): **Fill in item specifics** |

Store setup (policies, listing setup, reconnecting) needs the Owner or Admin role; it holds back
every product in that store until it's done. Product fixes apply to that product only.

## When a listing fails

**Failed** means the store looked at the listing and refused it. The reason is the store's own
message, such as eBay naming an item specific it needs. Fix what it says, in the product or in
the [listing editor](/sellers/listing-editor/), then click **Try again** to publish that one
product to that store again.

Saving a change to the product or to its listing already sends an update, so often the listing
recovers by itself. **Try again** can't go through when:

- the store needs reconnecting (**Reconnect the store**);
- the product is no longer in the store (add it again);
- your plan has no room for another listing (**See your plan**);
- your role can't publish listings (ask a workspace admin).

## Find every listing that needs attention

- The store's **Listings** tab filters by **Published**, **Not published yet**, **Needs details**,
  **Failed**, **Removing** and **Removed**.
- The map on the [Crossmart Agent](/sellers/crossmart-agent/) page counts each store's products
  that need details; click the count to open them.
- The **Products** table filters **With listing errors** across all stores.
- The **Channels** item in the sidebar counts failed listings.

AI agents connected to Crossmart read the same states and can fix most product-side problems for
you; see [AI agents](/agents/).

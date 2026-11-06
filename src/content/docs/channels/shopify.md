---
title: Shopify
description: Connect a Shopify store to Crossmart, import its catalog, and what Crossmart publishes, syncs and reads from Shopify.
---

**Status: live.**

Crossmart publishes your products to Shopify, keeps their prices and stock in step, reads the
store's orders, and can import the products a store already has.

## Connect

1. In **Channels**, click **Connect** on Shopify.
2. Enter the store's domain: the `your-store` part of `your-store.myshopify.com` (Shopify admin,
   **Settings → Domains**). Your own domain won't work here.
3. Approve the Crossmart app on Shopify. You come back to the store's page.

Shopify needs no further setup: you can publish right away.

### Permissions Crossmart asks for

| Shopify permission                       | Why                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Read and write products                  | Publish and update your products                                                      |
| Read and write inventory, read locations | Set stock at the store's primary location                                             |
| Write publications (optional)            | Show products in your Online Store. Without it they are created in Shopify but hidden |
| Read orders (optional)                   | Read orders so their stock is held across your stores                                 |

If a store was connected without an optional permission, its page explains what doesn't work yet
and offers **Approve in Shopify**.

## Import your catalog

On a connected store, **Import products from Shopify** reads every product of the store:

| Shopify product                                 | What Crossmart does                                                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Already linked to this store                    | Refreshes the link. Your product and stock in Crossmart stay as they are                                         |
| Same handle or SKU as a product in your catalog | Links them. Your product and stock in Crossmart stay as they are                                                 |
| No match                                        | Creates the product (a draft if it isn't active on Shopify), with its cost and its stock at the primary location |

Imported products are in the store already. Variants that match nothing and products that break
your catalog's rules are listed on the import's page under **Imports**. An import that stops
continues where it stopped, and running it again is safe.

## What Crossmart sends

- **Products:** title, description, vendor, product type, tags, options and every variant (SKU,
  barcode, price, compare-at price, cost, weight), and images. The handle is set when the product
  is first created on Shopify.
- **Visibility:** a product that isn't active, or is hidden in this store, is sent as a draft.
- **Stock:** the available quantity at the store's primary location, after every change. Every 15
  minutes Crossmart checks the quantities Shopify shows and corrects any that drifted.
- **Prices:** after the store's [pricing rule](/sellers/pricing/) or a fixed price for the store.

Removing a product from the store archives it on Shopify: it leaves your sales channels but keeps
its orders. Adding it again reactivates it.

## Orders

With the read orders permission, Shopify notifies Crossmart of new, updated and cancelled orders,
and Crossmart also checks every 2 minutes in case a notification was missed. Each order holds its
stock at once. Crossmart reads lines, quantities, prices and totals, never the buyer. See
[Orders](/sellers/orders/).

## Uninstalling

Uninstalling the Crossmart app in Shopify disconnects the store in Crossmart. Your products stay
in your catalog; reconnect the store to sync again.

---
title: Etsy
description: How Crossmart will publish listings to an Etsy shop with variations, images and stock, read Etsy orders, and what an Etsy shop needs first.
---

**Status: coming soon.** The connector is built from Etsy's documentation and has not yet run
against a live Etsy shop. Details may change before it opens.

Crossmart will publish your products as Etsy listings with their variations, images and stock,
read the shop's orders to keep stock right, and send stock changes back to Etsy.

## Connect

1. In **Channels**, click **Connect** on Etsy.
2. Enter your Etsy shop name.
3. Sign in on Etsy and approve Crossmart. The shop you sign in with must be the one you named.

Crossmart asks Etsy to read and write listings, read the shop, and read orders. It never deletes
listings and never changes orders.

## Listing setup

Etsy asks every physical listing who made it, when, whether it is a craft supply, and how it
ships. Set them once in the store's settings:

| Setting            | Values                                                                      |
| ------------------ | --------------------------------------------------------------------------- |
| Who made it        | I did, someone else, or a collective                                        |
| When it was made   | Made to order, or a period such as 2020–2026                                |
| Craft supply       | Yes for supplies, no for finished products                                  |
| Shipping profile   | One of the shop's shipping profiles; the only one is used when there is one |
| Processing profile | One of the shop's processing profiles, the same way                         |

Create profiles on Etsy, then **Refresh shop** to read them.

## What Crossmart sends

- A listing per product: title (up to 140 characters), description as plain text, up to 13 tags,
  the **Materials** item specific, a category matched to the title, and up to 20 images.
- Variations from up to three options, each with its own price, quantity and SKU.
- Prices after the store's [pricing rule](/sellers/pricing/). Compare-at prices are not sent.
- Stock after every change.

Characters Etsy doesn't accept are removed from titles and tags. An inactive product stays a
draft on Etsy. Removing a product from the store deactivates its listing; it is never deleted, and
adding it back reactivates it.

Etsy charges a fee when a listing is published or renewed. Crossmart only activates listings of
active products.

## Orders

Crossmart reads the shop's orders (Etsy calls them receipts) and holds their stock, like every
channel's. It reads what was sold, never the buyer's name, address or messages.

## Not yet supported

Etsy attributes beyond materials, personalization, digital listings, return policies, shop
sections, tracking numbers, and importing an existing Etsy shop.

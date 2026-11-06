---
title: Stock sync
description: How Crossmart keeps one stock count for every store, how orders hold and take stock, how to adjust stock, and how to limit what one store sees.
---

Crossmart holds one stock count per variant and sends it to every store that lists the variant.
You change stock in one place; every store follows.

## On hand, held and available

| Number        | Meaning                                                |
| ------------- | ------------------------------------------------------ |
| **On hand**   | Units you have                                         |
| **Held**      | Units reserved by open orders that haven't shipped yet |
| **Available** | On hand minus held: what the stores can sell           |

Every change is recorded with its reason, who made it and when, so the stock history of a variant
shows how it got to its count. Open a variant's history from **Inventory**.

## How stock moves

- **An order arrives** from any store: its units are held at once, and every store that lists
  the variant gets the lower quantity. See [Orders](/sellers/orders/).
- **The order ships:** the held units leave your stock on hand.
- **The order is cancelled:** its units are available again.
- **You adjust stock** in **Inventory**, edit a product's quantities, or import a stock file.

When an order takes more than was available, for example two stores selling the last unit at the
same moment, Crossmart records it as **Oversold** in **Activity**, so you can follow up.

## Adjust stock

In **Inventory**, adjust a variant's stock with a reason:

| Reason         | Use it for                                                   |
| -------------- | ------------------------------------------------------------ |
| **Received**   | A delivery from a supplier                                   |
| **Returned**   | A customer return back in stock                              |
| **Correction** | A count that corrects the recorded stock                     |
| **Damaged**    | Units you can no longer sell                                 |
| **Lost**       | Units that went missing                                      |
| **Sold**       | A sale outside your connected stores, such as a market stall |

You can add or remove units, or set the counted quantity. A note, such as an invoice number, is
optional. To update many variants at once, import a two-column `sku,available` file under
**Imports**.

Filter **Inventory** by **In stock**, **Low stock**, **Out of stock** or **Untracked** to find
what needs restocking.

## Limit what one store sees

In the [listing editor](/sellers/listing-editor/), **Stock shown** sets two limits for one
product in one store:

- **Hold back:** units this store never sees. With 10 available and 2 held back, the store shows 8.
- **Show at most:** a cap. With 50 available and a cap of 20, the store shows 20.

The store never shows less than zero.

## Keeping stores in step

Crossmart sends a new quantity as soon as stock changes. Every 15 minutes it also compares what
Shopify and eBay show with its own count and corrects any listing that drifted, for example
after a change made directly on the channel. Crossmart's count is the one that counts: change
stock in Crossmart, not on the channel.

Variants that don't track stock list as available on every store (eBay and Etsy show one unit).

---
title: Orders
description: How orders from Shopify and eBay reach Crossmart, how they hold and take stock, what an order shows, and what Crossmart keeps about buyers.
---

Orders from every connected store come into one list, under **Orders**. Crossmart reads them so
it can keep stock right across your stores. You still fulfil, ship and refund orders in the store
where they were placed.

## How orders arrive

| Channel | How Crossmart reads orders                                                                                             |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Shopify | Shopify notifies Crossmart of new, updated and cancelled orders, and Crossmart also checks for changes every 2 minutes |
| eBay    | Crossmart checks for new and changed orders every 2 minutes                                                            |

Reading Shopify orders needs a permission you approve once in Shopify. Without it, the store's
page says **Orders are not read from this store yet**, and its sales don't hold stock in your other
stores.

Orders placed before Crossmart first read a store are not imported: their stock was sold before
Crossmart held it.

## What an order does to stock

1. **Placed:** each line holds its units, and every store that lists the variant gets the lower
   quantity.
2. **Shipped:** the units leave your stock on hand.
3. **Cancelled:** the units are available again.

Refunds lower the order's total but don't return stock; a cancellation does. See
[Stock sync](/sellers/stock/).

## What an order shows

Each order shows its number as the store shows it (such as `#1001` on Shopify), the store and
channel, its status, the total in the store's currency, and its lines: SKU, quantity, unit price,
and the stock each line holds or has shipped.

| Status                  | Meaning                |
| ----------------------- | ---------------------- |
| **Open**                | Not shipped yet        |
| **Partially fulfilled** | Some units shipped     |
| **Fulfilled**           | Everything shipped     |
| **Cancelled**           | Cancelled in the store |

Filter by status or by store, or search by order number.

### Unmatched lines

A line is matched to your catalog by the variant Crossmart listed, else by SKU. A line that
matches nothing, such as an item listed outside Crossmart, is kept on the order but holds no
stock. Add the product to your catalog, or fix its SKU, so future orders match.

## Buyer details

Crossmart doesn't store buyers. It reads what was sold, the status and the totals, never the
buyer's name, address, email or phone.

Shipped and cancelled orders are deleted two years after they were placed. Open orders stay while
they hold stock.

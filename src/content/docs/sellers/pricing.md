---
title: Pricing rules and per-store prices
description: Price a whole store with a rule (markup or discount, fixed amount, rounding, a floor over cost, compare-at prices, currency conversion), and fix the price of one product in one store.
---

Your catalog holds one price per variant. Each store can sell at a different price, in two ways:

- A **pricing rule** for the whole store, such as "10% above the catalog, ending in .99".
- A **fixed price** for one product in one store, set in the [listing editor](/sellers/listing-editor/).

A fixed price wins. Without one, the store's rule prices the variant. Without a rule, the store
gets the catalog price.

## Set a store's pricing rule

Open the store, then **Settings → Pricing**. Setting it needs the Owner or Admin role.

| Setting                                  | What it does                                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Currency**                             | When the store sells in another currency than your catalog: the **Daily rate** (the European Central Bank's reference rate) or a **Fixed rate** you set |
| **Markup or discount**                   | A percentage, from -90% to +500%. Use a negative number for a discount                                                                                  |
| **Then add**                             | A fixed amount added after the percentage (negative to subtract)                                                                                        |
| **Round up to**                          | **None**, **.99**, **.95** or **Whole** (102.35 becomes 102.99, 102.95 or 103)                                                                          |
| **Never price below cost plus a margin** | A floor: the price never falls below the variant's cost plus this margin. Variants without a cost are not floored                                       |
| **Compare-at prices**                    | **Adjust it like the price**, **Keep the catalog's compare-at price**, or **Don't send a compare-at price**                                             |

The rule works in this order: convert the catalog price to the store's currency, apply the
percentage, add the fixed amount, round, then raise the result to the floor if it is below it. A
compare-at price is only sent when it is above the price.

The form shows the rule applied to one of the store's products as you type. **Save and apply**
sends the new prices to the store at once.

## Fix one product's price in one store

In the [listing editor](/sellers/listing-editor/), **Price in this store** takes a price and a
compare-at price per variant, in the store's currency. Leave a price empty to follow the store's
rule; each variant shows its **Rule price** for comparison.

The editor warns you when:

- the price is below your price floor;
- the compare-at price is not above the price, so none is sent;
- no exchange rate is known for the store's currency, so the price can't be sent until you set a
  fixed rate in the store's pricing.

## See how a price was worked out

Wherever a store price is shown, **How is this worked out?** lists each step: the catalog price,
the conversion, the markup, the fixed amount, the rounding and the floor, or the fixed price that
replaced them.

## What each channel does with compare-at prices

| Channel         | Compare-at price                                             |
| --------------- | ------------------------------------------------------------ |
| Shopify         | Sent as the compare-at (strikethrough) price                 |
| eBay            | Not sent                                                     |
| Google Shopping | Sent as the regular price, with your price as the sale price |
| Etsy            | Not sent; sales on Etsy are Etsy promotions                  |

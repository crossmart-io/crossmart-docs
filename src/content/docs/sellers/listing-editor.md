---
title: The listing editor
description: Show a product differently in one store. Which fields follow the product, which are changed for the store, and how to bring back the product's values.
---

A listing starts as a copy of the product. The listing editor shows one product in one store,
field by field, and lets you change what that store shows without touching the catalog or your
other stores. Use it for a marketplace-friendly title, a different price, fewer images, or a
smaller share of your stock.

Open it from the product's **Stores** card (**Edit listing**), or from the store's
**Listings** tab. Adding a product to a store opens it too, so you can make changes before the
product is published.

## Inherited and changed fields

Each field carries a badge:

- **From product**: the field follows the product. Edit the product and this store gets the new
  value.
- **Changed for this store**: the store has its own value. It stays when the product changes. The
  product's value is shown under it, so you can compare.

Click **Change for this store** on a field to give it its own value, and **Use product value** to
make it follow the product again. **Use product values everywhere** resets the whole listing. The
summary at the top lists what is changed for the store, or says **Everything follows the
product**.

## Fields

| Field                   | What you can do in this store                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Title**               | Its own title, up to 255 characters                                                                               |
| **Vendor**              | Its own vendor (brand)                                                                                            |
| **Description**         | Its own description                                                                                               |
| **Tags**                | Its own tags                                                                                                      |
| **Images**              | Which of the product's images to show. The first one chosen is the main image                                     |
| **Price in this store** | A fixed price and compare-at price per variant. Empty prices follow the store's [pricing rule](/sellers/pricing/) |
| **Visibility**          | **Same as the product's status**, **Show in this store** or **Hide in this store**                                |
| **Stock shown**         | **Hold back**: units this store never sees. **Show at most**: a cap on the quantity the store shows               |

**Write with AI**, at the top of the editor, drafts a title and description for this store into
the form. Nothing is saved until you click **Save**.

Saving updates the listing on the store when it is already published. A price you fix here wins
over the pricing rule, and the editor warns you when it is below your price floor.

## Only in this store

Some channels ask for details the product has no value for. On eBay, the editor opens with a
section **Only in this store**:

- **eBay category.** Picked from eBay's suggestions for the title when the product is first
  published. Search for another and choose it; changing it updates the listing on eBay.
- **Item specifics.** Details buyers filter by on eBay, such as Brand, Color or Department. Each
  category has its own, and **Required** ones must be filled in before the listing is published.
  Brand starts from the product's vendor.

These save on their own, apart from the rest of the form. See
[eBay: categories and item specifics](/channels/ebay/#categories-and-item-specifics).

## Who can edit

Changing a listing needs the `listings:edit` permission (Owner, Admin or Editor). Other roles see
the editor read-only.

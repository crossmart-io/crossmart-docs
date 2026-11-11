---
title: Google Shopping
description: How Crossmart will publish products to Google Shopping and free listings through Google Merchant Center, and what you need to prepare.
---

**Status: coming soon.** The connector is built; this page describes how it works today, and
details may change before it opens to every seller.

Crossmart publishes your products to Google Merchant Center, which shows them in Google Shopping
and free listings.

## What you need

- A Google Merchant Center account, and a Google account that manages it.
- A website you have **verified and claimed** in Merchant Center. Google shows products only from
  that website, and each product links to its page there.

## Connect

1. In **Stores**, click **Connect** on Google Merchant Center.
2. Enter your **Merchant Center ID**: the number at the top right of Merchant Center
   ([merchants.google.com](https://merchants.google.com)).
3. Sign in with Google and approve Crossmart.

## Listing setup

Before anything is published, open the store's **Settings → Listing setup** and choose:

- **Country**: where the listings sell. Listings are priced in its currency and written for it.
  The United States, United Kingdom, Canada, Australia, Germany, France, Italy, Spain, the
  Netherlands and Israel are supported.
- **Product page address**: your website's address for a product, with `{handle}` where the
  product's handle goes, such as `https://shop.example/products/{handle}`. It must be on the
  website you claimed in Merchant Center, or Google disapproves the products.

## What Crossmart sends

Each variant becomes one Google product, grouped with the other variants of its product.

- Title (up to 150 characters), description as plain text, the first image as the main image and
  up to 10 more.
- Price in the country's currency, after the store's [pricing rule](/sellers/pricing/). When the
  compare-at price is higher, it is sent as the regular price and your price as the sale price.
- Availability: in stock, out of stock, or backorder when the variant keeps selling when out of
  stock. It is updated when the product is published or changed.
- Condition from the product's [condition](/sellers/products/#item-condition): **New** and
  **Refurbished** as they are, every other condition as used, and new when it is not set.
- Brand from the vendor, GTIN from the barcode, color and size from options named Color and
  Size, and the shipping weight.

Products without an `https` image can't be published. A product that is no longer active, or is
removed from the store, is deleted from Merchant Center.

## Not yet supported

Product status and disapprovals from Google, Google product categories, several countries per
store, local inventory, promotions and orders.

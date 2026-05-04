## Bug

The Shop page shows "Failed to load products" because the Storefront GraphQL query now requests `quantityAvailable`, which the public Storefront access token isn't authorized to read. Shopify returns `ACCESS_DENIED` errors and `storefrontApiRequest` throws on any `data.errors`, killing the whole product fetch for every page.

## Fix

Roll back the `quantityAvailable` additions and use a static "1500 units" display on the Lux pre-order panel.

1. `src/lib/shopify.ts`
   - Remove `quantityAvailable` from the variant fields in `PRODUCT_FIELDS`.
   - Remove `quantityAvailable: number | null;` from the `ShopifyProduct` interface.
2. `src/pages/ProductDetail.tsx`
   - Pass `quantityAvailable={undefined}` to `LuxStockCounter` (component already falls back to `totalUnits` when undefined, so it will render "Only 1,500 of 1,500 units remaining").
3. Leave a TODO comment near the stock counter noting that real-time inventory requires enabling the `unauthenticated_read_product_inventory` scope on the Storefront app, which we can revisit if the user wants live counts.

No other files affected. Lux banner, badge, countdown, CTA, urgency text, and shipping clarity all keep working.

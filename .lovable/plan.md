

# Shopify Integration Plan for Vellvii

## Overview

This plan covers creating your 5 products in Shopify and integrating the store with your website, replacing the current localStorage-based cart with a real Shopify checkout system.

---

## Phase 1: Create Products in Shopify

I will create these 5 products with the descriptions you provided and the best matching images from your uploads:

| Product | Price | Images to Use |
|---------|-------|---------------|
| Vellvii DOX | $299 | Dox1.jpg, Dox2.jpg, Dox3.jpg, Dox4.jpg, Dox5.jpg |
| Vellvii LUX | $169 | lux-bag-final-v4.jpg, lux-lifestyle-final-v5.jpg |
| Vellvii G-Vibe | $169 | G-Vibe1.jpg, G-Vibe2.jpg, G-Vibe3.jpg |
| Vellvii Evolve | $169 | BlackPinkEvolve1.png, PinkEvolveSide.png, RedEvolve2PSide.png |
| Vellvii Pulse | $169 | Pulse1.jpg, Pulse2.jpg |

---

## Phase 2: Shopify API Integration

### New Files to Create

1. **`src/lib/shopify.ts`** - Shopify API configuration and helper functions
   - Store domain and storefront token constants
   - GraphQL queries for fetching products
   - `storefrontApiRequest()` helper function

2. **`src/stores/cartStore.ts`** - Zustand store for cart state management
   - Cart items with Shopify line IDs
   - Real-time sync with Shopify cart API
   - Checkout URL generation via Storefront API

3. **`src/hooks/useCartSync.ts`** - Hook for syncing cart on page visibility changes
   - Clears cart after successful checkout
   - Syncs when user returns from checkout

4. **`src/hooks/useShopifyProducts.ts`** - React Query hook for fetching products
   - Cached product data
   - Loading and error states

5. **`src/pages/Shop.tsx`** - New shop page at `/shop`
   - Dynamic product grid from Shopify
   - Add to cart functionality

6. **`src/pages/ProductDetail.tsx`** - Dynamic product detail page at `/product/:handle`
   - Full product info from Shopify
   - Variant selection (if applicable)
   - Add to cart button

7. **`src/components/CartDrawer.tsx`** - New Shopify-integrated cart component
   - Replaces current Cart.tsx
   - Real-time quantity updates via Shopify API
   - Checkout redirects to Shopify checkout

---

## Phase 3: Files to Modify

1. **`src/App.tsx`**
   - Add `/shop` route pointing to new Shop page
   - Add `/product/:handle` dynamic route
   - Add `useCartSync` hook for checkout sync
   - Replace old Cart component with CartDrawer

2. **`src/components/prelaunch/PrelaunchFooter.tsx`** (and other navigation)
   - Update shop links to point to `/shop`

3. **Remove/deprecate old files:**
   - `src/hooks/useCart.ts` (replaced by Zustand store)
   - `src/components/Cart.tsx` (replaced by CartDrawer)
   - `src/lib/productData.ts` (products now from Shopify)

---

## Phase 4: Route Structure After Implementation

```text
/                    → DOX Landing page (unchanged)
/shop                → NEW - Product catalog from Shopify
/product/:handle     → NEW - Dynamic product detail pages
/Vellvii-Lux         → Lux prelaunch page (unchanged)
/products            → Redirect to /shop (for backwards compatibility)
```

---

## Technical Details

### Cart Flow
1. User clicks "Add to Cart" on any product
2. If no cart exists: Creates new Shopify cart via `cartCreate` mutation
3. If cart exists: Adds line item via `cartLinesAdd` mutation
4. Cart state (items, cartId, checkoutUrl) persists in localStorage via Zustand
5. "Checkout" button opens Shopify checkout in new tab with `channel=online_store` parameter
6. When user returns, cart syncs and clears if checkout completed

### API Configuration
- **Store Domain:** `vellvii-site-2h1iu.myshopify.com`
- **API Version:** `2025-07`
- **Storefront Token:** Already configured

---

## Dependencies to Install

- `zustand` - State management for cart

---

## Summary

This integration will give you:
- Real products managed in Shopify
- Working checkout that accepts payments
- Cart that persists across sessions
- Dynamic product pages
- Clean `/shop` URL for your store

Once approved, I'll start by creating the 5 products in Shopify, then implement the full integration.


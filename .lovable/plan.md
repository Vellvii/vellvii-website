# Bulletproof SEO for the Lux Shopify Product Page

Target: drive all 1,500 Lux units before USA arrival. The Lux product page lives at `/products/:handle` (e.g. `/products/vellvii-lux`) and is rendered by `src/pages/ProductDetail.tsx`. Currently its SEO is just `title` + truncated description — we need to make it a ranking and conversion machine.

## 1. Upgrade `ProductDetail.tsx` SEO Block

Replace the bare `<SEO>` (lines 219-222) with a fully-loaded version that uses live Shopify data and adds Lux-specific overrides:

- **title**: `${product.title} - Luxury Pleasure Storage | Vellvii Lux` (Lux-specific) or product-generic for others. ~60 chars, keyword-front.
- **description**: hand-tuned 150-160 char copy for Lux (with "pre-order", "biometric", "limited 1,500-unit run", "ships USA"). Falls back to Shopify description for other products.
- **canonical**: `/products/${handle}`.
- **type**: `'product'`.
- **image**: first Shopify image URL (`product.images.edges[0].node.url`).
- **productData**: real values from Shopify — `name`, `description`, `price` (from `selectedVariant.price.amount`), `currency`, `availability` (map `availableForSale` → `InStock`/`PreOrder`/`OutOfStock`), `brand: "Vellvii"`, `sku` (variant id tail), `images` (all Shopify image URLs).
- **breadcrumbs**: Home → Shop → Product.
- **organizationData**: true.
- **faqData**: for Lux only, inject a 10-question Lux FAQ (storage, biometric, materials, dimensions, USA shipping, restock, free Nova gift, vs Dox, warranty, returns).

## 2. Extend `SEO.tsx`

Add support for fields the current component lacks:

- `priceValidUntil` on the Offer (`2026-06-01`).
- `itemCondition: "NewCondition"`, `url`, `seller` on Offer.
- Optional `videoData` → emits `VideoObject` JSON-LD (for the Lux hero/explainer videos).
- Allow per-page `og:image` override that points to a 1200×630 social card.
- Add `<meta name="keywords">` (light boost) for Lux: "luxury pleasure storage, biometric pleasure case, designer intimate storage, vellvii lux, luxury pleasure collection, made in usa".
- Add `<meta property="product:price:amount">` and `product:price:currency` (Facebook product tags).
- Add `<link rel="alternate" hreflang="en-us">`.

## 3. Sitemap

Update `public/sitemap.xml`:

- Add `/products/vellvii-lux` (and other live Shopify handles) with `priority: 1.0`, `changefreq: daily`, today's `lastmod`.
- Add `<image:image>` entries (image sitemap namespace) so Google indexes Lux photography.
- Demote retired prelaunch/kickstarter URLs (`/Vellvii-Lux`, `/prelaunch-dox`, etc.) to `priority: 0.3` — or remove if you confirm they should 301 to the product page.
- Drop the script `scripts/build-sitemap.ts` that dynamically pulls Shopify product handles at build time so the sitemap stays fresh automatically.

## 4. Pre-render Critical Routes

Vite SPA serves an empty shell to crawlers. Add `vite-plugin-prerender` (or `react-snap`) to statically pre-render `/`, `/shop`, `/products/vellvii-lux`, and other key product handles at build. Guarantees that Helmet meta + JSON-LD ship in the initial HTML, which is what Bing, Meta, X, LinkedIn, and many AI crawlers actually parse.

## 5. Performance / Core Web Vitals

On the Lux product page specifically:

- Preload the first Shopify image (`<link rel="preload" as="image" imagesrcset=...>`) for LCP.
- Add `width`/`height` attributes on `<img>` tags inside the gallery to kill CLS.
- Lazy-load below-the-fold sections (related products, video).
- Compress hero images served from Shopify with `?width=1600&format=webp` URL params (Shopify CDN supports this).
- Defer the `Model3DViewer` until the user toggles the 3D tab (already conditional — verify no prefetch).

## 6. Internal Linking

- Homepage `Discover the Collection` grid → use Shopify handle so the Lux card links to `/products/vellvii-lux` with anchor text "Vellvii Lux - Luxury Pleasure Storage".
- Add Lux call-out in footer of every page: "Reserve the Lux - 1,500-unit USA launch".
- 301 the legacy `/Vellvii-Lux` route to `/products/vellvii-lux` (or keep as a marketing landing that links to product) — your call, flagged in the questions below.

## 7. Conversion Tracking (Lux-only events)

Add `gtag` events fired from the Lux variant of `ProductDetail.tsx`:

- `lux_pdp_view` (on mount when `isLuxProduct`)
- `lux_add_to_cart`, `lux_checkout_start`
- `lux_countdown_view`, `lux_stock_low_view`

Already-installed GA4 (`G-CGKDHGZFBJ`) will pick these up; mark them as conversions in GA4.

## 8. Off-Page (manual, flag for you)

- GSC + Bing Webmaster Tools: re-submit sitemap, request indexing for `/products/vellvii-lux`.
- IndexNow ping on each deploy (small edge function or post-build script).
- Backlinks: Robb Report, Hypebeast, Cool Hunting, Dezeen, design-led press; Pinterest pins linking to product page; relevant subreddits where allowed.

## Files Changed

```text
src/pages/ProductDetail.tsx     → expanded SEO with Shopify data, Lux-specific overrides, GA events
src/components/SEO.tsx          → priceValidUntil, VideoObject, keywords, FB product tags, hreflang
public/sitemap.xml              → product URLs + image entries, retire prelaunch URLs
scripts/build-sitemap.ts (new)  → generate sitemap from Shopify handles at build
vite.config.ts                  → add prerender plugin for / /shop /products/vellvii-lux
src/pages/Home.tsx (collection) → ensure Lux card links to /products/<handle> with strong anchor
```

## Quick clarifying questions (answer in chat or just approve)

1. What is the exact Shopify handle for the Lux product? (so I link/sitemap correctly)
2. Should `/Vellvii-Lux` (the prelaunch page) 301-redirect to the product page, stay as a marketing landing, or be removed?
3. Confirm the Lux pre-order price + `priceValidUntil` date for the Offer schema (default I'll use: $599, valid until 2026-06-01).

Approve and I'll implement sections 1-7 in code.

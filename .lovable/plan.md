# Trust signals, complimentary shipping, and shop "show all" default

## 1. Shop: show all products, sold-out grayed out

`src/pages/Shop.tsx`
- Default to showing the full catalog (no in-stock filter applied by default).
- Keep sold-out items visible, sorted to the end of the grid, with `opacity-60` and grayscale-shifted imagery (already styled in `CollectionLayout.tsx`).
- Keep the "In stock only" toggle as an optional filter (off by default).
- Drop the `?show=all` URL param requirement; `/shop` now equals the previous `/shop?show=all`.

## 2. Trust signals near CTAs and in cart

New component `src/components/trust/TrustSignals.tsx` - compact, brand-aligned row with three cues:
- Lifetime warranty (registered) - links to `/warranty`
- Materials authenticity - per-product line (e.g. "Genuine Italian leather - velvet lining" for Lux, "Vegan leather - rose gold hardware" for DOX)
- Discreet shipping - links to `/terms#shipping-delivery`

Surface in:
- `src/pages/ProductDetail.tsx` - directly below the Add-to-Cart / sticky purchase bar area.
- `src/components/CartDrawer.tsx` - subtle footer strip above the checkout button.
- `src/pages/Cart.tsx` - same strip above the order summary.

Styling: small Montserrat caps, rose gold hairline icons (Shield, Sparkles, PackageCheck from lucide-react), no badges or color blocks - quiet luxury.

## 3. Complimentary worldwide shipping bar

New component `src/components/marketing/ShippingBar.tsx`
- One-line strip: "Complimentary worldwide shipping - included on every order."
- Renders just under `ScrollHeader` site-wide (mount inside layout above route outlet, or inside `ScrollHeader` itself).
- Dismissible per-session via `sessionStorage` (small x); reappears next session.
- Links the phrase "shipping" to `/terms#shipping-delivery`.
- Quiet styling: 28px tall, `bg-background/95`, hairline bottom border, Montserrat 11px tracking-wide, no color callouts.

## 4. Shipping & Delivery section on /terms

`src/pages/Terms.tsx` (or current terms route)
- Add anchored section `#shipping-delivery` with: complimentary worldwide shipping, discreet unbranded packaging, carrier + tracking, current dispatch windows per status (in stock / pre-order ETA referencing `productAvailability.ts`), and reminder of the no-refunds policy with a link to the warranty page.
- Add table-of-contents anchor at top.

## 5. Wiring

- `App.tsx` / layout - mount `<ShippingBar />` once globally.
- `ProductDetail.tsx`, `CartDrawer.tsx`, `Cart.tsx` - import and place `<TrustSignals />`.
- Per-product materials line resolved by `handle` (DOX, Lux, devices) via a small map in `TrustSignals.tsx`; falls back to a generic "Premium materials, hand-finished" line.

## Technical notes

- No Sale section, no bundle badges, no free-shipping threshold (out of scope per brand decision).
- Reuses existing tokens: `text-foreground/70`, `border-border/40`, `text-primary` (rose gold) for icons only.
- No new dependencies. All icons from existing `lucide-react`.
- Respects no-em-dash rule - hyphens only.
- Sold-out grayed styling already exists; only the default filter behavior in `Shop.tsx` changes.

## Files

Create: `src/components/trust/TrustSignals.tsx`, `src/components/marketing/ShippingBar.tsx`
Edit: `src/pages/Shop.tsx`, `src/pages/ProductDetail.tsx`, `src/components/CartDrawer.tsx`, `src/pages/Cart.tsx`, `src/pages/Terms.tsx`, `src/App.tsx` (or root layout)
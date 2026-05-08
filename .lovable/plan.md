# Available / Pre-Order Status Pills

## Goal
Add "Available" and "Pre-Order" pills to products that are NOT sold out, mirroring the existing Sold Out pill style.

## Where
1. **Shop grid** (`Shop.tsx` - `ProductCard`)
2. **Homepage landing grid** (`DoxVideoLanding.tsx` - product cards)
3. **Product Detail page** (`ProductDetail.tsx` - main product image)

## Logic
- **Pre-Order**: Product handle contains "lux" (matches existing `isLuxProduct` convention)
- **Available**: Any other product where `availableForSale` is true
- **Sold Out**: Unchanged (already exists)

## Styling
- Follow the same pill shape, font, and positioning as the existing Sold Out badge (`absolute top-2 left-2`, rounded-full, `backdrop-blur-sm`, uppercase tracking)
- **Pre-Order**: `bg-primary/15 border-primary/40 text-primary` — a subtle rose-gold tint to match the brand
- **Available**: `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` — a quiet green that signals "in stock" without clashing with the dark luxury palette

## Files touched
- `src/pages/Shop.tsx`
- `src/pages/DoxVideoLanding.tsx`
- `src/pages/ProductDetail.tsx`

No new dependencies. No backend changes.
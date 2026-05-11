# Show "Be the first to review" on Product Pages

## Goal

Replace the current "hide entirely when zero reviews" behavior with a visible Judge.me review section that invites the first review. No fake structured data — `aggregateRating` JSON-LD still only emits with real reviews.

## Changes

### 1. Always render the reviews section

`src/components/products/ProductReviews.tsx`

- Remove the `if (!reviewData) return null;` early exit.
- Always inject the Judge.me preloader script (it's cached + tiny).
- When `reviewData` exists: render the star summary + count above the widget (as today).
- When `reviewData` is null: render only the section heading + a short invite line ("Be the first to share your experience") above the widget. Judge.me's widget itself renders the "Write a review" button and review form, so no custom form is needed.

### 2. Keep JSON-LD honest

`src/pages/ProductDetail.tsx`

- No change needed — `aggregateRating` is already conditional on `parseReviewMetafields()` returning non-null. Stays out of the schema until a real review exists. Google's two non-critical warnings remain until then.

### 3. Update the memory note

`mem://integrations/judgeme-reviews` — flip the description from "hidden until count > 0" to "always visible; aggregateRating JSON-LD still gated on real reviews." Update the index entry accordingly.

## Files touched

```text
src/components/products/ProductReviews.tsx   (remove null-return, add empty state)
mem://integrations/judgeme-reviews.md        (update policy note)
mem://index.md                               (update one-line description)
```

## Setup reminder

For the "Write a review" button to actually work, Judge.me must be installed in your Shopify admin (free plan). The widget on the storefront is just the front-end — collection + moderation lives in Judge.me. Once installed, the empty-state CTA becomes functional automatically.
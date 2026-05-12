## Goal

Control the link-preview image (WhatsApp, iMessage, Facebook, X) for `vellvii.com` so it consistently shows the Vellvii full logo instead of a stale cached image.

## Changes

**1. `index.html`** — add explicit Open Graph and Twitter image meta tags pointing to the Vellvii full logo, plus an absolute `og:url` and upgrade the Twitter card type so the image renders larger.

Tags to add inside `<head>`:
- `<meta property="og:image" content="https://vellvii.com/uploads/Vellvii-full-logo-transparent.png">`
- `<meta property="og:image:width" content="1200">`
- `<meta property="og:image:height" content="630">`
- `<meta property="og:image:alt" content="Vellvii - The art of O">`
- `<meta property="og:url" content="https://vellvii.com">`
- `<meta name="twitter:image" content="https://vellvii.com/uploads/Vellvii-full-logo-transparent.png">`
- Change `twitter:card` from `summary` to `summary_large_image`.

**2. No changes to `SEO.tsx`** — its `DEFAULT_IMAGE` already points at the same logo, so per-page React-Helmet meta tags stay consistent. Product/Lux pages keep their own `image` overrides (unchanged).

## Notes for the user

- WhatsApp, iMessage, and Facebook **aggressively cache** link previews. After deploying, the old "PLEASURE: REDEFINED" image may keep appearing for a while. To force a refresh:
  - **Facebook / WhatsApp**: paste `https://vellvii.com` into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again".
  - **iMessage**: previews are cached per-device; clearing or re-sending in a new chat usually picks up the new image.
  - **X / Twitter**: use the [Card Validator](https://cards-dev.twitter.com/validator).

## Out of scope

- Per-page share images (product, Lux, Kickstarter pages) — they keep their existing behavior.
- Generating a new dedicated 1200×630 social card. If you later want a richer share image (logo + tagline on dark background), I can generate one and swap the URL.

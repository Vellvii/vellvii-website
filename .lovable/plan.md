## Goal

Make the /guides hub and individual guides feel more visual, sharpen meta descriptions for SEO, and expose the guides to AI crawlers via `public/llms.txt`.

No changes to functionality, routing, JSON-LD shape, or brand language.

---

## 1. Add imagery (using existing `/public/uploads/` assets — no Shopify fetch needed)

Use brand-owned assets already in the repo. Final mapping:

- **Lux vs DOX** → `/uploads/lux-lifestyle-final-v5.jpg` (hero) + inline `Dox_white_lifestyle1.jpg` next to "What is DOX" section, `lux-bag-lifestyle.jpg` next to "What is Lux" section.
- **DOX Docking System** → `/uploads/dox-interior-labeled.jpg` (hero) + inline `BeigeVDS.png` near VDS section, `DDS_Autocad_sketch_w_descriptions.png` near DDS section.
- **Discreet Storage** → `/uploads/lux-philosophy-lifestyle-v4.png` (hero) + inline `lux-bag-lifestyle-2.jpg` (portable section), `dox_with_toys_1.jpg` (bedroom section).

### Guide cards (`Guides.tsx` + `GuideCard.tsx`)
- Extend `GuideCardProps` with optional `image` + `imageAlt`.
- Card layout: 16:10 image at top (`aspect-[16/10] object-cover`), `loading="lazy"`, soft `border-white/10`, subtle inner gradient overlay on hover. Existing eyebrow / title / excerpt / Read Guide CTA stay below.
- Mobile: full-width image, no overflow.

### Guide pages (`GuideLayout.tsx` + 3 guide files)
- Add optional `heroImage` + `heroImageAlt` props to `GuideLayout`. When present, render a wide hero image (`aspect-[16/9]`, `rounded-lg`, `border border-white/10`) just under the H1 intro and above the body.
- Inline images inside guides via a small `<figure>` pattern (image + optional muted caption in Baskerville italic). No new component needed — just inline JSX inside each guide.
- All images: `loading="lazy"`, descriptive `alt` text using product names ("Vellvii Lux portable fingerprint storage case", "Vellvii DOX bedroom storage and docking hub", etc.). No medical/origin/material claims.

---

## 2. Sharpen SEO meta descriptions

Rewrite each `seoDescription` to be richer (140-158 chars), keyword-led, and to match the visual content. Also tighten `Guides.tsx` hub meta.

- **Hub** — title stays; description becomes:
  "Vellvii Guides on discreet storage, the DOX docking system, Lux vs DOX, and choosing refined intimate wellness products for modern couples."
- **Lux vs DOX** — "Compare Vellvii Lux portable fingerprint-lock storage with the Vellvii DOX bedroom docking hub. See which refined storage piece fits your lifestyle."
- **DOX Docking System** — "How the Vellvii DOX docking system works, including VDS for Vellvii G-Vibe, Evolve and Pulse, and DDS for compatible suction-base products up to 90mm."
- **Discreet Storage** — "Discreet storage for intimate wellness products: privacy at home and on the move with Vellvii Lux portable case and Vellvii DOX bedroom hub."

SEO titles stay (already keyword-led). No changes to canonical, JSON-LD, breadcrumbs, or H1s.

---

## 3. Expose guides to AI crawlers via `public/llms.txt`

Append a new section to the existing file (keep order/voice consistent):

```
## Guides
- Vellvii Guides hub: https://vellvii.com/guides
- Lux vs DOX (storage comparison): https://vellvii.com/guides/lux-vs-dox
- How the Vellvii DOX Docking System Works (VDS and DDS): https://vellvii.com/guides/how-the-vellvii-dox-docking-system-works
- Discreet Storage for Intimate Wellness Products: https://vellvii.com/guides/discreet-storage-for-intimate-wellness-products
```

`robots.txt` is already wide-open (`User-agent: * Allow: /`), so no changes needed there — guides are already crawlable.

---

## Files changed

- `src/components/guides/GuideCard.tsx` — add image slot
- `src/components/guides/GuideLayout.tsx` — add hero image slot
- `src/pages/Guides.tsx` — pass image to each card + tighten hub meta
- `src/pages/guides/GuideLuxVsDox.tsx` — hero + 2 inline figures + new meta
- `src/pages/guides/GuideDoxDockingSystem.tsx` — hero + 2 inline figures + new meta
- `src/pages/guides/GuideDiscreetStorage.tsx` — hero + 2 inline figures + new meta
- `public/llms.txt` — append Guides section

## Guardrails

- No "blog" UI language, no "sex toy", no app-connected/medical/origin claims.
- Lux not described as DOX-compatible. DDS wording stays exact ("90mm, approximately 3.5 inches").
- Images served from `/uploads/` (already on the domain) — no external/Shopify CDN dependency, no layout shift (explicit aspect ratios), all `loading="lazy"`.
- Hyphens only, no em dashes.
- Mobile 375px verified (full-bleed images, no horizontal overflow).

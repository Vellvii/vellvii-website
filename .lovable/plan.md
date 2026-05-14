## Issue

In the refined footer, the small logo sits to the left of the three link columns and reads as orphaned — it's vertically misaligned with the column headings and visually outweighed by the grid next to it.

## Fix

Single-file change: `src/components/prelaunch/PrelaunchFooter.tsx`.

Move the logo out of the link row entirely and let it anchor the footer as a quiet centerpiece between the tagline and the link columns:

1. **Remove** the left column from the top grid. The link columns become a clean full-width 3-column grid (`grid-cols-3`, `gap-8 md:gap-12`), left-aligned on desktop, centered on mobile.
2. **Place the logo** centered directly under "The Art of 'O'" tagline, with the existing hairline accent moved beneath the logo (tagline → logo → hairline). Logo size stays modest (`h-12 sm:h-14`) so it reads as a mark, not a billboard. Keep the soft drop-shadow.
3. **Spacing**: tagline `pt-0`, logo `mt-6`, hairline `mt-5`, link grid `mt-12`.
4. Bottom row (copyright / email / socials) unchanged.

This gives a symmetric editorial composition: centered brand mark on top, structured links below, slim utility row at the bottom — no orphaned element.

## Out of scope

- No copy, link, route, or color changes.
- LuxFooter not touched.

## QA

- Desktop (≥md): centered tagline + logo, three evenly spaced columns below, slim bottom bar.
- Mobile (375px): everything centers, no horizontal scroll, columns remain 3-up but compact.
- All link hrefs identical to current.

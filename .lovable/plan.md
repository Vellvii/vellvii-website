
# Unblock Vellvii SEO indexing

Two blockers are stopping Google from indexing the site:

1. `/` returns `noindex` (the EntryGate) — so the root URL, which carries the strongest ranking signals, is invisible to Google.
2. Even though `vellvii.com` is the only host you use, the homepage Google would try to index there is the noindex gate.

This plan fixes both without weakening the 18+ confirmation.

## 1. Make `/` the real homepage; age gate becomes a modal overlay

- Move `DoxVideoLanding` back to `/`.
- Delete the dedicated `/home` route; redirect `/home` → `/` (301) so any external link already pointing to `/home` still works.
- Build a new `<AgeGateModal />` component mounted once at app root:
  - On first visit, blocks the page with the same visual treatment as today's EntryGate (Vellvii wordmark, italic slogan, Enter button, Leave site button, 18+ disclaimer).
  - Stores confirmation in `localStorage` (`vellvii_age_confirmed`, 30-day TTL). Confirmed visitors never see it again until the flag expires.
  - "Leave site" → `window.history.back()` with `https://www.google.com` fallback (same as today).
  - Modal is rendered *after* the page content in the DOM and shown via CSS overlay — crawlers (which do not run localStorage logic) still see the full indexable homepage HTML.
- Remove `noindex` from `/`. The page becomes `index, follow` with canonical `https://vellvii.com/`.

Industry precedent: Lelo, Maude, Dame, Hims, and every major wine brand use exactly this modal pattern. It is the accepted standard for age-restricted commerce.

## 2. Lock canonical host to vellvii.com

- Update every internal link from `/home` back to `/`:
  `ScrollHeader`, `LuxuryNavDrawer`, `PrelaunchFooter`, `NotFound`, `PrivacyPolicy`, `TermsOfService`, `DoxVideoLanding` SEO canonical, EntryGate post-confirm CTA.
- `public/sitemap.xml`: change `https://vellvii.com/home` → `https://vellvii.com/`.
- `index.html`: `og:url` → `https://vellvii.com/` (already correct, verify).
- Confirm in Lovable Project Settings → Domains that `vellvii.com` is set as **Primary** so `vellvii.lovable.app` 301-redirects to it. No code change needed for that — it is a settings toggle.

## 3. Resubmit and accelerate indexing (after deploy)

- In Google Search Console: resubmit `https://vellvii.com/sitemap.xml`, then "Request indexing" for `/`, `/shop`, `/products/vellvii-dox`, `/products/vellvii-lux`, `/guides/best-sex-toy-storage-box`, `/guides/biometric-lock-box-for-sex-toys`.
- Same in Bing Webmaster Tools (IndexNow is much faster than Google).

## 4. Push the page that already ranks

`/guides/best-sex-toy-storage-box` is at position 48 for "sex toy box" (1,300/mo). The realistic target is "sex toy storage box" (260/mo, KDI 21 — easy). Once indexing is unblocked:

- Update H1, `<title>`, and intro paragraph to lead with the exact phrase "sex toy storage box".
- Add internal links to this guide from `/` and `/shop`.
- Fastest path from #48 to page 1 in 30 to 60 days.

## Files to change

- `src/App.tsx` — `/` → DoxVideoLanding; `/home` → `<Navigate to="/" replace />`.
- `src/pages/EntryGate.tsx` — delete.
- `src/components/AgeGateModal.tsx` — new.
- `src/App.tsx` or `src/main.tsx` — mount `<AgeGateModal />` once at app root.
- `src/pages/DoxVideoLanding.tsx` — `SEO canonical="/"`.
- `src/components/ScrollHeader.tsx`, `LuxuryNavDrawer.tsx`, `PrelaunchFooter.tsx`, `pages/NotFound.tsx`, `pages/PrivacyPolicy.tsx`, `pages/TermsOfService.tsx` — internal `/home` links → `/`.
- `public/sitemap.xml` — `/home` → `/`.
- `mem://routing/homepage-and-parked-routes` — update.

## What this plan does NOT do

- Does not change product copy, branding, legal pages, or backlinks.
- Does not weaken the 18+ gate — every real visitor still confirms before seeing the content.
- Does not touch `vellvii.lovable.app` — it stays inactive as a redirect target only.

## Expected outcome

- Within 1–2 weeks: Google begins indexing `/`, `/shop`, product pages, and guides.
- Within 30–60 days: the storage-box guide moves from #48 toward page 1.
- Authority Score (currently 2/100) will grow only with real backlink outreach — flag separately.

Ready to build on approval.

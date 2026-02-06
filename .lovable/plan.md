

# Simple DOX Video Landing Page

## Summary
Create a minimal, focused landing page that centers entirely on the 60-second DOX explainer video. This becomes the homepage at `/`, while the current multi-section PrelaunchDOX and Apple-inspired DoxLanding pages get parked at separate routes.

---

## The New Page: Simple DOX Video Focus

A clean, distraction-free page with:
- Dark luxury background
- Vellvii logo at top
- Large video player (The_Vellvii_Dox_1.webm) as the centerpiece
- "DOX in 60 Seconds" heading
- Play button overlay before playing
- After video ends: Reserve CTA button + "Discuss" button
- Mobile fullscreen support (auto-enters fullscreen on play)
- Footer with minimal links

---

## Route Changes

| Route | Content | Purpose |
|-------|---------|---------|
| `/` | **New simple DOX video page** | Main homepage - video focus |
| `/showcase` | DoxLanding (7-section Apple) | Parked for future |
| `/prelaunch` | PrelaunchDOX (multi-section) | Parked for future |
| `/landing` | AgeGateLanding (Vivien intro) | Keep as-is |

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/DoxVideoLanding.tsx` | Create | New simple video-focused page |
| `src/App.tsx` | Modify | Update routes as shown above |

---

## Page Layout

```text
┌─────────────────────────────────────┐
│           [Vellvii Logo]            │
├─────────────────────────────────────┤
│                                     │
│        "DOX in 60 Seconds"          │
│                                     │
│   ┌───────────────────────────┐     │
│   │                           │     │
│   │    [▶ Play Button]        │     │
│   │       VIDEO               │     │
│   │                           │     │
│   └───────────────────────────┘     │
│                                     │
│   (After video ends:)               │
│   [Reserve Your DOX] [Discuss]      │
│                                     │
├─────────────────────────────────────┤
│           Footer Links              │
└─────────────────────────────────────┘
```

---

## Technical Details

**Video behavior:**
- Uses existing `The_Vellvii_Dox_1.webm`
- Play button overlay before starting
- Mobile: auto-enters fullscreen on play
- End screen with Reserve CTA linking to prelaunch.com

**Styling:**
- Matches existing luxury dark theme
- Uses existing CSS variables and gradients
- Responsive design (mobile-first)
- Rose-gold accents


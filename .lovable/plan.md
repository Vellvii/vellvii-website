

## Plan: Replace KSV2 Footer CTA with a bold "Follow Us on Kickstarter" banner

### What changes

Replace the entire `KSV2FooterCTA` content with:

1. **Massive headline**: "FOLLOW US ON KICKSTARTER" — full-width, oversized text with the gold/rose gradient and a shimmer animation
2. **Launch date**: "Launch Date: 10 March 2026 · 08:30 USA Time" prominently displayed (note: using 2026 per existing countdown consistency)
3. **Countdown clock**: Reuse `CountdownTimer` targeting `2026-03-10T13:30:00Z` (08:30 EST = 13:30 UTC)
4. **Big CTA button**: Links to `https://www.kickstarter.com/projects/vellvii/vellvii-dox-a-premium-luxury-vault-for-intimacy-and-storage` with pulsing glow animation
5. **Keep**: Founder quote and footer links below

### Technical details

- File: `src/components/ks-v2/KSV2FooterCTA.tsx`
- Update `KICKSTARTER_URL` to the official long-form URL
- Headline uses `text-6xl sm:text-7xl lg:text-9xl` with gradient fill and a CSS shimmer keyframe via inline style
- Countdown target: `2026-03-10T13:30:00Z` (08:30 US Eastern)
- Add a pulsing border/glow effect on the CTA button using `animate-pulse` or a custom shadow animation




# Swap Landing Pages (Without Vivien Chat)

## Summary
Make the DOX-focused prelaunch page (with 60-second video) the main home page at `/`, remove the Vivien chat from it, and park the current Apple-inspired showcase at `/showcase`.

---

## Changes

### 1. Update Routes in App.tsx

| Route | Current | New |
|-------|---------|-----|
| `/` | DoxLanding (7-section showcase) | PrelaunchDOX (DOX video focus) |
| `/showcase` | — | DoxLanding (parked for later) |
| `/prelaunch-dox` | PrelaunchDOX | Keep for backwards compatibility |

### 2. Remove Vivien Chat from PrelaunchDOX

Remove the `<FloatingVivienChat />` component and its import from `src/pages/PrelaunchDOX.tsx`.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Update route: `/` → PrelaunchDOX, add `/showcase` → DoxLanding |
| `src/pages/PrelaunchDOX.tsx` | Remove FloatingVivienChat import and component |

---

## Result

- **Homepage (`/`)**: DOX prelaunch with 60-sec video, problem/solution, features, specs, timeline, FAQ — no chat
- **Parked (`/showcase`)**: Apple-inspired 7-section page saved for future use
- **Backwards compatibility**: `/prelaunch-dox` still works


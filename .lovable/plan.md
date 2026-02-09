

# Update Retail Partner Description

## Summary
Change the "Retail Partner" option text from "Amazon, etc." to something that accurately reflects physical brick and mortar stores that purchase wholesale from Vellvii.

---

## Change Required

| Element | Current Text | New Text |
|---------|-------------|----------|
| Retail Partner subtitle | "Amazon, etc." | "Authorized retailer" |

---

## Implementation

Update line 378 in `src/pages/WarrantyRegister.tsx`:

**Before:**
```tsx
<span className="font-semibold text-light-primary">Retail Partner</span>
<p className="text-xs text-muted-foreground mt-1">Amazon, etc.</p>
```

**After:**
```tsx
<span className="font-semibold text-light-primary">Retail Partner</span>
<p className="text-xs text-muted-foreground mt-1">Authorized retailer</p>
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/WarrantyRegister.tsx` | Update subtitle text on line 378 |


# Unique guide card images on /guides

## The problem

On `/guides`, three images are reused across cards:

- `lux-lifestyle-final-v5.jpg` — used by "Lux vs DOX" and "Biometric Lock Box"
- `Dox_white_lifestyle1.jpg` — used by "Products for Couples" and "Best Sex Toy Storage Box"
- `Dox_black_shelf_close_up.png` — used by "Care for Your Vellvii Products" and "How to Clean and Store Sex Toys"

Each card needs a unique image that visually fits the guide's topic.

## Proposed reassignment (Guides.tsx only)

| Guide | New image | Why it fits |
|---|---|---|
| Lux vs DOX | `lux-lifestyle-final-v5.jpg` (keep) | Lux-led comparison hero |
| DOX Docking System | `dox-interior-labeled.jpg` (keep) | Shows VDS/DDS directly |
| Discreet Storage | `lux-philosophy-lifestyle-v4.png` (keep) | Refined lifestyle context |
| Portable vs Bedroom | `lux-travel-suitcase.png` (keep) | Portable, travel framing |
| Products for Couples | `dox-white-lifestyle-2.jpg` *(new)* | Bedroom shared-interior feel, different from card 8 |
| Care for Vellvii Products | `Dox_black_shelf_close_up.png` (keep) | Care-on-shelf imagery |
| Clean & Store Sex Toys | `dox_with_toys_1.jpg` *(new)* | Literal "storing toys" visual |
| Best Sex Toy Storage Box | `Dox_white_lifestyle1.jpg` (keep) | Storage box hero |
| Biometric Lock Box | `FP_lock_V_lock_close_ups.png` *(new)* | Direct biometric-lock close-up — strongest topical fit |

After the swap, every card uses a distinct file, and the imagery matches each guide's subject more precisely (biometric guide finally shows the fingerprint lock, clean-and-store guide shows toys being stored, couples guide uses a shared-bedroom shot).

## Scope

- File touched: `src/pages/Guides.tsx` only
- No changes to guide pages' internal hero images, copy, SEO, or routing
- `imageAlt` strings updated alongside each new `image` to stay descriptive

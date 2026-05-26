# Goal

Make Vellvii eligible for the rich SERP treatment on the right of your screenshot - brand block with logo, sitelinks, FAQ accordion, and (eventually) review stars - by closing gaps in our structured data.

Important: the **review stars (4.7 / 234 reviews)** in your screenshot only appear once real Judge.me reviews exist. Per the Judge.me memory we intentionally suppress `aggregateRating` until then, so that pixel will stay off until reviews come in. Everything else in the mockup is achievable now.

# What we'll change

## 1. Bake sitewide JSON-LD into `index.html`

Today `Organization` only fires on ~7 routes via Helmet, and non-JS crawlers (LinkedIn, Bing previews, some AI assistants) see nothing. Move it into `index.html` so every URL ships it server-side, alongside a new `WebSite` schema.

- **Organization**
  - `name`, `legalName`, `url`, `logo`
  - `description` (premium wellness one-liner)
  - `email`, `address` (PostalAddress from the Contact memory)
  - `sameAs`: Instagram, TikTok, YouTube, X/Twitter pulled from `src/data/socials.tsx`
  - `contactPoint` (customer service email)
- **WebSite** with `potentialAction` SearchAction pointing at `/shop?q={search_term_string}` - this is what enables the Google sitelinks search box.

## 2. Sitelinks (the Services / About / Contact / Reviews block)

Google chooses sitelinks automatically from your nav and internal-link structure - they're not declared in schema. To earn them we ensure:
- Clear, stable top-level routes already present (`/shop`, `/guides`, `/contact`, `/warranty`, `/collections/...`)
- A `BreadcrumbList` on every category and PDP (already done)
- Add a small **SiteNavigationElement** JSON-LD listing primary nav links - this nudges Google toward the right candidates.

## 3. Per-route schema cleanup

- Remove `organizationData` from the 7 pages currently passing it (Landing, DoxLanding, DoxVideoLanding, Contact, Guides, CollectionDoxCompatible, ProductDetail) since Organization is now sitewide. Avoids duplicate emission.
- In `SEO.tsx`, default `Product.offers.url` to the canonical PDP URL when caller doesn't pass one (fixes Merchant validation).
- Add `Product.gtin`/`mpn` slots in the `productData` interface (optional, populated when Shopify returns them) - Google prefers products with identifiers.

## 4. FAQ accordion in SERP (the expandable Q&A)

`FAQPage` schema already fires on guides and HomeFAQ. To increase the odds Google surfaces it on the **brand SERP** (right card), add a small `FAQPage` block to the homepage covering the 3-4 most-asked brand questions ("What is Vellvii?", "Where does Vellvii ship?", "Is Vellvii discreet?", "What's the warranty?"). Source answers from existing memory + Warranty/Terms pages.

## 5. Brand entity strengthening (for the Knowledge Panel)

The right card in your screenshot is essentially a Knowledge Panel preview. To help Google build the entity:
- `Organization.foundingDate`, `founders` (if known)
- `Organization.slogan` - "The Art of 'O'" (from brand mantra memory)
- `Organization.brand` array listing product lines (DOX, Lux, G-Vibe, Evolve, Pulse)

## 6. Validation

After the changes, run a Rich Results test on:
- `https://vellvii.com/` (Organization, WebSite, FAQ)
- `https://vellvii.com/products/vellvii-dox` (Product, Breadcrumb)
- `https://vellvii.com/guides/lux-vs-dox` (Article, FAQ, Breadcrumb)

I'll do this via the Google Search Console connector + a manual `curl` against the Rich Results endpoint and report what passes.

# Files touched

- `index.html` - add Organization + WebSite + SiteNavigation JSON-LD blocks
- `src/components/SEO.tsx` - default Offer URL, add gtin/mpn slots, drop the always-on Organization branch (still keep the prop available for safety but stop using it)
- `src/pages/Landing.tsx`, `DoxLanding.tsx`, `DoxVideoLanding.tsx`, `Contact.tsx`, `Guides.tsx`, `CollectionDoxCompatible.tsx`, `ProductDetail.tsx` - remove `organizationData` prop
- `src/components/home/HomeFAQ.tsx` (or homepage SEO call) - ensure brand-level FAQ JSON-LD is emitted on `/`
- `src/data/socials.tsx` - read for sameAs URLs (no change)

# Out of scope

- Review stars: blocked until Judge.me has real reviews. Memory rule stays.
- LocalBusiness/Store schema: skipping unless you want a physical-location signal (you don't operate a storefront).
- SSR: the static `index.html` block is enough for non-JS crawlers; we're not adding SSR.

# What you'll actually see

Within 1-3 weeks of Google re-crawling:
- Brand subtitle ("luxury intimate wellness products") richer and pulled from our description, not improvised
- Sitelinks row (Shop / Guides / Contact / Warranty)
- Expandable FAQ rows directly under the brand result
- Eventually stars, once Judge.me has reviews

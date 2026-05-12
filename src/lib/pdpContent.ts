/**
 * Per-PDP content map for the five canonical Vellvii products.
 *
 * RULE: Only confirmed data lives here. Unknown spec rows are omitted entirely
 * (no placeholder/speculative values). Fallbacks below are used when a product
 * has no product-specific entry yet.
 */

export type CanonicalHandle =
  | "vellvii-dox"
  | "vellvii-lux"
  | "vellvii-g-vibe"
  | "vellvii-evolve"
  | "vellvii-pulse";

export const CANONICAL_HANDLES: CanonicalHandle[] = [
  "vellvii-dox",
  "vellvii-lux",
  "vellvii-g-vibe",
  "vellvii-evolve",
  "vellvii-pulse",
];

export interface KeyBenefit {
  /** Lucide icon name as a string - resolved in the component */
  icon: "ShieldCheck" | "Sparkles" | "Lock" | "Heart" | "Gem" | "Leaf" | "Wand2" | "Package";
  label: string;
  copy: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PdpContent {
  /** Short premium one-liner shown above benefits */
  tagline?: string;
  keyBenefits?: KeyBenefit[];
  /** Only confirmed spec rows. Omit unknowns. */
  productDetails?: SpecRow[];
  /** Product-specific care - falls back to FALLBACK_CARE if undefined */
  careStorage?: string[];
  /** Product-specific FAQs - falls back to FALLBACK_FAQS if undefined */
  faqs?: FaqItem[];
}

/** Safe, non-promissory fallback FAQs. */
export const FALLBACK_FAQS: FaqItem[] = [
  {
    question: "What is this product designed for?",
    answer:
      "Each Vellvii product is part of the Pleasure Collection - a refined ecosystem designed for modern couples and individuals who value discreet design and premium experience.",
  },
  {
    question: "How should I care for this product?",
    answer:
      "Follow the care instructions included with your product. Store in a clean, dry place and keep away from extreme heat and direct sunlight.",
  },
  {
    question: "Where can I find warranty information?",
    answer:
      "Full warranty details, registration, and coverage terms are available on our warranty page at /warranty.",
  },
  {
    question: "How do I choose the right Vellvii product?",
    answer:
      "Browse the full Pleasure Collection on the shop page to compare products and find the right fit for your space and lifestyle.",
  },
  {
    question: "Where can I get support?",
    answer:
      "Reach out to the Vellvii team through the contact details on our site - we are always available to help.",
  },
];

/** Safe, non-promissory fallback Care & Storage guidance. */
export const FALLBACK_CARE: string[] = [
  "Follow the care instructions included with your product.",
  "Store in a clean, dry place.",
  "Keep away from extreme heat and direct sunlight.",
  "Use only compatible accessories and storage solutions.",
  "Visit /warranty for coverage details.",
];

export const PDP_CONTENT: Record<CanonicalHandle, PdpContent> = {
  "vellvii-dox": {
    tagline:
      "A refined storage companion built around discretion and design.",
    keyBenefits: [
      { icon: "ShieldCheck", label: "Discreet design", copy: "Furniture-grade form that disappears into the modern bedroom." },
      { icon: "Lock", label: "Refined storage", copy: "Considered interior layout for a calm, organized ritual." },
      { icon: "Sparkles", label: "Premium materials", copy: "Crafted finishes selected for quiet luxury and longevity." },
      { icon: "Package", label: "Designed for modern couples", copy: "A shared object built around intimacy and respect for space." },
    ],
  },
  "vellvii-lux": {
    tagline:
      "Furniture-grade biometric storage for the modern bedroom.",
    keyBenefits: [
      { icon: "Lock", label: "Biometric privacy", copy: "Fingerprint-secured access keeps your collection truly yours." },
      { icon: "Gem", label: "Designer leather", copy: "A material story built around quiet luxury and craftsmanship." },
      { icon: "ShieldCheck", label: "Built to last", copy: "Precision hardware engineered for daily, lifelong use." },
      { icon: "Sparkles", label: "Limited edition", copy: "A strictly limited 1,500-unit USA launch run." },
    ],
    productDetails: [
      { label: "Materials", value: "Designer leather exterior, precision-machined metal hardware" },
      { label: "Security", value: "Fingerprint biometric lock" },
      { label: "Origin", value: "Assembled and fulfilled in the USA" },
    ],
  },
  "vellvii-g-vibe": {
    tagline: "A refined addition to the Vellvii Pleasure Collection.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "Considered ergonomics for shared, intentional moments." },
      { icon: "Sparkles", label: "Premium experience", copy: "A refined object you will actually want to keep on display." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
  },
  "vellvii-evolve": {
    tagline: "Discreet design, refined for everyday intimacy.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "An object built around connection, not novelty." },
      { icon: "Sparkles", label: "Premium experience", copy: "Quiet luxury in every detail." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
  },
  "vellvii-pulse": {
    tagline: "Part of the Vellvii Pleasure Collection - designed with intention.",
    keyBenefits: [
      { icon: "Sparkles", label: "Premium experience", copy: "A considered object with a refined silhouette." },
      { icon: "Heart", label: "Designed for modern couples", copy: "Built around intimacy and shared discretion." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
  },
};

export const getPdpContent = (handle: string | undefined): PdpContent => {
  if (!handle) return {};
  return PDP_CONTENT[handle as CanonicalHandle] ?? {};
};

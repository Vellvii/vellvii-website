// GA4 + Google Ads ecommerce tracking helpers.
// GA4 (G-CGKDHGZFBJ) and Google Ads (AW-18143343715) are loaded in index.html.
// The actual `purchase` event fires on Shopify's side via the Google & YouTube
// Shopify app — do not duplicate it here.

// Google Ads conversion labels. Fill in once available in Google Ads UI.
// Format expected by gtag: 'AW-18143343715/<LABEL>'.
const GOOGLE_ADS_ID = "AW-18143343715";
const GOOGLE_ADS_ADD_TO_CART_LABEL: string | null = null; // e.g. 'AbC-D_efG12hIjKlMnO'

type GtagFn = (...args: unknown[]) => void;

const getGtag = (): GtagFn | null => {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
};

export interface GA4Item {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
  currency?: string;
}

export const track = (event: string, params: Record<string, unknown> = {}) => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", event, params);
};

export const trackViewItem = (item: GA4Item) => {
  track("view_item", {
    currency: item.currency || "USD",
    value: item.price * item.quantity,
    items: [item],
  });
};

export const trackAddToCart = (item: GA4Item) => {
  const value = item.price * item.quantity;
  const currency = item.currency || "USD";
  track("add_to_cart", { currency, value, items: [item] });

  // Google Ads add-to-cart conversion (only fires once label is set).
  if (GOOGLE_ADS_ADD_TO_CART_LABEL) {
    track("conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_ADD_TO_CART_LABEL}`,
      value,
      currency,
    });
  }
};

export const trackRemoveFromCart = (item: GA4Item) => {
  track("remove_from_cart", {
    currency: item.currency || "USD",
    value: item.price * item.quantity,
    items: [item],
  });
};

export const trackBeginCheckout = (
  items: GA4Item[],
  value: number,
  currency: string = "USD"
) => {
  track("begin_checkout", { currency, value, items });
};

// Read GA4 client_id from the _ga cookie so we can stitch the session across
// the Shopify checkout domain hop.
export const getGAClientId = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/_ga=GA\d\.\d\.([\d.]+)/);
  return match ? match[1] : null;
};

// Append GA client_id + UTM params to the Shopify checkout URL so Shopify-side
// GA4 / Google Ads can stitch attribution back to the originating session.
export const appendCheckoutAttribution = (checkoutUrl: string): string => {
  try {
    const url = new URL(checkoutUrl);
    const clientId = getGAClientId();
    if (clientId) url.searchParams.set("_ga", clientId);
    if (typeof window !== "undefined") {
      const here = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
        const v = here.get(k);
        if (v) url.searchParams.set(k, v);
      });
    }
    return url.toString();
  } catch {
    return checkoutUrl;
  }
};

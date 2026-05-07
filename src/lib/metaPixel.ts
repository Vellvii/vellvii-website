// Meta Pixel standard event helpers.
// Base pixel snippet is loaded in index.html and fires the initial PageView.
// These helpers are no-ops when window.fbq is not defined (e.g. during SSR
// or when an ad blocker prevents the script from loading).

type FbqFn = (...args: unknown[]) => void;

const getFbq = (): FbqFn | null => {
  if (typeof window === "undefined") return null;
  const f = (window as unknown as { fbq?: FbqFn }).fbq;
  return typeof f === "function" ? f : null;
};

const newEventId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    try {
      return crypto.randomUUID();
    } catch {
      // fall through
    }
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const track = (
  event: string,
  params: Record<string, unknown> = {},
  eventID?: string,
): string => {
  const fbq = getFbq();
  const id = eventID || newEventId();
  if (!fbq) return id;
  fbq("track", event, params, { eventID: id });
  return id;
};

export interface PixelContent {
  id: string;
  quantity: number;
  item_price?: number;
}

export const pixelPageView = (): string => {
  const id = newEventId();
  const fbq = getFbq();
  if (fbq) fbq("track", "PageView", {}, { eventID: id });
  return id;
};

export const pixelViewContent = (params: {
  content_ids: string[];
  content_name?: string;
  content_type?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}): string =>
  track("ViewContent", {
    content_type: "product",
    ...params,
  });

export const pixelAddToCart = (params: {
  content_ids: string[];
  content_name?: string;
  contents?: PixelContent[];
  value?: number;
  currency?: string;
}): string =>
  track("AddToCart", {
    content_type: "product",
    ...params,
  });

export const pixelInitiateCheckout = (params: {
  content_ids: string[];
  contents: PixelContent[];
  num_items: number;
  value: number;
  currency: string;
}): string =>
  track("InitiateCheckout", {
    content_type: "product",
    ...params,
  });

export const pixelLead = (params: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
} = {}): string => track("Lead", params);

export const pixelSubscribe = (params: {
  value?: number;
  currency?: string;
  predicted_ltv?: number;
} = {}): string => track("Subscribe", params);

export const pixelCompleteRegistration = (params: {
  content_name?: string;
  status?: string;
  value?: number;
  currency?: string;
} = {}): string => track("CompleteRegistration", params);

export const pixelContact = (): string => track("Contact", {});

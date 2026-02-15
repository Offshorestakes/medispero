// GA4 + TikTok Analytics utility with ecommerce event tracking
// Includes both browser pixel (ttq) and server-side Events API

import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    ttq: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      identify: (params: Record<string, unknown>) => void;
    };
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag === 'function') {
    // Attach stored UTM params to every event for attribution
    let utmData: Record<string, string> = {};
    try {
      const stored = sessionStorage.getItem('medispero_utm_params');
      if (stored) utmData = JSON.parse(stored);
    } catch { /* ignore */ }
    window.gtag('event', eventName, { ...utmData, ...params });
  }
};

const ttqTrack = (event: string, params?: Record<string, unknown>) => {
  if (typeof window.ttq?.track === 'function') {
    // Generate event_id for deduplication (TikTok requires this)
    const eventId = crypto.randomUUID();
    window.ttq.track(event, { ...params, event_id: eventId });
    return eventId;
  }
  return crypto.randomUUID();
};

const BRAND = 'Medi Spero';
const DEFAULT_CATEGORY = 'CBD & Hemp Products';

// Server-side Events API call (fire-and-forget, non-blocking)
const ttqServerTrack = (event: string, properties: Record<string, unknown>, user?: Record<string, unknown>) => {
  supabase.functions.invoke('tiktok-events', {
    body: {
      event,
      properties: { ...properties, page_url: window.location.href },
      user,
    },
  }).catch((err) => console.warn('TikTok Events API error:', err));
};

export const trackAddToCart = (item: {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  category?: string;
}) => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [{
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category || 'CBD',
    }],
  });
  const ttqParams = {
    content_id: item.product_id,
    content_name: item.product_name,
    content_type: 'product',
    content_category: item.category || DEFAULT_CATEGORY,
    brand: BRAND,
    description: `${item.product_name} - ${item.category || 'CBD'}`,
    quantity: item.quantity,
    price: item.price,
    value: item.price * item.quantity,
    currency: 'USD',
  };
  const eventId = ttqTrack('AddToCart', ttqParams);
  ttqServerTrack('AddToCart', { ...ttqParams, event_id: eventId });
};

export const trackRemoveFromCart = (item: {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}) => {
  trackEvent('remove_from_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [{
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    }],
  });
};

export const trackBeginCheckout = (items: {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}[], total: number) => {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: total,
    items: items.map(item => ({
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
  const ttqParams = {
    content_id: items[0]?.product_id || '',
    content_name: items[0]?.product_name || '',
    content_type: 'product',
    contents: items.map(item => ({
      content_id: item.product_id,
      content_name: item.product_name,
      content_type: 'product',
      brand: BRAND,
      quantity: item.quantity,
      price: item.price,
    })),
    content_category: DEFAULT_CATEGORY,
    brand: BRAND,
    description: `Checkout with ${items.length} item(s)`,
    value: total,
    currency: 'USD',
  };
  const eventId = ttqTrack('InitiateCheckout', ttqParams);
  ttqServerTrack('InitiateCheckout', { ...ttqParams, event_id: eventId });
};

export const trackPurchase = (orderId: string, items: {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}[], total: number, shipping: number, tax: number) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'USD',
    value: total,
    shipping,
    tax,
    items: items.map(item => ({
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
  const ttqParams = {
    content_id: items[0]?.product_id || '',
    content_name: items[0]?.product_name || '',
    content_type: 'product',
    contents: items.map(item => ({
      content_id: item.product_id,
      content_name: item.product_name,
      content_type: 'product',
      brand: BRAND,
      quantity: item.quantity,
      price: item.price,
    })),
    content_category: DEFAULT_CATEGORY,
    brand: BRAND,
    description: `Order ${orderId}`,
    value: total,
    currency: 'USD',
  };
  // Fire both PlaceAnOrder and Purchase for TikTok funnel
  const eventId1 = ttqTrack('PlaceAnOrder', ttqParams);
  ttqServerTrack('PlaceAnOrder', { ...ttqParams, event_id: eventId1 });
  const eventId2 = ttqTrack('CompletePayment', ttqParams);
  ttqServerTrack('CompletePayment', { ...ttqParams, event_id: eventId2 });
};

export const trackViewItem = (item: {
  product_id: string;
  product_name: string;
  price: number;
  category?: string;
}) => {
  trackEvent('view_item', {
    currency: 'USD',
    value: item.price,
    items: [{
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price,
      item_category: item.category || 'CBD',
    }],
  });
  const ttqParams = {
    content_id: item.product_id,
    content_name: item.product_name,
    content_type: 'product',
    content_category: item.category || DEFAULT_CATEGORY,
    brand: BRAND,
    description: `${item.product_name} - Premium ${item.category || 'CBD'} Product`,
    price: item.price,
    value: item.price,
    currency: 'USD',
  };
  const eventId = ttqTrack('ViewContent', ttqParams);
  ttqServerTrack('ViewContent', { ...ttqParams, event_id: eventId });
};

export const trackSubscribe = (email?: string) => {
  trackEvent('newsletter_signup');
  const ttqParams = {
    content_id: 'newsletter',
    content_name: 'Newsletter Subscription',
    content_type: 'product',
    content_category: DEFAULT_CATEGORY,
    brand: BRAND,
    description: 'Newsletter subscription signup',
    currency: 'USD',
  };
  const eventId = ttqTrack('Subscribe', ttqParams);
  ttqServerTrack('Subscribe', { ...ttqParams, event_id: eventId }, email ? { email } : undefined);
};

// GA4 Analytics utility with ecommerce event tracking

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
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
};

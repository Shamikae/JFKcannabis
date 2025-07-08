// Since we can't use react-ga4 directly, we'll create a mock implementation
const ReactGA = {
  initialized: false,
  
  initialize: (trackingId: string) => {
    if (!trackingId) {
      console.warn('Google Analytics tracking ID is missing');
      return;
    }
    
    console.log(`Initializing Google Analytics with tracking ID: ${trackingId}`);
    
    // In a real implementation, this would initialize GA
    // For now, we'll just set a flag
    ReactGA.initialized = true;
    
    // Add Google Analytics script to the page
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', trackingId);
  },
  
  send: (params: { hitType: string; page: string }) => {
    if (!ReactGA.initialized) {
      console.warn('Google Analytics not initialized');
      return;
    }
    
    console.log(`GA pageview: ${params.page}`);
    window.gtag && window.gtag('event', 'page_view', {
      page_path: params.page
    });
  },
  
  event: (params: { category: string; action: string; label?: string; value?: number }) => {
    if (!ReactGA.initialized) {
      console.warn('Google Analytics not initialized');
      return;
    }
    
    console.log(`GA event: ${params.category} / ${params.action} / ${params.label || ''}`);
    window.gtag && window.gtag('event', params.action, {
      event_category: params.category,
      event_label: params.label,
      value: params.value
    });
  },
  
  gtag: (command: string, ...args: any[]) => {
    if (!ReactGA.initialized) {
      console.warn('Google Analytics not initialized');
      return;
    }
    
    window.gtag && window.gtag(command, ...args);
  }
};

// Add gtag to window type
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (trackingId: string) => {
  if (!trackingId) {
    console.warn('Google Analytics tracking ID is missing');
    return;
  }
  
  ReactGA.initialize(trackingId);
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};

// Track user engagement
export const trackEngagement = (action: string, label?: string, value?: number) => {
  trackEvent('Engagement', action, label, value);
};

// Track ecommerce events
export const trackAddToCart = (product: any) => {
  ReactGA.event({
    category: 'Ecommerce',
    action: 'Add to Cart',
    label: product.name,
    value: product.price
  });
  
  // Enhanced ecommerce tracking
  ReactGA.gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      price: product.price,
      quantity: 1
    }]
  });
};

export const trackRemoveFromCart = (product: any) => {
  ReactGA.event({
    category: 'Ecommerce',
    action: 'Remove from Cart',
    label: product.name,
    value: product.price
  });
  
  // Enhanced ecommerce tracking
  ReactGA.gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      price: product.price,
      quantity: 1
    }]
  });
};

export const trackBeginCheckout = (cart: any) => {
  const total = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  ReactGA.event({
    category: 'Ecommerce',
    action: 'Begin Checkout',
    value: total
  });
  
  // Enhanced ecommerce tracking
  ReactGA.gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: total,
    items: cart.items.map((item: any) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: item.brand,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

export const trackPurchase = (order: any) => {
  ReactGA.event({
    category: 'Ecommerce',
    action: 'Purchase',
    label: order.id,
    value: order.total
  });
  
  // Enhanced ecommerce tracking
  ReactGA.gtag('event', 'purchase', {
    transaction_id: order.id,
    value: order.total,
    currency: 'USD',
    tax: order.tax,
    shipping: order.deliveryFee,
    items: order.items.map((item: any) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: item.brand,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

// Track user demographics
export const setUserProperties = (properties: any) => {
  ReactGA.gtag('set', 'user_properties', properties);
};

// Get analytics data (this would typically be done server-side)
export const getAnalyticsData = async () => {
  // In a real implementation, this would call your backend API
  // which would use the Google Analytics Reporting API
  
  // For demo purposes, return mock data
  return {
    visitors: {
      total: 12450,
      newUsers: 8765,
      returningUsers: 3685,
      avgSessionDuration: 245, // seconds
      bounceRate: 32.5, // percentage
    },
    traffic: {
      sources: [
        { source: 'Direct', sessions: 4560, percentage: 36.6 },
        { source: 'Organic Search', sessions: 3210, percentage: 25.8 },
        { source: 'Social', sessions: 2340, percentage: 18.8 },
        { source: 'Referral', sessions: 1560, percentage: 12.5 },
        { source: 'Email', sessions: 780, percentage: 6.3 }
      ],
      devices: [
        { device: 'Mobile', sessions: 7470, percentage: 60 },
        { device: 'Desktop', sessions: 3735, percentage: 30 },
        { device: 'Tablet', sessions: 1245, percentage: 10 }
      ],
      locations: [
        { location: 'Queens, NY', sessions: 5602, percentage: 45 },
        { location: 'Nassau County, NY', sessions: 2490, percentage: 20 },
        { location: 'Brooklyn, NY', sessions: 1868, percentage: 15 },
        { location: 'Manhattan, NY', sessions: 1245, percentage: 10 },
        { location: 'Other', sessions: 1245, percentage: 10 }
      ]
    },
    ecommerce: {
      revenue: 127450.90,
      transactions: 1247,
      avgOrderValue: 102.21,
      conversionRate: 3.2,
      topProducts: [
        { id: 'f1', name: 'Blue Dream', revenue: 12450, units: 245 },
        { id: 'e1', name: 'Cosmic Gummies', revenue: 9870, units: 423 },
        { id: 'v1', name: 'Northern Lights Cart', revenue: 8760, units: 189 },
        { id: 'pr1', name: 'Gelato Pre-Roll 5-Pack', revenue: 7650, units: 134 },
        { id: 't1', name: 'CBD Recovery Balm', revenue: 5430, units: 121 }
      ],
      topCategories: [
        { category: 'Flower', revenue: 45670, percentage: 35.8 },
        { category: 'Vapes', revenue: 32560, percentage: 25.5 },
        { category: 'Edibles', revenue: 25490, percentage: 20 },
        { category: 'Pre-Rolls', revenue: 15670, percentage: 12.3 },
        { category: 'Concentrates', revenue: 8060, percentage: 6.4 }
      ]
    },
    userBehavior: {
      topPages: [
        { path: '/', pageviews: 15670, avgTimeOnPage: 65 },
        { path: '/shop', pageviews: 12450, avgTimeOnPage: 120 },
        { path: '/shop/flowers', pageviews: 8760, avgTimeOnPage: 95 },
        { path: '/shop/vapes', pageviews: 6540, avgTimeOnPage: 85 },
        { path: '/delivery', pageviews: 5430, avgTimeOnPage: 110 }
      ],
      searchTerms: [
        { term: 'blue dream', count: 345 },
        { term: 'indica', count: 290 },
        { term: 'edibles', count: 245 },
        { term: 'vape', count: 210 },
        { term: 'pre roll', count: 180 }
      ],
      exitPages: [
        { path: '/checkout', exits: 890 },
        { path: '/cart', exits: 670 },
        { path: '/product/f1', exits: 450 },
        { path: '/shop', exits: 340 },
        { path: '/', exits: 290 }
      ]
    }
  };
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackEngagement,
  trackAddToCart,
  trackRemoveFromCart,
  trackBeginCheckout,
  trackPurchase,
  setUserProperties,
  getAnalyticsData
};
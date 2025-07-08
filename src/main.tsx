import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { initGA, trackPageView } from './services/googleAnalytics';
import { registerSW } from 'virtual:pwa-register';

// Initialize Google Analytics with tracking ID from environment variable
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';
initGA(GA_TRACKING_ID);

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

// Component to track page views
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  
  return null;
};

// Report web vitals
const reportWebVitals = async () => {
  if (import.meta.env.PROD) {
    const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');
    
    getCLS(metric => {
      console.log('CLS:', metric.value);
      // In a real app, send to analytics
    });
    
    getFID(metric => {
      console.log('FID:', metric.value);
      // In a real app, send to analytics
    });
    
    getLCP(metric => {
      console.log('LCP:', metric.value);
      // In a real app, send to analytics
    });
    
    getFCP(metric => {
      console.log('FCP:', metric.value);
      // In a real app, send to analytics
    });
    
    getTTFB(metric => {
      console.log('TTFB:', metric.value);
      // In a real app, send to analytics
    });
  }
};

// Report web vitals
reportWebVitals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <PageTracker />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
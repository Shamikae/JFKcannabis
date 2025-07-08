import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Components
import AgeVerification from './components/AgeVerification';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/utils/ScrollToTop';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './components/admin/AdminLogin';
import UnauthorizedPage from './components/admin/UnauthorizedPage';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const SalesPage = lazy(() => import('./pages/SalesPage'));
const Delivery = lazy(() => import('./pages/Delivery'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const BrandDetail = lazy(() => import('./pages/BrandDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CafePage = lazy(() => import('./pages/CafePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const MembershipsPage = lazy(() => import('./pages/MembershipsPage'));
const SubscriptionBox = lazy(() => import('./components/subscription/SubscriptionBox'));
const PreOrderPage = lazy(() => import('./pages/PreOrderPage'));
const DriverSignup = lazy(() => import('./pages/DriverSignup'));
const BirthdayPackages = lazy(() => import('./pages/BirthdayPackages'));
const BulkOrders = lazy(() => import('./pages/BulkOrders'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
  </div>
);

function App() {
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('ageVerified') === 'true';
  });

  const location = useLocation();

  useEffect(() => {
    if (isVerified) {
      localStorage.setItem('ageVerified', 'true');
    }
  }, [isVerified]);

  // Reset scroll position on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Skip age verification for admin routes and driver signup
  const skipVerification = location.pathname.startsWith('/admin') || location.pathname === '/driver/signup';
  
  if (!isVerified && !skipVerification) {
    return <AgeVerification onVerify={() => setIsVerified(true)} />;
  }

  return (
    <>
      <Helmet>
        <title>JFK Cannabis | Premium Cannabis Dispensary Queens NY</title>
        <meta name="description" content="JFK Cannabis dispensary at 175-01 Rockaway Blvd, Queens NY. Premium cannabis delivery to JFK Airport, Nassau County, Long Island." />
        <meta name="theme-color" content="#396842" />
      </Helmet>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Driver Signup */}
          <Route path="/driver/signup" element={<DriverSignup />} />
          
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:category" element={<Shop />} />
            <Route path="shop/:category/:subcategory" element={<Shop />} />
            <Route path="shop/pre-order" element={<PreOrderPage />} />
            <Route path="sale" element={<SalesPage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="brands/:brandName" element={<BrandDetail />} />
            <Route path="memberships" element={<MembershipsPage />} />
            <Route path="subscriptions" element={<SubscriptionBox />} />
            <Route path="cafe" element={<CafePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account/*" element={<AccountPage />} />
            <Route path="birthday-packages" element={<BirthdayPackages />} />
            <Route path="bulk-orders" element={<BulkOrders />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
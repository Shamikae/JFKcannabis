import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileMenu from '../MobileMenu';
import LanguageSelector from '../accessibility/LanguageSelector';
import AccessibilityMenu from '../accessibility/AccessibilityMenu';
import ScreenReaderAnnouncer from '../accessibility/ScreenReaderAnnouncer';
import SkipToContent from '../accessibility/SkipToContent';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipToContent />
      <ScreenReaderAnnouncer />
      <Navbar />
      <MobileMenu />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <AccessibilityMenu />
      <LanguageSelector position="bottom-left" />
    </div>
  );
};

export default Layout;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScreenReaderAnnouncer: React.FC = () => {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');

  // Update announcement when route changes
  useEffect(() => {
    // Get the page title based on the current route
    const getPageTitle = () => {
      const path = location.pathname;
      
      if (path === '/') return 'Home';
      
      // Remove leading slash and split by remaining slashes
      const segments = path.substring(1).split('/');
      
      // Capitalize first letter and replace hyphens with spaces
      if (segments.length > 0) {
        const mainSegment = segments[0];
        return mainSegment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      return 'Page';
    };
    
    const pageTitle = getPageTitle();
    setAnnouncement(`Navigated to ${pageTitle} page`);
  }, [location]);

  return (
    <div 
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};

export default ScreenReaderAnnouncer;
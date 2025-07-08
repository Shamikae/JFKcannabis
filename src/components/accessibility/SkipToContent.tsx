import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary-600 focus:text-white"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
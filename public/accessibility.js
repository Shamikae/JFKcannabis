// Accessibility enhancements for JFK Cannabis website

// Apply font size classes
function applyFontSize(size) {
  document.documentElement.classList.remove('text-normal', 'text-large', 'text-x-large');
  document.documentElement.classList.add(`text-${size}`);
  
  // Update CSS variables for font sizes
  if (size === 'large') {
    document.documentElement.style.setProperty('--base-font-size', '1.125rem');
  } else if (size === 'x-large') {
    document.documentElement.style.setProperty('--base-font-size', '1.25rem');
  } else {
    document.documentElement.style.setProperty('--base-font-size', '1rem');
  }
}

// Apply high contrast mode
function applyContrast(isHighContrast) {
  if (isHighContrast) {
    document.documentElement.classList.add('high-contrast');
    
    // Update CSS variables for high contrast
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--bg-color', '#000000');
    document.documentElement.style.setProperty('--link-color', '#ffff00');
  } else {
    document.documentElement.classList.remove('high-contrast');
    
    // Reset CSS variables
    document.documentElement.style.removeProperty('--text-color');
    document.documentElement.style.removeProperty('--bg-color');
    document.documentElement.style.removeProperty('--link-color');
  }
}

// Apply reduced motion
function applyReducedMotion(isReduced) {
  if (isReduced) {
    document.documentElement.classList.add('reduced-motion');
    
    // Add a style element with reduced motion styles
    const style = document.createElement('style');
    style.id = 'reduced-motion-styles';
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.001s !important;
        transition-duration: 0.001s !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    document.documentElement.classList.remove('reduced-motion');
    
    // Remove the style element if it exists
    const style = document.getElementById('reduced-motion-styles');
    if (style) {
      style.remove();
    }
  }
}

// Apply dyslexic font
function applyDyslexicFont(useDyslexicFont) {
  if (useDyslexicFont) {
    document.documentElement.classList.add('dyslexic-font');
    
    // Load OpenDyslexic font if not already loaded
    if (!document.getElementById('dyslexic-font-stylesheet')) {
      const link = document.createElement('link');
      link.id = 'dyslexic-font-stylesheet';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/dist/opendyslexic/opendyslexic.css';
      document.head.appendChild(link);
      
      // Apply the font to the body
      document.body.style.fontFamily = 'OpenDyslexic, sans-serif';
    }
  } else {
    document.documentElement.classList.remove('dyslexic-font');
    document.body.style.fontFamily = '';
  }
}

// Load settings from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedSettings = localStorage.getItem('accessibilitySettings');
  
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    
    // Apply saved settings
    applyFontSize(settings.fontSize || 'normal');
    applyContrast(settings.contrast === 'high');
    applyReducedMotion(settings.reducedMotion || false);
    applyDyslexicFont(settings.dyslexicFont || false);
  }
  
  // Check for system preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    applyReducedMotion(true);
  }
  
  const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
  if (prefersHighContrast) {
    applyContrast(true);
  }
});

// Add keyboard navigation enhancements
document.addEventListener('keydown', function(e) {
  // Skip to main content with Alt+1
  if (e.altKey && e.key === '1') {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  }
  
  // Skip to navigation with Alt+2
  if (e.altKey && e.key === '2') {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.focus();
      nav.scrollIntoView();
    }
  }
});
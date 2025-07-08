import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

interface LanguageSelectorProps {
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(languages[0]);

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    
    // In a real implementation, this would change the language throughout the app
    // For now, we'll just log the change
    console.log(`Language changed to ${language.name}`);
    
    // This would typically involve:
    // 1. Setting a language preference in localStorage
    // 2. Loading the appropriate translation files
    // 3. Updating the HTML lang attribute
    document.documentElement.lang = language.code;
    
    // Example of how you might handle RTL languages
    if (language.code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-12 right-0';
      case 'bottom-left':
        return 'bottom-12 left-0';
      case 'top-left':
        return 'top-12 left-0';
      case 'bottom-right':
      default:
        return 'bottom-12 right-0';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-5 w-5 text-neutral-700" />
        <span className="ml-2 text-sm font-medium hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div 
          className={`absolute ${getPositionClasses()} z-50 w-48 bg-white rounded-lg shadow-lg py-1 mt-1`}
          role="listbox"
          aria-labelledby="language-selector"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 flex items-center ${
                currentLanguage.code === language.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700'
              }`}
              onClick={() => handleLanguageChange(language)}
              role="option"
              aria-selected={currentLanguage.code === language.code}
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
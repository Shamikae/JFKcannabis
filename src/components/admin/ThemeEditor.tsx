import React, { useState } from 'react';
import { Save, Undo, Redo, Palette, Check, Layers, Layout, Grid, Columns, Type, ArrowRight } from 'lucide-react';

interface ThemeEditorProps {
  onSave: (themeSettings: any) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout'>('colors');
  const [primaryColor, setPrimaryColor] = useState('#396842');
  const [secondaryColor, setSecondaryColor] = useState('#7e41ff');
  const [accentColor, setAccentColor] = useState('#ed7d14');
  const [fontPrimary, setFontPrimary] = useState('Inter');
  const [fontHeadings, setFontHeadings] = useState('Montserrat');
  const [borderRadius, setBorderRadius] = useState('lg');
  const [buttonStyle, setButtonStyle] = useState('rounded');
  const [containerWidth, setContainerWidth] = useState('max-w-7xl');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    const themeSettings = {
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor
      },
      typography: {
        fontPrimary,
        fontHeadings
      },
      layout: {
        borderRadius,
        buttonStyle,
        containerWidth
      }
    };
    
    // Simulate API call
    setTimeout(() => {
      onSave(themeSettings);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const ColorPicker = ({ color, onChange, label }: { color: string; onChange: (color: string) => void; label: string }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = color;
            input.addEventListener('input', (e) => {
              onChange((e.target as HTMLInputElement).value);
            });
            input.click();
          }}
        ></div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Palette className="h-5 w-5 mr-2 text-primary-600" />
          Theme Editor
        </h3>
        <div className="flex items-center space-x-2">
          {saveSuccess && (
            <span className="text-green-600 flex items-center text-sm">
              <Check className="h-4 w-4 mr-1" />
              Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center text-sm"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1.5" />
                Save Theme
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex -mb-px">
          <button
            onClick={() => setActiveTab('colors')}
            className={`py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'colors'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </div>
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'typography'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Type className="h-4 w-4 mr-2" />
              Typography
            </div>
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'layout'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorPicker 
                color={primaryColor} 
                onChange={setPrimaryColor} 
                label="Primary Color" 
              />
              <ColorPicker 
                color={secondaryColor} 
                onChange={setSecondaryColor} 
                label="Secondary Color" 
              />
              <ColorPicker 
                color={accentColor} 
                onChange={setAccentColor} 
                label="Accent Color" 
              />
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: primaryColor }}></div>
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: secondaryColor }}></div>
                  <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: accentColor }}></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Secondary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Font
                </label>
                <select
                  value={fontPrimary}
                  onChange={(e) => setFontPrimary(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading Font
                </label>
                <select
                  value={fontHeadings}
                  onChange={(e) => setFontHeadings(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Montserrat">Montserrat</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Merriweather">Merriweather</option>
                  <option value="Raleway">Raleway</option>
                  <option value="Oswald">Oswald</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: fontHeadings }}>
                  Heading 1 - {fontHeadings}
                </h1>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: fontHeadings }}>
                  Heading 2 - {fontHeadings}
                </h2>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: fontHeadings }}>
                  Heading 3 - {fontHeadings}
                </h3>
                <p className="mb-2" style={{ fontFamily: fontPrimary }}>
                  Body text using {fontPrimary}. This is how your main content will appear on the website.
                </p>
                <p className="text-sm" style={{ fontFamily: fontPrimary }}>
                  Small text using {fontPrimary}. Used for captions, labels, and other secondary content.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Radius
                </label>
                <select
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="full">Full (Rounded)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Style
                </label>
                <select
                  value={buttonStyle}
                  onChange={(e) => setButtonStyle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                  <option value="pill">Pill</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Container Width
                </label>
                <select
                  value={containerWidth}
                  onChange={(e) => setContainerWidth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="max-w-5xl">Narrow</option>
                  <option value="max-w-6xl">Medium</option>
                  <option value="max-w-7xl">Wide</option>
                  <option value="max-w-full">Full Width</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div 
                    className={`w-16 h-16 bg-primary-500 border border-gray-300 rounded-${borderRadius}`}
                  ></div>
                  <div 
                    className={`w-16 h-16 bg-secondary-500 border border-gray-300 rounded-${borderRadius}`}
                  ></div>
                  <div 
                    className={`w-16 h-16 bg-accent-500 border border-gray-300 rounded-${borderRadius}`}
                  ></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-4 py-2 bg-primary-600 text-white ${
                      buttonStyle === 'rounded' ? 'rounded-lg' : 
                      buttonStyle === 'square' ? '' : 
                      'rounded-full'
                    }`}
                  >
                    Primary Button
                  </button>
                  <button 
                    className={`px-4 py-2 bg-white border border-primary-600 text-primary-600 ${
                      buttonStyle === 'rounded' ? 'rounded-lg' : 
                      buttonStyle === 'square' ? '' : 
                      'rounded-full'
                    }`}
                  >
                    Outline Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeEditor;
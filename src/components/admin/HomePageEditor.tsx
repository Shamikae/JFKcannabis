import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, Settings, Trash2, Check, Layout, Layers, Plus, Move, Edit, X } from 'lucide-react';
import ContentEditor from './ContentEditor';
import ImageUploader from './ImageUploader';

interface Section {
  id: string;
  type: 'hero' | 'featured-products' | 'categories' | 'banner' | 'subscription' | 'cafe' | 'location';
  title: string;
  content?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  enabled: boolean;
  order: number;
}

interface HomePageEditorProps {
  onBack: () => void;
  onSave: (sections: Section[]) => void;
}

const HomePageEditor: React.FC<HomePageEditorProps> = ({ onBack, onSave }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch home page sections
    setIsLoading(true);
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockSections: Section[] = [
        {
          id: 'hero',
          type: 'hero',
          title: 'Premium Cannabis Marketplace',
          content: 'Your gateway to the finest cannabis products in Queens, New York. Lab-tested quality, expert curation.',
          image: 'https://images.pexels.com/photos/7667641/pexels-photo-7667641.jpeg',
          buttonText: 'Shop Now',
          buttonLink: '/shop',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          enabled: true,
          order: 1
        },
        {
          id: 'featured-products',
          type: 'featured-products',
          title: 'Featured Products',
          content: 'Discover our handpicked selection of premium cannabis products',
          enabled: true,
          order: 2
        },
        {
          id: 'categories',
          type: 'categories',
          title: 'Shop by Category',
          content: 'Browse our comprehensive selection of premium cannabis products',
          enabled: true,
          order: 3
        },
        {
          id: 'subscription',
          type: 'subscription',
          title: 'Cannabis Subscription Boxes',
          content: 'Discover new products every month with our curated subscription service. Premium products, exclusive strains, and expert curation delivered to your door.',
          buttonText: 'Explore Subscriptions',
          buttonLink: '/subscription',
          backgroundColor: '#396842',
          textColor: '#ffffff',
          enabled: true,
          order: 4
        },
        {
          id: 'cafe',
          type: 'cafe',
          title: 'JFK Cannabis Cafe',
          content: 'Enhance your favorite cafe treats with our premium cannabis products. From THC-infused coffees to edible-enhanced desserts, create your perfect experience.',
          buttonText: 'Visit Our Cafe',
          buttonLink: '/cafe',
          image: 'https://images.pexels.com/photos/6306157/pexels-photo-6306157.jpeg',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          enabled: true,
          order: 5
        },
        {
          id: 'location',
          type: 'location',
          title: 'Find Us',
          content: 'Conveniently located across from JFK Airport and the JFK DMV',
          enabled: true,
          order: 6
        }
      ];
      
      setSections(mockSections);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSectionChange = (id: string, field: string, value: any) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleToggleSection = (id: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && sectionIndex === 0) || 
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    
    // Swap orders
    const currentOrder = newSections[sectionIndex].order;
    newSections[sectionIndex].order = newSections[targetIndex].order;
    newSections[targetIndex].order = currentOrder;
    
    // Resort array
    newSections.sort((a, b) => a.order - b.order);
    
    setSections(newSections);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(sections);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero':
        return <Layout className="h-5 w-5 text-blue-600" />;
      case 'featured-products':
        return <Layers className="h-5 w-5 text-green-600" />;
      case 'categories':
        return <Layers className="h-5 w-5 text-purple-600" />;
      case 'banner':
        return <Layout className="h-5 w-5 text-orange-600" />;
      case 'subscription':
        return <Layers className="h-5 w-5 text-indigo-600" />;
      case 'cafe':
        return <Layers className="h-5 w-5 text-amber-600" />;
      case 'location':
        return <Layers className="h-5 w-5 text-cyan-600" />;
      default:
        return <Layers className="h-5 w-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If editing a specific section
  if (editingSection) {
    const section = sections.find(s => s.id === editingSection);
    if (!section) return null;
    
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setEditingSection(null)}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                Edit {section.title} Section
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-1.5" />
                Save Section
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                id="title"
                value={section.title}
                onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {section.content !== undefined && (
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={section.content}
                  onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}
            
            {section.image !== undefined && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image
                </label>
                <ImageUploader
                  currentImage={section.image}
                  onImageSelected={(url) => handleSectionChange(section.id, 'image', url)}
                  aspectRatio="16/9"
                />
              </div>
            )}
            
            {section.buttonText !== undefined && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    id="buttonText"
                    value={section.buttonText}
                    onChange={(e) => handleSectionChange(section.id, 'buttonText', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    id="buttonLink"
                    value={section.buttonLink}
                    onChange={(e) => handleSectionChange(section.id, 'buttonLink', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}
            
            {section.backgroundColor !== undefined && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-lg border border-gray-300 mr-2"
                      style={{ backgroundColor: section.backgroundColor }}
                    ></div>
                    <input
                      type="text"
                      id="backgroundColor"
                      value={section.backgroundColor}
                      onChange={(e) => handleSectionChange(section.id, 'backgroundColor', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-lg border border-gray-300 mr-2"
                      style={{ backgroundColor: section.textColor }}
                    ></div>
                    <input
                      type="text"
                      id="textColor"
                      value={section.textColor}
                      onChange={(e) => handleSectionChange(section.id, 'textColor', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                checked={section.enabled}
                onChange={() => handleToggleSection(section.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
                Enable this section
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Edit Home Page
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <span className="text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Saved successfully
              </span>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1.5 border rounded-lg flex items-center ${
                showPreview 
                  ? 'bg-primary-50 text-primary-600 border-primary-200' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Eye className="h-4 w-4 mr-1.5" />
              {showPreview ? 'Exit Preview' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
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
                  Save Page
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showPreview ? (
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Home Page Preview</h2>
            <div className="space-y-8">
              {sections
                .filter(section => section.enabled)
                .sort((a, b) => a.order - b.order)
                .map(section => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                    {section.content && <p className="text-gray-600 mb-2">{section.content}</p>}
                    {section.image && (
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    )}
                    {section.buttonText && (
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
                        {section.buttonText}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Page Sections</h2>
            <p className="text-gray-600 mb-6">
              Drag and drop sections to reorder them. Click on a section to edit its content.
            </p>
            
            <div className="space-y-4">
              {sections
                .sort((a, b) => a.order - b.order)
                .map(section => (
                  <div 
                    key={section.id}
                    className={`border rounded-lg p-4 ${
                      section.enabled 
                        ? 'border-gray-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                          {getSectionIcon(section.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{section.title}</h3>
                          <p className="text-sm text-gray-500 capitalize">{section.type} Section</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleSection(section.id)}
                          className={`p-1 rounded ${
                            section.enabled 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                          title={section.enabled ? 'Disable section' : 'Enable section'}
                        >
                          {section.enabled ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleMoveSection(section.id, 'up')}
                          disabled={section.order === 1}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                          title="Move up"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleMoveSection(section.id, 'down')}
                          disabled={section.order === sections.length}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                          title="Move down"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingSection(section.id)}
                          className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                          title="Edit section"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-6">
              <button className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
                <Plus className="h-5 w-5 mr-1" />
                Add New Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageEditor;
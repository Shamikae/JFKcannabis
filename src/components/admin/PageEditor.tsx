import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, Settings, Trash2, Check } from 'lucide-react';
import ContentEditor from './ContentEditor';
import ImageUploader from './ImageUploader';

interface PageData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  lastModified: string;
  status: 'published' | 'draft';
}

interface PageEditorProps {
  pageId?: string;
  onBack: () => void;
  onSave: (pageData: PageData) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ pageId, onBack, onSave }) => {
  const [page, setPage] = useState<PageData>({
    id: pageId || `page-${Date.now()}`,
    title: '',
    slug: '',
    description: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    lastModified: new Date().toISOString(),
    status: 'draft'
  });
  
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(!!pageId);

  useEffect(() => {
    if (pageId) {
      // Simulate API call to fetch page data
      setIsLoading(true);
      setTimeout(() => {
        // This would be replaced with actual API call
        const mockPage: PageData = {
          id: pageId,
          title: 'Sample Page',
          slug: 'sample-page',
          description: 'This is a sample page description that would appear in listings.',
          content: '# Sample Page\n\nThis is a sample page content with **bold text** and *italic text*.\n\n## Section Title\n\nHere is a list:\n- Item 1\n- Item 2\n- Item 3\n\n![Sample Image](https://images.pexels.com/photos/7667641/pexels-photo-7667641.jpeg)',
          featuredImage: 'https://images.pexels.com/photos/7667641/pexels-photo-7667641.jpeg',
          metaTitle: 'Sample Page | JFK Cannabis',
          metaDescription: 'This is a sample page meta description for SEO purposes.',
          keywords: 'cannabis, sample, jfk, queens',
          lastModified: new Date().toISOString(),
          status: 'published'
        };
        
        setPage(mockPage);
        setIsLoading(false);
      }, 1000);
    }
  }, [pageId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPage(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setPage(prev => ({ ...prev, content }));
  };

  const handleImageChange = (imageUrl: string) => {
    setPage(prev => ({ ...prev, featuredImage: imageUrl }));
  };

  const handleStatusChange = (status: 'published' | 'draft') => {
    setPage(prev => ({ ...prev, status }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let slug = e.target.value.toLowerCase()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')     // Replace multiple - with single -
      .replace(/^-+/, '')         // Trim - from start of text
      .replace(/-+$/, '');        // Trim - from end of text
    
    setPage(prev => ({ ...prev, slug }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Update last modified date
    const updatedPage = {
      ...page,
      lastModified: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      onSave(updatedPage);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
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
              {pageId ? 'Edit Page' : 'Create New Page'}
            </h1>
            {page.status === 'published' && (
              <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Published
              </span>
            )}
            {page.status === 'draft' && (
              <span className="ml-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Draft
              </span>
            )}
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
            <div className="flex">
              <button
                onClick={() => handleStatusChange('draft')}
                className={`px-3 py-1.5 border-y border-l border-gray-300 rounded-l-lg ${
                  page.status === 'draft' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => handleStatusChange('published')}
                className={`px-3 py-1.5 border border-gray-300 rounded-r-lg ${
                  page.status === 'published' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Publish
              </button>
            </div>
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
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="px-6 border-t border-gray-200">
          <div className="flex -mb-px">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'seo'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SEO & Settings
            </button>
          </div>
        </div>
      </div>

      {/* Preview Mode */}
      {showPreview ? (
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {page.featuredImage && (
              <img 
                src={page.featuredImage} 
                alt={page.title} 
                className="w-full h-auto rounded-lg mb-6"
              />
            )}
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
            <div className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: page.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
                  .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
                  .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
                  .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
                  .replace(/^- (.*?)$/gm, '<ul><li>$1</li></ul>').replace(/<\/ul><ul>/g, '')
                  .replace(/^[0-9]+\. (.*?)$/gm, '<ol><li>$1</li></ol>').replace(/<\/ol><ol>/g, '')
                  .replace(/`(.*?)`/g, '<code>$1</code>')
                  .replace(/\n/g, '<br />')
              }}
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4">
          {activeTab === 'content' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Page Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={page.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter page title"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                      URL Slug
                    </label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">/</span>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={page.slug}
                        onChange={handleSlugChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="page-url-slug"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={page.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Brief description of this page"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Content
                    </label>
                    <ContentEditor
                      initialContent={page.content}
                      onSave={handleContentChange}
                      height="min-h-[500px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Featured Image</h3>
                  <ImageUploader
                    currentImage={page.featuredImage}
                    onImageSelected={handleImageChange}
                    aspectRatio="16/9"
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Page Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={page.status === 'published'}
                          onChange={(e) => handleStatusChange(e.target.checked ? 'published' : 'draft')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Show in navigation</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Show in footer</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Password protected</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>
                  </div>
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-6">SEO Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={page.metaTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="SEO title (appears in search results)"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Recommended length: 50-60 characters
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={page.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="SEO description (appears in search results)"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Recommended length: 150-160 characters
                  </p>
                </div>
                
                <div>
                  <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={page.keywords}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Comma-separated keywords"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Example: cannabis, jfk, queens, delivery
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">SEO Preview</h4>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="text-blue-600 text-lg font-medium line-clamp-1">
                      {page.metaTitle || page.title || 'Page Title'}
                    </div>
                    <div className="text-green-600 text-sm line-clamp-1">
                      https://jfkcannabis.com/{page.slug || 'page-url'}
                    </div>
                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {page.metaDescription || page.description || 'Page description will appear here.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageEditor;
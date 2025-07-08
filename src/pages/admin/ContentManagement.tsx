import React, { useState } from 'react';
import { 
  Layout, 
  FileText, 
  Image, 
  Settings, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Save,
  X,
  Check,
  Calendar,
  User,
  Tag,
  Loader,
  RefreshCw,
  PenTool,
  Palette
} from 'lucide-react';
import FirebaseContentManager from '../../components/admin/FirebaseContentManager';
import ThemeEditor from '../../components/admin/ThemeEditor';
import HomePageEditor from '../../components/admin/HomePageEditor';
import PageEditor from '../../components/admin/PageEditor';

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'blog' | 'homepage' | 'theme'>('pages');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600">Manage website content with Firebase</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('pages')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'pages'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Pages
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'blog'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <PenTool className="h-5 w-5 mr-2" />
              Blog
            </button>
            <button
              onClick={() => setActiveTab('homepage')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'homepage'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Layout className="h-5 w-5 mr-2" />
              Homepage
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'theme'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Palette className="h-5 w-5 mr-2" />
              Theme
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'pages' && (
        <FirebaseContentManager contentType="page" title="Pages" />
      )}
      
      {activeTab === 'blog' && (
        <FirebaseContentManager contentType="blog" title="Blog Posts" />
      )}
      
      {activeTab === 'homepage' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <HomePageEditor 
            onBack={() => {}} 
            onSave={(sections) => {
              console.log('Saving homepage sections:', sections);
              // In a real implementation, this would save to Firebase
            }} 
          />
        </div>
      )}
      
      {activeTab === 'theme' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ThemeEditor 
            onSave={(themeSettings) => {
              console.log('Saving theme settings:', themeSettings);
              // In a real implementation, this would save to Firebase
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
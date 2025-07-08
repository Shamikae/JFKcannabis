import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Image, 
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
  RefreshCw
} from 'lucide-react';
import { db } from '../../firebase/config';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import FirebaseContentEditor from './FirebaseContentEditor';
import FirebaseImageUploader from './FirebaseImageUploader';
import { format } from 'date-fns';

interface ContentItem {
  id: string;
  title: string;
  slug?: string;
  content: string;
  type: 'page' | 'section' | 'blog' | 'product';
  status: 'published' | 'draft' | 'archived';
  featuredImage?: string;
  author?: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

interface FirebaseContentManagerProps {
  contentType: 'page' | 'section' | 'blog' | 'product';
  title: string;
}

const FirebaseContentManager: React.FC<FirebaseContentManagerProps> = ({ contentType, title }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<ContentItem>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchContentItems();
  }, [contentType]);

  useEffect(() => {
    // Filter content items
    let filtered = [...contentItems];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(filtered);
  }, [contentItems, searchTerm, statusFilter]);

  const fetchContentItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const contentRef = collection(db, contentType);
      const q = query(contentRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const items: ContentItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ContentItem);
      });
      
      setContentItems(items);
      setFilteredItems(items);
    } catch (error) {
      console.error('Error fetching content items:', error);
      setError('Failed to load content items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewItem = (item: ContentItem) => {
    setSelectedItem(item);
    setIsEditing(false);
  };

  const handleEditItem = (item: ContentItem) => {
    setSelectedItem(item);
    setEditedItem({
      title: item.title,
      slug: item.slug,
      content: item.content,
      status: item.status,
      featuredImage: item.featuredImage,
      tags: item.tags || [],
      seo: item.seo || {}
    });
    setIsEditing(true);
  };

  const handleCreateItem = () => {
    setIsCreating(true);
    setEditedItem({
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      tags: [],
      seo: {}
    });
  };

  const handleDeleteItem = async (item: ContentItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, contentType, item.id));
      setContentItems(prev => prev.filter(i => i.id !== item.id));
      
      if (selectedItem?.id === item.id) {
        setSelectedItem(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting content item:', error);
      setError('Failed to delete content item. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setEditedItem(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setEditedItem(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setEditedItem(prev => ({
      ...prev,
      content
    }));
  };

  const handleImageSelected = (imageUrl: string) => {
    setEditedItem(prev => ({
      ...prev,
      featuredImage: imageUrl
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    setEditedItem(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  const handleSave = async () => {
    if (!editedItem.title) {
      setError('Title is required');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      if (isCreating) {
        // Create new content item
        const newItem = {
          ...editedItem,
          type: contentType,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          ...(editedItem.status === 'published' ? { publishedAt: Timestamp.now() } : {})
        };
        
        const docRef = await addDoc(collection(db, contentType), newItem);
        const createdItem = {
          id: docRef.id,
          ...newItem
        } as ContentItem;
        
        setContentItems(prev => [createdItem, ...prev]);
        setSelectedItem(createdItem);
        setIsCreating(false);
      } else if (selectedItem) {
        // Update existing content item
        const updatedItem = {
          ...selectedItem,
          ...editedItem,
          updatedAt: Timestamp.now(),
          ...(editedItem.status === 'published' && selectedItem.status !== 'published' 
            ? { publishedAt: Timestamp.now() } 
            : {})
        };
        
        await updateDoc(doc(db, contentType, selectedItem.id), {
          ...editedItem,
          updatedAt: Timestamp.now(),
          ...(editedItem.status === 'published' && selectedItem.status !== 'published' 
            ? { publishedAt: Timestamp.now() } 
            : {})
        });
        
        setContentItems(prev => 
          prev.map(item => item.id === selectedItem.id ? updatedItem : item)
        );
        setSelectedItem(updatedItem);
      }
      
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content item:', error);
      setError('Failed to save content item. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isCreating) {
      setIsCreating(false);
    } else {
      setIsEditing(false);
    }
    setEditedItem({});
    setError(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Edit className="h-3 w-3 mr-1" />
            Draft
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader className="h-8 w-8 text-primary-600 animate-spin mr-3" />
        <span className="text-lg">Loading content...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">Manage {contentType} content with Firebase</p>
      </div>
      
      {/* Content List and Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium">Content Items</h2>
              <button
                onClick={handleCreateItem}
                className="p-1 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[600px]">
              {filteredItems.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredItems.map(item => (
                    <li 
                      key={item.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        selectedItem?.id === item.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => handleViewItem(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                          <div className="flex items-center mt-1">
                            {getStatusBadge(item.status)}
                            <span className="ml-2 text-xs text-gray-500">
                              {item.updatedAt.toDate().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item);
                            }}
                            className="p-1 text-red-600 hover:text-red-800 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No content found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Get started by creating your first content item'}
                  </p>
                  {searchTerm || statusFilter !== 'all' ? (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Filters
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateItem}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Content
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Editor/Viewer */}
        <div className="lg:col-span-2">
          {isCreating || (isEditing && selectedItem) ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isCreating ? `New ${contentType}` : `Edit ${contentType}`}
                </h2>
                <div className="flex items-center space-x-2">
                  {error && (
                    <span className="text-red-600 text-sm">
                      {error}
                    </span>
                  )}
                  {saveSuccess && (
                    <span className="text-green-600 text-sm flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Saved successfully
                    </span>
                  )}
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
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
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedItem.title || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                {contentType !== 'section' && (
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">/</span>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={editedItem.slug || ''}
                        onChange={handleInputChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="page-url-slug"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={editedItem.status || 'draft'}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                {(contentType === 'blog' || contentType === 'product') && (
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={editedItem.tags?.join(', ') || ''}
                      onChange={handleTagsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <FirebaseImageUploader
                    currentImage={editedItem.featuredImage}
                    onImageSelected={handleImageSelected}
                    folder={`${contentType}/${isCreating ? 'new' : selectedItem?.id}`}
                    aspectRatio="16/9"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <FirebaseContentEditor
                    contentId={isCreating ? 'new' : selectedItem?.id || ''}
                    contentType={contentType}
                    initialContent={editedItem.content || ''}
                    onSave={handleContentChange}
                    height="min-h-[400px]"
                  />
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="seo.title" className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        id="seo.title"
                        name="seo.title"
                        value={editedItem.seo?.title || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="seo.description" className="block text-sm font-medium text-gray-700 mb-1">
                        SEO Description
                      </label>
                      <textarea
                        id="seo.description"
                        name="seo.description"
                        value={editedItem.seo?.description || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedItem ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditItem(selectedItem)}
                    className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      Updated: {format(selectedItem.updatedAt.toDate(), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {selectedItem.status === 'published' && selectedItem.publishedAt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        Published: {format(selectedItem.publishedAt.toDate(), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  {getStatusBadge(selectedItem.status)}
                </div>
                
                {selectedItem.featuredImage && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={selectedItem.featuredImage} 
                      alt={selectedItem.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="prose max-w-none border-t border-gray-200 pt-6">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: selectedItem.content
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
                
                {selectedItem.seo && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">SEO Information</h3>
                    {selectedItem.seo.title && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700">SEO Title</h4>
                        <p className="text-blue-600 text-lg">{selectedItem.seo.title}</p>
                      </div>
                    )}
                    {selectedItem.seo.description && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">SEO Description</h4>
                        <p className="text-gray-600">{selectedItem.seo.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content selected</h3>
              <p className="text-gray-500 mb-6">
                Select an item from the list or create a new one
              </p>
              <button
                onClick={handleCreateItem}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseContentManager;
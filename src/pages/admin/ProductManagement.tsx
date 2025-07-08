import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Download,
  Package,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Beaker,
  Camera,
  FileText,
  Tag,
  DollarSign,
  TrendingUp,
  Grid,
  List,
  MoreVertical,
  Copy,
  Archive,
  Database,
  RefreshCw
} from 'lucide-react';
import { Product } from '../../types/product';
import { nyLicensedProducts } from '../../data/nyLicensedProducts';
import { useInventoryStore } from '../../store/inventoryStore';
import { mockAlleavesApi } from '../../services/alleaves';

// New component for adding product
const AddProductModal: React.FC<{
  onClose: () => void;
  onAdd: (product: any) => void;
}> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'flower',
    subcategory: '',
    price: 0,
    thcContent: 0,
    description: '',
    inStock: true,
    stockQuantity: 0,
    source: 'manual' // 'manual' or 'alleaves'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onAdd({
        ...formData,
        id: `prod-${Date.now()}`,
        images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg']
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Add New Product</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="flower">Flower</option>
                    <option value="pre-rolls">Pre-Rolls</option>
                    <option value="edibles">Edibles</option>
                    <option value="vapes">Vapes</option>
                    <option value="concentrates">Concentrates</option>
                    <option value="tinctures">Tinctures</option>
                    <option value="topicals">Topicals</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    THC Content (%) *
                  </label>
                  <input
                    type="number"
                    name="thcContent"
                    value={formData.thcContent}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                  In Stock
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="sourceManual"
                  name="source"
                  value="manual"
                  checked={formData.source === 'manual'}
                  onChange={() => setFormData(prev => ({ ...prev, source: 'manual' }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="sourceManual" className="ml-2 block text-sm text-gray-700">
                  Manual Entry
                </label>
                
                <input
                  type="radio"
                  id="sourceAlleaves"
                  name="source"
                  value="alleaves"
                  checked={formData.source === 'alleaves'}
                  onChange={() => setFormData(prev => ({ ...prev, source: 'alleaves' }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 ml-6"
                />
                <label htmlFor="sourceAlleaves" className="ml-2 block text-sm text-gray-700">
                  Link to Alleaves POS
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(nyLicensedProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(nyLicensedProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const navigate = useNavigate();
  
  // Get inventory store for Alleaves integration
  const { fetchInventory, lastSynced } = useInventoryStore();

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Apply stock filter
    if (stockFilter === 'in-stock') {
      filtered = filtered.filter(product => product.inStock && product.stockQuantity > 0);
    } else if (stockFilter === 'low-stock') {
      filtered = filtered.filter(product => product.stockQuantity <= 10 && product.stockQuantity > 0);
    } else if (stockFilter === 'out-of-stock') {
      filtered = filtered.filter(product => !product.inStock || product.stockQuantity === 0);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, stockFilter]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === 'delete') {
      if (confirm('Are you sure you want to delete the selected products?')) {
        setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
      }
    } else if (action === 'archive') {
      // Implement archive functionality
      alert(`${selectedProducts.length} products archived`);
      setSelectedProducts([]);
    } else if (action === 'feature') {
      setProducts(prev => 
        prev.map(p => 
          selectedProducts.includes(p.id) 
            ? { ...p, featured: true } 
            : p
        )
      );
      setSelectedProducts([]);
    }
  };

  const handleAddProduct = (product: any) => {
    const newProduct: Product = {
      ...product,
      rating: 0,
      reviewCount: 0,
      views: 0,
      purchases: 0,
      effects: [],
      images: [product.images[0]]
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleImportFromAlleaves = async () => {
    setIsImporting(true);
    
    try {
      // Fetch products from Alleaves
      const alleaveProducts = await mockAlleavesApi.getProducts();
      
      // Convert to our product format
      const newProducts = alleaveProducts.map(ap => ({
        id: ap.id,
        name: ap.name,
        brand: ap.brand,
        category: ap.category as any,
        subcategory: ap.subcategory,
        price: ap.price,
        inStock: ap.quantity > 0,
        stockQuantity: ap.quantity,
        thcContent: ap.thcContent,
        cbdContent: ap.cbdContent,
        weight: ap.weight,
        strainType: ap.strainType as any,
        description: ap.description,
        effects: [],
        images: ap.images,
        rating: 0,
        reviewCount: 0,
        views: 0,
        purchases: 0
      }));
      
      // Add to products
      setProducts(prev => {
        // Filter out existing products with same ID
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        return [...uniqueNewProducts, ...prev];
      });
      
      // Also fetch inventory
      await fetchInventory();
      
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (error) {
      console.error('Error importing from Alleaves:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const getStockStatus = (product: Product) => {
    if (!product.inStock || product.stockQuantity === 0) {
      return { status: 'Out of Stock', color: 'text-red-600 bg-red-50', icon: XCircle };
    } else if (product.stockQuantity <= 10) {
      return { status: 'Low Stock', color: 'text-yellow-600 bg-yellow-50', icon: AlertTriangle };
    } else {
      return { status: 'In Stock', color: 'text-green-600 bg-green-50', icon: CheckCircle };
    }
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const stockStatus = getStockStatus(product);
    const StatusIcon = stockStatus.icon;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
                className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg mr-3"
              />
              <div>
                <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Eye className="h-4 w-4" />
              </button>
              <button 
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium capitalize">{product.category}</p>
            </div>
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Stock</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {product.stockQuantity}
              </div>
            </div>
            <div>
              <p className="text-gray-500">THC</p>
              <p className="font-medium">
                {product.category === 'flower' || product.category === 'vapes' || product.category === 'concentrates' 
                  ? `${product.thcContent}%` 
                  : `${product.thcContent}mg`}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.hasLabReport && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  <Beaker className="h-3 w-3 mr-1" />
                  Lab Tested
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Eye className="h-4 w-4 mr-1" />
              {product.views}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your cannabis product inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="btn-outline flex items-center"
            onClick={handleImportFromAlleaves}
            disabled={isImporting}
          >
            {isImporting ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Importing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Import from Alleaves
              </>
            )}
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Import Success Alert */}
      {importSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">Products imported successfully from Alleaves</p>
            <p className="text-sm">
              The products have been added to your inventory and are now available on your website.
            </p>
          </div>
        </div>
      )}

      {/* Alleaves Connection Info */}
      {lastSynced && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Database className="h-5 w-5 mr-3 text-blue-500" />
            <div>
              <p className="font-medium">Alleaves POS Connection Active</p>
              <p className="text-sm">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </span>
            <Link className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Stock Levels</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedProducts.length > 0 ? `${selectedProducts.length} selected` : 'Select all'}
              </span>
            </div>

            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction('feature')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Feature
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} products
            </span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button 
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">20</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  Star,
  Tag,
  Calendar,
  MapPin,
  Globe,
  BarChart3,
  Grid,
  List,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { brands, Brand } from '../../data/brandData';

const BrandManagement: React.FC = () => {
  const [allBrands, setAllBrands] = useState<Brand[]>(brands);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(brands.flatMap(brand => brand.categories || [])))];

  useEffect(() => {
    let filtered = [...allBrands];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brand => 
        brand.categories && brand.categories.includes(selectedCategory)
      );
    }

    setFilteredBrands(filtered);
  }, [allBrands, searchTerm, selectedCategory]);

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBrands.length === filteredBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(filteredBrands.map(b => b.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on brands:`, selectedBrands);
    // Implement bulk actions
    setSelectedBrands([]);
  };

  const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand.id)}
              onChange={() => handleSelectBrand(brand.id)}
              className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{brand.name}</h3>
              {brand.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{brand.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          {brand.founded && (
            <div>
              <p className="text-gray-500">Founded</p>
              <p className="font-medium">{brand.founded}</p>
            </div>
          )}
          {brand.location && (
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{brand.location}</p>
            </div>
          )}
        </div>

        {brand.categories && brand.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {brand.categories.map(category => (
              <span 
                key={category}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const BrandListItem: React.FC<{ brand: Brand }> = ({ brand }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center">
        <input
          type="checkbox"
          checked={selectedBrands.includes(brand.id)}
          onChange={() => handleSelectBrand(brand.id)}
          className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3">
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900 mr-2">{brand.name}</h3>
            {brand.featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">{brand.description}</p>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          {brand.categories && brand.categories.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-1 mr-4">
              {brand.categories.slice(0, 2).map(category => (
                <span 
                  key={category}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {category}
                </span>
              ))}
              {brand.categories.length > 2 && (
                <span className="text-xs text-gray-500">+{brand.categories.length - 2}</span>
              )}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-gray-600">Manage cannabis brands and partnerships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
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
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.length === filteredBrands.length && filteredBrands.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedBrands.length > 0 ? `${selectedBrands.length} selected` : 'Select all'}
              </span>
            </div>

            {selectedBrands.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('feature')}
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Feature
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredBrands.length} brands
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

      {/* Brands List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBrands.map(brand => (
            <BrandListItem key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button className="btn-primary">
            Add Your First Brand
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredBrands.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">20</span> of{' '}
            <span className="font-medium">{filteredBrands.length}</span> results
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
    </div>
  );
};

export default BrandManagement;
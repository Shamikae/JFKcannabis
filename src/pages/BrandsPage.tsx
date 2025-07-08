import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { brands } from '../data/brandData';

const BrandsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(brands.flatMap(brand => brand.categories || [])))];

  // Filter and sort brands
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = searchTerm === '' || 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        (brand.categories && brand.categories.includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'founded':
          return (b.founded || '').localeCompare(a.founded || '');
        default:
          return 0;
      }
    });

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Brands</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover premium cannabis brands available at JFK Cannabis. We partner with the finest producers to bring you exceptional quality and variety.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="name">Name A-Z</option>
                <option value="featured">Featured First</option>
                <option value="founded">Newest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {filteredBrands.length} Brand{filteredBrands.length !== 1 ? 's' : ''} Found
          </h2>
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
              {searchTerm && <span>Search: "{searchTerm}"</span>}
              {selectedCategory !== 'all' && <span>Category: {selectedCategory}</span>}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-primary-600 hover:underline ml-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        
        {/* Brands Grid/List */}
        {filteredBrands.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredBrands.map(brand => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className={`card bg-white overflow-hidden group hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex items-center p-4' : ''
                }`}
              >
                {/* Brand Image */}
                <div className={`overflow-hidden bg-neutral-100 ${
                  viewMode === 'list' ? 'w-24 h-24 rounded-lg mr-4 flex-shrink-0' : 'h-40'
                }`}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Brand Info */}
                <div className={viewMode === 'list' ? 'flex-1' : 'p-5'}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`font-semibold group-hover:text-primary-600 transition-colors ${
                      viewMode === 'list' ? 'text-lg' : 'text-xl'
                    }`}>
                      {brand.name}
                    </h2>
                    {brand.featured && (
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-neutral-600 text-sm mb-3 ${
                    viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'
                  }`}>
                    {brand.description}
                  </p>
                  
                  {/* Brand Details */}
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-500 mb-3">
                    {brand.founded && (
                      <span>Founded {brand.founded}</span>
                    )}
                    {brand.location && (
                      <span>• {brand.location}</span>
                    )}
                  </div>
                  
                  {/* Categories */}
                  {brand.categories && brand.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {brand.categories.slice(0, viewMode === 'list' ? 5 : 3).map(category => (
                        <span
                          key={category}
                          className="text-xs px-2 py-1 bg-neutral-100 rounded-full"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                      {brand.categories.length > (viewMode === 'list' ? 5 : 3) && (
                        <span className="text-xs text-neutral-500">
                          +{brand.categories.length - (viewMode === 'list' ? 5 : 3)} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Brands Found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or filters to find brands.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
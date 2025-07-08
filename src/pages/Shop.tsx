import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Product, FilterOptions } from '../types/product';
import { getProductsByCategory, searchProducts, filterOptions } from '../data/productData';
import ProductCard from '../components/shop/ProductCard';
import AdvancedFilters from '../components/shop/AdvancedFilters';

const Shop: React.FC = () => {
  const { category, subcategory } = useParams<{ category?: string; subcategory?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Search query from URL params
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    setLoading(true);
    let fetchedProducts: Product[] = [];
    
    if (searchQuery) {
      fetchedProducts = searchProducts(searchQuery);
    } else if (category) {
      fetchedProducts = getProductsByCategory(category, subcategory);
    } else {
      // Show all products if no category specified
      fetchedProducts = [];
    }
    
    setProducts(fetchedProducts);
    setLoading(false);
  }, [category, subcategory, searchQuery]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...products];

    // Apply filters
    if (filters.brands?.length) {
      filtered = filtered.filter(p => filters.brands!.includes(p.brand));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }

    if (filters.thcRange) {
      filtered = filtered.filter(p => 
        p.thcContent >= filters.thcRange![0] && p.thcContent <= filters.thcRange![1]
      );
    }

    if (filters.strainTypes?.length) {
      filtered = filtered.filter(p => 
        p.strainType && filters.strainTypes!.includes(p.strainType)
      );
    }

    if (filters.growingProcess?.length) {
      filtered = filtered.filter(p => 
        p.growingProcess && filters.growingProcess!.includes(p.growingProcess)
      );
    }

    if (filters.forms?.length) {
      filtered = filtered.filter(p => 
        p.form && filters.forms!.includes(p.form)
      );
    }

    if (filters.weights?.length) {
      filtered = filtered.filter(p => 
        p.weight && filters.weights!.includes(p.weight)
      );
    }

    if (filters.sizes?.length) {
      filtered = filtered.filter(p => 
        p.size && filters.sizes!.includes(p.size)
      );
    }

    if (filters.packSizes?.length) {
      filtered = filtered.filter(p => 
        p.packSize && filters.packSizes!.includes(p.packSize)
      );
    }

    if (filters.infusionTypes?.length) {
      filtered = filtered.filter(p => 
        p.infusionType && filters.infusionTypes!.includes(p.infusionType)
      );
    }

    if (filters.tipMaterials?.length) {
      filtered = filtered.filter(p => 
        p.tipMaterial && filters.tipMaterials!.includes(p.tipMaterial)
      );
    }

    if (filters.hardware?.length) {
      filtered = filtered.filter(p => 
        p.hardware && filters.hardware!.includes(p.hardware)
      );
    }

    if (filters.topicalCategories?.length) {
      filtered = filtered.filter(p => 
        p.topicalCategory && filters.topicalCategories!.includes(p.topicalCategory)
      );
    }

    if (filters.effects?.length) {
      filtered = filtered.filter(p => 
        filters.effects!.some(effect => p.effects.includes(effect))
      );
    }

    if (filters.flavors?.length) {
      filtered = filtered.filter(p => 
        p.flavors && filters.flavors!.some(flavor => p.flavors!.includes(flavor))
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    if (filters.onSale) {
      filtered = filtered.filter(p => p.salePrice && p.salePrice < p.price);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'thc-high':
          return b.thcContent - a.thcContent;
        case 'thc-low':
          return a.thcContent - b.thcContent;
        case 'name-az':
          return a.name.localeCompare(b.name);
        case 'name-za':
          return b.name.localeCompare(a.name);
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.purchases - a.purchases;
        case 'newest':
          return new Date(b.id).getTime() - new Date(a.id).getTime();
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, sortOption]);

  // Sticky filter on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && toolbarRef.current) {
        const filterRect = filterRef.current.getBoundingClientRect();
        const toolbarRect = toolbarRef.current.getBoundingClientRect();
        
        if (filterRect.top <= 0) {
          setIsFilterSticky(true);
        } else if (toolbarRect.top > 0) {
          setIsFilterSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (category === 'pre-order') return 'Pre-Order Products';
    if (subcategory) return subcategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (category) return category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    return 'All Products';
  };

  const getPageDescription = () => {
    if (searchQuery) return `Found ${filteredProducts.length} products matching "${searchQuery}"`;
    if (category === 'pre-order') return 'Reserve these products before they arrive in store. Members only.';
    return `Explore our selection of premium ${category || 'cannabis'} products.`;
  };

  if (loading) {
    return (
      <div className="bg-neutral-50 min-h-screen py-8">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-48 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
          <p className="text-neutral-600">{getPageDescription()}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div 
            ref={filterRef}
            className={`lg:w-80 ${filtersOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className={isFilterSticky ? 'sticky top-0 pt-4' : ''}>
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
                category={category}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div 
              ref={toolbarRef}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 ${
                isFilterSticky ? 'sticky top-0 z-10 bg-neutral-50 pt-4 pb-2' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                
                <div className="text-sm text-neutral-600">
                  {filteredProducts.length} products
                </div>
              </div>

              <div className="flex items-center gap-4">
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

                {/* Sort Dropdown */}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-neutral-200 text-neutral-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5"
                >
                  <option value="featured">Featured</option>
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="thc-high">THC: Highest</option>
                  <option value="thc-low">THC: Lowest</option>
                  <option value="name-az">Name: A-Z</option>
                  <option value="name-za">Name: Z-A</option>
                </select>
              </div>
            </div>

            {/* Pre-Order Notice */}
            {category === 'pre-order' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h2 className="text-amber-800 font-bold text-lg mb-2">Pre-Order Information</h2>
                <p className="text-amber-700 mb-2">
                  Pre-order products are available for members only. These products are not currently in stock but can be reserved for future delivery or pickup.
                </p>
                <p className="text-amber-700">
                  <strong>Note:</strong> Pre-orders require payment at checkout and will be fulfilled when products arrive in store.
                </p>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    showQuickView={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-neutral-600 mb-6">
                    {category === 'pre-order' 
                      ? 'There are currently no pre-order products available. Please check back soon!'
                      : "Try adjusting your filters or search terms to find what you're looking for."}
                  </p>
                  <button
                    onClick={() => setFilters({})}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <button className="btn-outline px-8 py-3">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
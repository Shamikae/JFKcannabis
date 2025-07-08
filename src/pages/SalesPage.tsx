import React, { useState, useEffect } from 'react';
import { Search, Filter, Tag, TrendingDown, Clock, Star } from 'lucide-react';
import { Product } from '../types/product';
import { nyLicensedProducts, getSaleProducts } from '../data/nyLicensedProducts';
import ProductCard from '../components/shop/ProductCard';

const SalesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('discount-high');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'edibles', label: 'Edibles' },
    { value: 'flower', label: 'Flower' },
    { value: 'pre-rolls', label: 'Pre-Rolls' },
    { value: 'vapes', label: 'Vapes' },
    { value: 'concentrates', label: 'Concentrates' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'tinctures', label: 'Tinctures' },
    { value: 'topicals', label: 'Topicals' }
  ];

  useEffect(() => {
    setLoading(true);
    // Get all products and add some sale prices for demo
    const allProducts = [...nyLicensedProducts];
    
    // Add sale prices to some products for demo
    const productsWithSales = allProducts.map(product => {
      // Add sale prices to certain products
      if (['incredibles-chocolate', 'high-falls-flower-35g', 'dogwalkers-preroll', 'mfny-tincture'].includes(product.id)) {
        return {
          ...product,
          salePrice: product.price * 0.8 // 20% off
        };
      }
      if (['jaunty-gummies-2pack', 'geezont-pop-rocks', 'snooby-dankins-kief'].includes(product.id)) {
        return {
          ...product,
          salePrice: product.price * 0.85 // 15% off
        };
      }
      if (['high-peaks-beverage', 'rec-roots-flower'].includes(product.id)) {
        return {
          ...product,
          salePrice: product.price * 0.9 // 10% off
        };
      }
      return product;
    });

    // Filter only products with sale prices
    const saleProducts = productsWithSales.filter(product => 
      product.salePrice && product.salePrice < product.price
    );

    setProducts(saleProducts);
    setLoading(false);
  }, []);

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

    // Apply sorting
    filtered.sort((a, b) => {
      const aDiscount = a.salePrice ? ((a.price - a.salePrice) / a.price) * 100 : 0;
      const bDiscount = b.salePrice ? ((b.price - b.salePrice) / b.price) * 100 : 0;
      const aSavings = a.salePrice ? a.price - a.salePrice : 0;
      const bSavings = b.salePrice ? b.price - b.salePrice : 0;

      switch (sortOption) {
        case 'discount-high':
          return bDiscount - aDiscount;
        case 'discount-low':
          return aDiscount - bDiscount;
        case 'savings-high':
          return bSavings - aSavings;
        case 'savings-low':
          return aSavings - bSavings;
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'name-az':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        default:
          return bDiscount - aDiscount;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortOption]);

  const calculateDiscount = (product: Product) => {
    if (!product.salePrice) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  };

  const calculateSavings = (product: Product) => {
    if (!product.salePrice) return 0;
    return product.price - product.salePrice;
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
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Tag className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cannabis Sales & Deals
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Save big on premium cannabis products from New York's licensed dispensaries. 
              Limited time offers on your favorite brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Up to 25% Off</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Limited Time</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Premium Brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search sale products..."
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
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-64">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="discount-high">Highest Discount</option>
                <option value="discount-low">Lowest Discount</option>
                <option value="savings-high">Highest Savings</option>
                <option value="savings-low">Lowest Savings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A-Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {filteredProducts.length} Products on Sale
          </h2>
          <p className="text-neutral-600">
            {selectedCategory !== 'all' 
              ? `Showing ${categories.find(c => c.value === selectedCategory)?.label} deals`
              : 'Showing all sale products'
            }
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {calculateDiscount(product)}% OFF
                  </div>
                </div>
                
                {/* Savings Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Save ${calculateSavings(product).toFixed(2)}
                  </div>
                </div>

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Sale Products Found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or filters to find sale products.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Sale Info Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Don't Miss Out!</h3>
          <p className="text-lg mb-6 opacity-90">
            Sale prices are limited time only. Stock up on your favorite products while supplies last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Free Delivery Over $60</span>
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Same Day Delivery Available</span>
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Lab Tested Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter, Search, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import { Product } from '../types/product';
import ProductCard from '../components/shop/ProductCard';

const PreOrderPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth state

  // Mock pre-order products
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPreOrderProducts: Product[] = [
        {
          id: 'pre-order-1',
          name: 'Zoap Premium Flower',
          brand: 'Exotic Genetics',
          category: 'flower',
          subcategory: 'buds',
          price: 65.00,
          inStock: false,
          stockQuantity: 0,
          preOrder: true,
          weight: '3.5g',
          thcContent: 28.5,
          strainType: 'hybrid',
          growingProcess: 'indoor',
          form: 'buds',
          smallBatch: true,
          indoor: true,
          description: 'Limited edition Zoap strain with exceptional terpene profile. Pre-order now for delivery in 44 days.',
          effects: ['Euphoric', 'Creative', 'Relaxed'],
          images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
          hasLabReport: true,
          featured: true,
          views: 1250,
          purchases: 0,
          rating: 0,
          reviewCount: 0
        },
        {
          id: 'pre-order-2',
          name: 'Runtz Live Rosin Cart',
          brand: 'Premium Extracts',
          category: 'vapes',
          subcategory: 'rosin',
          price: 70.00,
          inStock: false,
          stockQuantity: 0,
          preOrder: true,
          size: '1g',
          thcContent: 82.0,
          strainType: 'hybrid',
          hardware: '510-cart',
          concentrationType: 'live-rosin',
          extractionMethod: 'solventless',
          description: 'Premium solventless live rosin cart made from fresh frozen Runtz flower. Pre-order now for delivery in 21 days.',
          effects: ['Euphoric', 'Happy', 'Relaxed'],
          images: ['https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg'],
          hasLabReport: true,
          views: 980,
          purchases: 0,
          rating: 0,
          reviewCount: 0
        },
        {
          id: 'pre-order-3',
          name: 'Limited Edition Gummies',
          brand: 'Cosmic Edibles',
          category: 'edibles',
          subcategory: 'gummies',
          price: 35.00,
          inStock: false,
          stockQuantity: 0,
          preOrder: true,
          packSize: 10,
          thcContent: 100,
          description: 'Limited edition seasonal gummies with unique flavor profiles. Pre-order now for delivery in 14 days.',
          effects: ['Relaxed', 'Happy', 'Creative'],
          images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
          flavors: ['Watermelon', 'Pineapple', 'Mango'],
          hasLabReport: true,
          views: 750,
          purchases: 0,
          rating: 0,
          reviewCount: 0
        },
        {
          id: 'pre-order-4',
          name: 'Exclusive Hash Rosin',
          brand: 'Solventless Solutions',
          category: 'concentrates',
          subcategory: 'rosin',
          price: 90.00,
          inStock: false,
          stockQuantity: 0,
          preOrder: true,
          size: '1g',
          thcContent: 76.5,
          extractionMethod: 'solventless',
          description: 'Small-batch hash rosin made from premium flower. Pre-order now for delivery in 30 days.',
          effects: ['Potent', 'Euphoric', 'Relaxed'],
          images: ['https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg'],
          hasLabReport: true,
          views: 620,
          purchases: 0,
          rating: 0,
          reviewCount: 0
        }
      ];
      
      setProducts(mockPreOrderProducts);
      setFilteredProducts(mockPreOrderProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Calculate days remaining for pre-order
  const getDaysRemaining = (productId: string) => {
    // In a real app, this would come from the product data
    const daysMap: Record<string, number> = {
      'pre-order-1': 44,
      'pre-order-2': 21,
      'pre-order-3': 14,
      'pre-order-4': 30
    };
    
    return daysMap[productId] || 30;
  };

  // Get estimated delivery date
  const getEstimatedDeliveryDate = (daysRemaining: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysRemaining);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-neutral-50 min-h-screen py-8">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
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

  // If user is not logged in, show membership required message
  if (!isLoggedIn) {
    return (
      <div className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Membership Required</h1>
            <p className="text-lg text-neutral-600 mb-6">
              Pre-order products are available exclusively to JFK Cannabis members. Sign in or create a free account to access pre-orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account" className="btn-primary px-8 py-3">
                Sign In
              </Link>
              <Link to="/memberships" className="btn-outline px-8 py-3">
                Join For Free
              </Link>
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
          <h1 className="text-3xl font-bold mb-2">Pre-Order Products</h1>
          <p className="text-neutral-600">
            Reserve these products before they arrive in store. Members only.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search pre-order products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-neutral-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="flower">Flower</option>
              <option value="vapes">Vapes</option>
              <option value="edibles">Edibles</option>
              <option value="concentrates">Concentrates</option>
            </select>
          </div>
        </div>

        {/* Pre-Order Information */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4">How Pre-Orders Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">1. Reserve Now</h3>
              <p className="text-sm text-neutral-600">
                Browse and select pre-order products. Payment is required at checkout to secure your order.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">2. We'll Notify You</h3>
              <p className="text-sm text-neutral-600">
                Receive updates on your pre-order status. We'll notify you when your products arrive.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-3">
                <ArrowRight className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">3. Pickup or Delivery</h3>
              <p className="text-sm text-neutral-600">
                Choose pickup at our store or delivery to your location when products are ready.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="relative">
                {/* Pre-Order Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-amber-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    PRE-ORDER
                  </div>
                </div>
                
                {/* Countdown Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {getDaysRemaining(product.id)} days left
                  </div>
                </div>

                <ProductCard product={product} />
                
                {/* Delivery Date */}
                <div className="mt-2 p-2 bg-neutral-100 rounded-lg text-sm text-center">
                  <span className="font-medium">Estimated Arrival:</span> {getEstimatedDeliveryDate(getDaysRemaining(product.id))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Filter className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Pre-Order Products Found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search or check back soon for new pre-order products.
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

        {/* Pre-Order Policy */}
        <div className="mt-12 bg-neutral-100 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Pre-Order Policy</h3>
          <div className="text-sm text-neutral-600 space-y-2">
            <p>• Pre-orders require full payment at checkout to secure your products.</p>
            <p>• Estimated delivery dates are approximate and subject to change.</p>
            <p>• You will be notified via email and text when your pre-order is ready.</p>
            <p>• Pre-orders can be canceled for a full refund before products arrive.</p>
            <p>• Products will be held for 7 days after arrival notification.</p>
            <p>• Valid ID (21+) is required for pickup or delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderPage;
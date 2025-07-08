import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Info, 
  Search,
  Filter,
  Plus,
  Minus,
  Trash2,
  Users,
  Building,
  Clock,
  Leaf,
  Star
} from 'lucide-react';
import { Product } from '../types/product';
import { products } from '../data/productData';

interface BulkProduct extends Product {
  bulkQuantity: number;
  bulkDiscount: number;
}

const BulkOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bulkCart, setBulkCart] = useState<BulkProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Add bulk discounts to products
  const bulkProducts: BulkProduct[] = products.map(product => ({
    ...product,
    bulkQuantity: 0,
    bulkDiscount: calculateBulkDiscount(product.price)
  }));
  
  // Filter products based on search and category
  const filteredProducts = bulkProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate bulk discount percentage based on price
  function calculateBulkDiscount(price: number): number {
    if (price >= 50) return 0.20; // 20% off for expensive items
    if (price >= 30) return 0.15; // 15% off for mid-range items
    return 0.10; // 10% off for cheaper items
  }
  
  // Calculate discounted price
  function getDiscountedPrice(product: BulkProduct): number {
    return product.price * (1 - product.bulkDiscount);
  }
  
  // Add product to bulk cart
  const addToBulkCart = (product: BulkProduct) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    setBulkCart(prev => {
      const existingProduct = prev.find(p => p.id === product.id);
      
      if (existingProduct) {
        return prev.map(p => 
          p.id === product.id 
            ? { ...p, bulkQuantity: p.bulkQuantity + 1 } 
            : p
        );
      } else {
        return [...prev, { ...product, bulkQuantity: 1 }];
      }
    });
  };
  
  // Update product quantity in bulk cart
  const updateQuantity = (productId: string, quantity: number) => {
    setBulkCart(prev => {
      if (quantity <= 0) {
        return prev.filter(p => p.id !== productId);
      }
      
      return prev.map(p => 
        p.id === productId 
          ? { ...p, bulkQuantity: quantity } 
          : p
      );
    });
  };
  
  // Remove product from bulk cart
  const removeFromCart = (productId: string) => {
    setBulkCart(prev => prev.filter(p => p.id !== productId));
  };
  
  // Calculate cart subtotal
  const getSubtotal = (): number => {
    return bulkCart.reduce((total, product) => {
      const discountedPrice = getDiscountedPrice(product);
      return total + (discountedPrice * product.bulkQuantity);
    }, 0);
  };
  
  // Calculate total savings
  const getTotalSavings = (): number => {
    return bulkCart.reduce((total, product) => {
      const regularPrice = product.price * product.bulkQuantity;
      const discountedPrice = getDiscountedPrice(product) * product.bulkQuantity;
      return total + (regularPrice - discountedPrice);
    }, 0);
  };
  
  // Calculate total items
  const getTotalItems = (): number => {
    return bulkCart.reduce((total, product) => total + product.bulkQuantity, 0);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (bulkCart.length === 0) {
      alert('Your cart is empty. Please add some products first.');
      return;
    }
    
    setShowCheckoutModal(true);
  };
  
  // Handle order submission
  const handleSubmitOrder = () => {
    // In a real app, this would submit the order to your backend
    console.log('Order submitted:', {
      products: bulkCart,
      deliveryDate,
      specialInstructions,
      subtotal: getSubtotal(),
      savings: getTotalSavings()
    });
    
    // Close modal and show success message
    setShowCheckoutModal(false);
    alert('Your bulk order has been placed successfully! We will contact you to confirm the details.');
    
    // Clear cart
    setBulkCart([]);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[50vh] min-h-[400px] bg-black">
          <img
            src="https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg"
            alt="Cannabis Bulk Orders"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bulk Cannabis Orders
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-xl">
                Save big when you order in bulk. Perfect for events, parties, or stocking up.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/birthday-packages" 
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-neutral-100 transition-colors inline-flex items-center"
                >
                  <Package className="h-5 w-5 mr-2" />
                  Birthday Packages
                </Link>
                <Link 
                  to="/shop" 
                  className="px-6 py-3 bg-white/20 text-white hover:bg-white/30 rounded-lg transition-colors inline-flex items-center"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop All Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Save More When You Buy More</h2>
          <p className="text-lg text-neutral-600 mb-6">
            Our bulk ordering system offers significant discounts on larger quantities. Perfect for events, parties, or simply stocking up on your favorites.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Up to 20% off regular prices
            </div>
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <Truck className="h-4 w-4 mr-2" />
              Free delivery on bulk orders
            </div>
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule delivery in advance
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Listing */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-neutral-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Categories</option>
                  <option value="flower">Flower</option>
                  <option value="pre-rolls">Pre-Rolls</option>
                  <option value="edibles">Edibles</option>
                  <option value="vapes">Vapes</option>
                  <option value="concentrates">Concentrates</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex">
                    <div className="w-1/3">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-neutral-500 mb-2">{product.brand}</p>
                      
                      <div className="flex items-center mb-3">
                        <div className="text-sm font-bold text-primary-600">
                          ${getDiscountedPrice(product).toFixed(2)}
                        </div>
                        <div className="ml-2 text-xs text-neutral-500 line-through">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                          {Math.round(product.bulkDiscount * 100)}% OFF
                        </div>
                      </div>
                      
                      <button
                        onClick={() => addToBulkCart(product)}
                        className="w-full py-1.5 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Bulk Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bulk Order Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Your Bulk Order</h3>
              
              {bulkCart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 mb-4">Your bulk order cart is empty</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    Add products to your cart to see bulk discounts
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-80 overflow-y-auto mb-4">
                    {bulkCart.map((product) => (
                      <div key={product.id} className="flex items-center py-3 border-b border-neutral-100">
                        <div className="w-16 h-16 bg-neutral-100 rounded-md overflow-hidden mr-3">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <div className="flex items-center mt-1">
                            <button 
                              onClick={() => updateQuantity(product.id, product.bulkQuantity - 1)}
                              className="p-1 text-neutral-500 hover:text-neutral-700"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 text-sm">{product.bulkQuantity}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, product.bulkQuantity + 1)}
                              className="p-1 text-neutral-500 hover:text-neutral-700"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => removeFromCart(product.id)}
                              className="p-1 text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">
                            ${(getDiscountedPrice(product) * product.bulkQuantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-neutral-500 line-through">
                            ${(product.price * product.bulkQuantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Bulk Savings</span>
                      <span className="font-medium">-${getTotalSavings().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Delivery</span>
                      <span className="font-medium">FREE</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Checkout ({getTotalItems()} items)
                  </button>
                </>
              )}
              
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Info className="h-5 w-5 text-primary-600 mr-2" />
                  Bulk Order Benefits
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Save up to 20% on regular prices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Free delivery on all bulk orders</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Schedule delivery in advance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Perfect for events and parties</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bulk Order Benefits */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Order in Bulk?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">Save Money</h3>
              <p className="text-neutral-600">
                Enjoy discounts of up to 20% off regular prices when you order in bulk. The more you order, the more you save.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">Perfect for Groups</h3>
              <p className="text-neutral-600">
                Whether it's a birthday party, corporate event, or just friends getting together, bulk orders ensure everyone's needs are met.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold mb-2">Convenience</h3>
              <p className="text-neutral-600">
                Order once and stock up. Save time with scheduled deliveries and have everything you need for your event or personal use.
              </p>
            </div>
          </div>
        </div>
        
        {/* Popular Bulk Order Occasions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Bulk Order Occasions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg" 
                  alt="Birthday Celebrations" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Birthday Celebrations</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Make your birthday special with premium cannabis products for you and your guests.
                </p>
                <Link 
                  to="/birthday-packages" 
                  className="text-primary-600 hover:underline text-sm flex items-center"
                >
                  View Birthday Packages <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg" 
                  alt="Corporate Events" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Corporate Events</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Elevate your corporate gatherings with curated cannabis experiences for your team.
                </p>
                <Link 
                  to="/birthday-packages" 
                  className="text-primary-600 hover:underline text-sm flex items-center"
                >
                  View Corporate Packages <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg" 
                  alt="Gift Giving" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Gift Giving</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Show your appreciation with premium cannabis gifts for friends, family, or colleagues.
                </p>
                <Link 
                  to="/birthday-packages" 
                  className="text-primary-600 hover:underline text-sm flex items-center"
                >
                  View Gift Packages <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg" 
                  alt="Personal Stock" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Personal Stock</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Save money by stocking up on your favorite products with our bulk discounts.
                </p>
                <Link 
                  to="/shop" 
                  className="text-primary-600 hover:underline text-sm flex items-center"
                >
                  Shop All Products <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Bulk Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">R</span>
                </div>
                <div>
                  <h3 className="font-bold">Robert T.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "I ordered in bulk for my 40th birthday party and saved over $200! The quality was excellent, and everyone loved the variety. Will definitely order again for our next gathering."
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">L</span>
                </div>
                <div>
                  <h3 className="font-bold">Lisa M.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "As an event planner, I've used JFK Cannabis for multiple corporate retreats. Their bulk ordering system makes it easy to get exactly what we need, and the discounts are substantial."
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">D</span>
                </div>
                <div>
                  <h3 className="font-bold">David K.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "I stock up monthly with bulk orders and save a ton. The scheduled delivery option is super convenient, and I love that I can customize my order each time."
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">What is the minimum order for bulk discounts?</h3>
              <p className="text-neutral-600">
                Bulk discounts apply to any quantity of 5 or more of the same product. The more you order, the higher the discount percentage.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">How far in advance should I place my bulk order?</h3>
              <p className="text-neutral-600">
                We recommend placing bulk orders at least 7 days in advance to ensure availability. For very large orders, 14 days is preferred.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Can I mix different products in my bulk order?</h3>
              <p className="text-neutral-600">
                Yes! You can mix any products in your bulk order. Each product will receive its own bulk discount based on quantity and price.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Is there a delivery fee for bulk orders?</h3>
              <p className="text-neutral-600">
                No, all bulk orders qualify for free delivery within our service area. For locations outside our standard delivery zone, additional fees may apply.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Can I schedule a specific delivery time?</h3>
              <p className="text-neutral-600">
                Yes, you can select a preferred delivery date during checkout. For specific time windows, please add a note in the special instructions field.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">What if I need to change or cancel my bulk order?</h3>
              <p className="text-neutral-600">
                Changes or cancellations can be made up to 72 hours before your scheduled delivery. Contact our customer service team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Complete Your Bulk Order
                </h2>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {bulkCart.map((product) => (
                    <div key={product.id} className="flex items-center py-3 border-b border-neutral-100">
                      <div className="w-16 h-16 bg-neutral-100 rounded-md overflow-hidden mr-3">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-neutral-500">
                          Quantity: {product.bulkQuantity} × ${getDiscountedPrice(product).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(getDiscountedPrice(product) * product.bulkQuantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-green-600">
                          Save ${((product.price - getDiscountedPrice(product)) * product.bulkQuantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Bulk Savings</span>
                      <span className="font-medium">-${getTotalSavings().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Delivery</span>
                      <span className="font-medium">FREE</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                      Delivery Date *
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <p className="mt-1 text-xs text-neutral-500">
                      Please select a date at least 7 days from today
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-neutral-700 mb-1">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="specialInstructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add any special requests, delivery instructions, or notes about your order..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="font-medium">Important Information</h4>
                </div>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• All recipients must be 21+ with valid ID</li>
                  <li>• Orders can be modified up to 72 hours before delivery</li>
                  <li>• Delivery available within our service area only</li>
                  <li>• Payment will be processed upon order confirmation</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!deliveryDate}
                  className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center ${
                    deliveryDate 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Account Required</h2>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-600 mb-4">
                  You need to be logged in to place bulk orders. This helps us verify your age and manage your orders.
                </p>
                
                <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 text-primary-600 mr-2" />
                    <h4 className="font-medium">Why create an account?</h4>
                  </div>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Track your orders and delivery status</li>
                    <li>• Save your preferences for future orders</li>
                    <li>• Access exclusive member-only deals</li>
                    <li>• Verify your age once for all purchases</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/account"
                  className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/account"
                  className="flex-1 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOrders;
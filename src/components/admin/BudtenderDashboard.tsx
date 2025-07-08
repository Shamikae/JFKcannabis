import React, { useState, useEffect } from 'react';
import { 
  User, 
  Search, 
  ShoppingBag, 
  Clock, 
  Package, 
  Truck, 
  Calendar,
  Brain,
  Leaf,
  Zap,
  Check,
  X,
  AlertTriangle,
  Plus,
  Filter,
  RefreshCw,
  Clipboard,
  FileText
} from 'lucide-react';
import IDScanner from './IDScanner';
import CustomerProfileView from './CustomerProfileView';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  type: 'pickup' | 'delivery' | 'drive-thru';
  items: Array<{
    name: string;
    quantity: number;
    image?: string;
  }>;
  total: number;
  createdAt: string;
  estimatedReady?: string;
}

const BudtenderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'customers'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showIDScanner, setShowIDScanner] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [showCustomerProfile, setShowCustomerProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recentCustomers, setRecentCustomers] = useState<Array<{id: string, name: string, lastVisit: string}>>([]);
  
  useEffect(() => {
    // Simulate fetching orders
    const fetchOrders = async () => {
      setIsLoading(true);
      
      // Mock data
      const mockOrders: Order[] = [
        {
          id: 'ORD-001234',
          customer: {
            id: 'CUST-001',
            name: 'John Smith'
          },
          status: 'pending',
          type: 'pickup',
          items: [
            { name: 'Blue Dream 3.5g', quantity: 1, image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg' },
            { name: 'Cosmic Gummies', quantity: 2, image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg' }
          ],
          total: 65.50,
          createdAt: '2024-12-20T10:30:00Z',
          estimatedReady: '2024-12-20T11:00:00Z'
        },
        {
          id: 'ORD-001235',
          customer: {
            id: 'CUST-002',
            name: 'Sarah Johnson'
          },
          status: 'ready',
          type: 'delivery',
          items: [
            { name: 'Northern Lights Cart', quantity: 1, image: 'https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg' },
            { name: 'CBD Recovery Balm', quantity: 1, image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg' }
          ],
          total: 85.00,
          createdAt: '2024-12-20T09:45:00Z',
          estimatedReady: '2024-12-20T10:15:00Z'
        },
        {
          id: 'ORD-001236',
          customer: {
            id: 'CUST-003',
            name: 'Michael Brown'
          },
          status: 'ready',
          type: 'drive-thru',
          items: [
            { name: 'Gelato Pre-Rolls 5-Pack', quantity: 1, image: 'https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg' }
          ],
          total: 65.00,
          createdAt: '2024-12-20T10:00:00Z',
          estimatedReady: '2024-12-20T10:30:00Z'
        },
        {
          id: 'ORD-001237',
          customer: {
            id: 'CUST-004',
            name: 'Emily Davis'
          },
          status: 'completed',
          type: 'pickup',
          items: [
            { name: 'Sativa Sunrise 12-Pack', quantity: 1, image: 'https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg' },
            { name: 'Strawberry Lemonade THC Drink', quantity: 2, image: 'https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg' }
          ],
          total: 144.00,
          createdAt: '2024-12-20T08:15:00Z',
          estimatedReady: '2024-12-20T08:45:00Z'
        }
      ];
      
      // Mock recent customers
      const mockRecentCustomers = [
        { id: 'CUST-001', name: 'John Smith', lastVisit: '2024-12-20T10:30:00Z' },
        { id: 'CUST-002', name: 'Sarah Johnson', lastVisit: '2024-12-20T09:45:00Z' },
        { id: 'CUST-005', name: 'David Wilson', lastVisit: '2024-12-19T14:20:00Z' },
        { id: 'CUST-006', name: 'Jessica Williams', lastVisit: '2024-12-19T11:15:00Z' },
        { id: 'CUST-007', name: 'Robert Green', lastVisit: '2024-12-18T16:30:00Z' }
      ];
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setRecentCustomers(mockRecentCustomers);
      setIsLoading(false);
    };
    
    fetchOrders();
  }, []);
  
  useEffect(() => {
    // Filter orders based on status, type, and search term
    let filtered = [...orders];
    
    if (orderStatusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === orderStatusFilter);
    }
    
    if (orderTypeFilter !== 'all') {
      filtered = filtered.filter(order => order.type === orderTypeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, orderStatusFilter, orderTypeFilter, searchTerm]);
  
  const handleIDScanComplete = (idData: any) => {
    console.log('ID Scan Complete:', idData);
    setShowIDScanner(false);
    
    // In a real implementation, this would search for the customer in the database
    // For demo purposes, just show the customer profile
    setSelectedCustomerId('CUST-001');
    setShowCustomerProfile(true);
  };
  
  const handleOrderStatusChange = (orderId: string, newStatus: 'pending' | 'ready' | 'completed' | 'cancelled') => {
    // Update order status
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Ready
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };
  
  const getOrderTypeBadge = (type: string) => {
    switch (type) {
      case 'pickup':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Package className="h-3 w-3 mr-1" />
            Pickup
          </span>
        );
      case 'delivery':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Truck className="h-3 w-3 mr-1" />
            Delivery
          </span>
        );
      case 'drive-thru':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <Truck className="h-3 w-3 mr-1" />
            Drive-Thru
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Budtender Dashboard</h1>
        <p className="text-gray-600">Manage orders and customers</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setShowIDScanner(true)}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-primary-100 rounded-lg mr-3">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium">Scan Customer ID</h3>
            <p className="text-sm text-gray-500">Verify age and find customer</p>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('orders')}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-blue-100 rounded-lg mr-3">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Manage Orders</h3>
            <p className="text-sm text-gray-500">View and process orders</p>
          </div>
        </button>
        
        <button
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-green-100 rounded-lg mr-3">
            <Brain className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">AI Recommendations</h3>
            <p className="text-sm text-gray-500">Get product suggestions</p>
          </div>
        </button>
        
        <button
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-purple-100 rounded-lg mr-3">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">Daily Report</h3>
            <p className="text-sm text-gray-500">View today's summary</p>
          </div>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 inline mr-2" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'customers'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5 inline mr-2" />
                  Customers
                </button>
              </nav>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'orders' && (
                <div>
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search orders by ID or customer name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <select
                      value={orderTypeFilter}
                      onChange={(e) => setOrderTypeFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Types</option>
                      <option value="pickup">Pickup</option>
                      <option value="delivery">Delivery</option>
                      <option value="drive-thru">Drive-Thru</option>
                    </select>
                    
                    <button
                      onClick={() => {
                        setOrderStatusFilter('all');
                        setOrderTypeFilter('all');
                        setSearchTerm('');
                      }}
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      Reset
                    </button>
                  </div>
                  
                  {/* Orders List */}
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
                      ))}
                    </div>
                  ) : filteredOrders.length > 0 ? (
                    <div className="space-y-4">
                      {filteredOrders.map(order => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium text-lg">{order.id}</h3>
                                <span className="ml-3">{getStatusBadge(order.status)}</span>
                                <span className="ml-2">{getOrderTypeBadge(order.type)}</span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()} • 
                                <button 
                                  onClick={() => {
                                    setSelectedCustomerId(order.customer.id);
                                    setShowCustomerProfile(true);
                                  }}
                                  className="ml-1 text-primary-600 hover:underline"
                                >
                                  {order.customer.name}
                                </button>
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-3">
                            <h4 className="font-medium mb-2">Items</h4>
                            <div className="flex flex-wrap gap-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg">
                                  {item.image && (
                                    <LazyLoadImage
                                      src={item.image}
                                      alt={item.name}
                                      className="w-10 h-10 object-cover rounded-md mr-2"
                                      effect="blur"
                                      threshold={200}
                                    />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 mt-3 pt-3 flex flex-wrap gap-2">
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleOrderStatusChange(order.id, 'ready')}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm"
                              >
                                Mark Ready
                              </button>
                            )}
                            {order.status === 'ready' && (
                              <button
                                onClick={() => handleOrderStatusChange(order.id, 'completed')}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
                              >
                                Complete Order
                              </button>
                            )}
                            {(order.status === 'pending' || order.status === 'ready') && (
                              <button
                                onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm ml-auto"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h4 className="text-lg font-medium mb-1">No orders found</h4>
                      <p className="text-gray-500">
                        {searchTerm || orderStatusFilter !== 'all' || orderTypeFilter !== 'all'
                          ? 'Try adjusting your filters'
                          : 'No orders have been placed yet'}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'customers' && (
                <div>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search customers by name, email, or phone..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowIDScanner(true)}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Scan ID
                    </button>
                  </div>
                  
                  {recentCustomers.length > 0 ? (
                    <div>
                      <h3 className="font-medium mb-4">Recent Customers</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentCustomers.map(customer => (
                          <div 
                            key={customer.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => {
                              setSelectedCustomerId(customer.id);
                              setShowCustomerProfile(true);
                            }}
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{customer.name}</h4>
                                <p className="text-sm text-gray-500">
                                  Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h4 className="text-lg font-medium mb-1">Scan Customer ID</h4>
                      <p className="text-gray-500 mb-4">
                        Scan a customer's ID to view their profile and purchase history
                      </p>
                      <button
                        onClick={() => setShowIDScanner(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        Scan ID
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 mr-2" />
              Today's Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Sales</span>
                <span className="font-medium">$1,876.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Order Value</span>
                <span className="font-medium">$78.19</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Customers Served</span>
                <span className="font-medium">18</span>
              </div>
            </div>
          </div>
          
          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-4 text-white">
            <h3 className="font-medium mb-3 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              AI Recommendations
            </h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                <h4 className="font-medium mb-1">For Sleep Issues</h4>
                <p className="text-sm opacity-90 mb-2">Recommend products with CBN and myrcene terpenes</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">CBN Sleep Tincture</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">Indica Pre-Rolls</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                <h4 className="font-medium mb-1">For Anxiety Relief</h4>
                <p className="text-sm opacity-90 mb-2">Suggest balanced CBD:THC products with linalool</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">1:1 Tincture</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">CBD Gummies</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-3 bg-white text-primary-600 py-2 rounded-lg text-sm font-medium">
              View All Recommendations
            </button>
          </div>
          
          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-3">Quick Links</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm flex items-center">
                <Clipboard className="h-4 w-4 text-gray-500 mr-2" />
                Daily Inventory Report
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm flex items-center">
                <Leaf className="h-4 w-4 text-gray-500 mr-2" />
                Product Knowledge Base
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm flex items-center">
                <Zap className="h-4 w-4 text-gray-500 mr-2" />
                Terpene Guide
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 text-gray-500 mr-2" />
                Compliance Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ID Scanner Modal */}
      {showIDScanner && (
        <IDScanner 
          onScanComplete={handleIDScanComplete}
          onClose={() => setShowIDScanner(false)}
        />
      )}
      
      {/* Customer Profile Modal */}
      {showCustomerProfile && selectedCustomerId && (
        <CustomerProfileView 
          customerId={selectedCustomerId}
          onClose={() => setShowCustomerProfile(false)}
        />
      )}
    </div>
  );
};

export default BudtenderDashboard;
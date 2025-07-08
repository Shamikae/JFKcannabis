import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShoppingBag, 
  Star, 
  Clock, 
  DollarSign,
  Leaf,
  Zap,
  Package,
  Brain,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';

interface UserProfileProps {
  userId: string;
  onClose: () => void;
}

const UserProfileView: React.FC<UserProfileProps> = ({ userId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'preferences' | 'analytics' | 'predictions'>('overview');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showSmsForm, setShowSmsForm] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');
  const [showPredictions, setShowPredictions] = useState(false);
  
  // Mock user data - in a real app, this would come from an API
  const user = {
    id: userId,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    joinDate: '2023-09-10',
    lastActive: '2024-12-20T14:30:00Z',
    membershipTier: 'gold',
    address: {
      street: '123 Main St',
      city: 'Queens',
      state: 'NY',
      zipCode: '11434'
    },
    stats: {
      totalOrders: 24,
      totalSpent: 1250.00,
      averageOrderValue: 52.08,
      rewardsPoints: 2450,
      lastOrderDate: '2024-12-18'
    },
    preferences: {
      strainTypes: ['hybrid', 'indica'],
      effects: ['relaxed', 'happy', 'sleepy'],
      categories: ['flower', 'edibles', 'vapes'],
      terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
      potencyRange: [15, 25]
    },
    orders: [
      {
        id: 'ord-001',
        date: '2024-12-18T10:30:00Z',
        total: 65.50,
        status: 'delivered',
        items: [
          { name: 'Blue Dream 3.5g', price: 45.00, quantity: 1 },
          { name: 'Cosmic Gummies', price: 20.50, quantity: 1 }
        ],
        deliveryMethod: 'delivery'
      },
      {
        id: 'ord-002',
        date: '2024-12-05T15:45:00Z',
        total: 85.00,
        status: 'delivered',
        items: [
          { name: 'Northern Lights Cart', price: 50.00, quantity: 1 },
          { name: 'CBD Recovery Balm', price: 35.00, quantity: 1 }
        ],
        deliveryMethod: 'pickup'
      },
      {
        id: 'ord-003',
        date: '2024-11-22T12:15:00Z',
        total: 120.00,
        status: 'delivered',
        items: [
          { name: 'Gelato Pre-Rolls 5-Pack', price: 65.00, quantity: 1 },
          { name: 'Strawberry Lemonade THC Drink', price: 12.00, quantity: 2 },
          { name: 'CBN Sleep Tincture', price: 40.00, quantity: 1 }
        ],
        deliveryMethod: 'delivery'
      }
    ],
    analytics: {
      purchaseTimeDistribution: [
        { time: 'Morning (6am-12pm)', percentage: 15 },
        { time: 'Afternoon (12pm-5pm)', percentage: 35 },
        { time: 'Evening (5pm-9pm)', percentage: 45 },
        { time: 'Night (9pm-6am)', percentage: 5 }
      ],
      categoryDistribution: [
        { category: 'Flower', percentage: 40 },
        { category: 'Edibles', percentage: 25 },
        { category: 'Vapes', percentage: 20 },
        { category: 'Pre-Rolls', percentage: 10 },
        { category: 'Other', percentage: 5 }
      ],
      deliveryMethodDistribution: [
        { method: 'Delivery', percentage: 65 },
        { method: 'Pickup', percentage: 35 }
      ],
      averageDaysBetweenOrders: 12.5,
      mostFrequentDayOfWeek: 'Friday',
      mostFrequentTimeOfDay: '6:00 PM - 8:00 PM'
    },
    predictions: {
      nextPurchaseDate: '2024-12-30',
      nextPurchaseTimeframe: 'Evening (5pm-9pm)',
      predictedItems: [
        { name: 'Blue Dream 3.5g', probability: 0.85, reason: 'Purchased 3 times in the last 6 months' },
        { name: 'Cosmic Gummies', probability: 0.72, reason: 'Frequently purchased with Blue Dream' },
        { name: 'Northern Lights Cart', probability: 0.65, reason: 'Purchased twice in the last 3 months' }
      ],
      predictedSpend: 75.50,
      predictedDeliveryMethod: 'delivery',
      recommendedPromotions: [
        '15% off Blue Dream flower',
        'Buy one get one 50% off vape cartridges',
        'Free delivery on orders over $50'
      ]
    }
  };
  
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email
    alert(`Email sent to ${user.email} with subject: ${emailSubject}`);
    setShowEmailForm(false);
    setEmailSubject('');
    setEmailBody('');
  };
  
  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the SMS
    alert(`SMS sent to ${user.phone}: ${smsMessage}`);
    setShowSmsForm(false);
    setSmsMessage('');
  };
  
  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'platinum':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'preferences'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Preferences
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'predictions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Predictions
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <User className="h-8 w-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(user.membershipTier)}`}>
                            {user.membershipTier.charAt(0).toUpperCase() + user.membershipTier.slice(1)} Member
                          </span>
                          <span className="ml-2 flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {user.stats.rewardsPoints} points
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Address</h4>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p>{user.address.street}</p>
                          <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Purchase Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">Total Orders</span>
                        </div>
                        <span className="font-medium">{user.stats.totalOrders}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">Total Spent</span>
                        </div>
                        <span className="font-medium">${user.stats.totalSpent.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">Avg Order Value</span>
                        </div>
                        <span className="font-medium">${user.stats.averageOrderValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">Last Order</span>
                        </div>
                        <span className="font-medium">{new Date(user.stats.lastOrderDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Contact Customer</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowEmailForm(!showEmailForm)}
                        className="w-full flex items-center justify-center p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </button>
                      <button
                        onClick={() => setShowSmsForm(!showSmsForm)}
                        className="w-full flex items-center justify-center p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Send SMS
                      </button>
                    </div>
                    
                    {showEmailForm && (
                      <form onSubmit={handleSendEmail} className="mt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowEmailForm(false)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 bg-primary-600 text-white rounded-md"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    )}
                    
                    {showSmsForm && (
                      <form onSubmit={handleSendSms} className="mt-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            value={smsMessage}
                            onChange={(e) => setSmsMessage(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowSmsForm(false)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 bg-green-600 text-white rounded-md"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Order History</h3>
                
                {user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map(order => (
                      <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <span className="font-medium">Order #{order.id}</span>
                            <span className="ml-3 text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">${order.total.toFixed(2)}</span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 text-gray-400 mr-2" />
                                  <span>{item.name}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-500">{item.quantity} × </span>
                                  <span className="font-medium">${item.price.toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center text-sm">
                            <Truck className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="capitalize">{order.deliveryMethod}</span>
                          </div>
                          <button className="text-primary-600 text-sm hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="text-lg font-medium mb-1">No orders yet</h4>
                    <p className="text-gray-500">This customer hasn't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Cannabis Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      Strain Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.strainTypes.map(type => (
                        <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Zap className="h-5 w-5 text-purple-600 mr-2" />
                      Desired Effects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.effects.map(effect => (
                        <span key={effect} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {effect.charAt(0).toUpperCase() + effect.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Package className="h-5 w-5 text-blue-600 mr-2" />
                      Product Categories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.categories.map(category => (
                        <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Beaker className="h-5 w-5 text-orange-600 mr-2" />
                      Terpene Preferences
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.terpenes.map(terpene => (
                        <span key={terpene} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                          {terpene}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Potency Preference</h4>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>THC Range: {user.preferences.potencyRange[0]}% - {user.preferences.potencyRange[1]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${(user.preferences.potencyRange[1] / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">User Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Purchase Time Distribution</h4>
                    <div className="space-y-3">
                      {user.analytics.purchaseTimeDistribution.map(item => (
                        <div key={item.time}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.time}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Category Distribution</h4>
                    <div className="space-y-3">
                      {user.analytics.categoryDistribution.map(item => (
                        <div key={item.category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.category}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Delivery Method Distribution</h4>
                    <div className="space-y-3">
                      {user.analytics.deliveryMethodDistribution.map(item => (
                        <div key={item.method}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.method}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-purple-600 h-2.5 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Purchase Patterns</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Days Between Orders:</span>
                        <span className="font-medium">{user.analytics.averageDaysBetweenOrders} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Most Frequent Day:</span>
                        <span className="font-medium">{user.analytics.mostFrequentDayOfWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Most Frequent Time:</span>
                        <span className="font-medium">{user.analytics.mostFrequentTimeOfDay}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Predictions Tab */}
            {activeTab === 'predictions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">AI Predictions</h3>
                  <button
                    onClick={() => setShowPredictions(!showPredictions)}
                    className="flex items-center text-primary-600 text-sm"
                  >
                    <Brain className="h-4 w-4 mr-1" />
                    {showPredictions ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                
                {showPredictions ? (
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
                    <div className="flex items-center mb-4">
                      <Brain className="h-6 w-6 mr-2" />
                      <h4 className="text-lg font-medium">AI-Generated Customer Predictions</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">Next Purchase Prediction</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="opacity-80">Estimated Date:</span>
                            <span className="font-medium">{new Date(user.predictions.nextPurchaseDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-80">Likely Timeframe:</span>
                            <span className="font-medium">{user.predictions.nextPurchaseTimeframe}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-80">Estimated Spend:</span>
                            <span className="font-medium">${user.predictions.predictedSpend.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-80">Likely Method:</span>
                            <span className="font-medium capitalize">{user.predictions.predictedDeliveryMethod}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Predicted Items</h5>
                        <div className="space-y-2">
                          {user.predictions.predictedItems.map((item, index) => (
                            <div key={index} className="bg-white bg-opacity-10 rounded p-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                                  {(item.probability * 100).toFixed(0)}% likely
                                </span>
                              </div>
                              <p className="text-xs opacity-80 mt-1">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="font-medium mb-2">Recommended Promotions</h5>
                      <div className="space-y-2">
                        {user.predictions.recommendedPromotions.map((promo, index) => (
                          <div key={index} className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{promo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => {
                          setShowEmailForm(true);
                          setEmailSubject('Special Offer Just For You');
                          setEmailBody(`Hi ${user.name},\n\nBased on your preferences, we thought you might enjoy our latest ${user.predictions.predictedItems[0].name}. Use code SPECIAL15 for 15% off your next purchase.\n\nBest regards,\nJFK Cannabis Team`);
                        }}
                        className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-opacity-90"
                      >
                        <Send className="h-4 w-4 mr-2 inline-block" />
                        Send Personalized Offer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="text-lg font-medium mb-2">AI Predictions Available</h4>
                    <p className="text-gray-600 mb-4">
                      Our AI has analyzed this customer's purchase history and preferences to generate personalized predictions.
                    </p>
                    <button
                      onClick={() => setShowPredictions(true)}
                      className="btn-primary"
                    >
                      View Predictions
                    </button>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium mb-4">Marketing Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setShowEmailForm(true);
                        setEmailSubject('Special Offer Just For You');
                        setEmailBody(`Hi ${user.name},\n\nBased on your preferences, we thought you might enjoy our latest ${user.preferences.strainTypes[0]} products. Use code SPECIAL15 for 15% off your next purchase.\n\nBest regards,\nJFK Cannabis Team`);
                      }}
                      className="flex items-center justify-center p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Send Personalized Email
                    </button>
                    <button
                      onClick={() => {
                        setShowSmsForm(true);
                        setSmsMessage(`JFK Cannabis: Hi ${user.name.split(' ')[0]}, we have new ${user.preferences.strainTypes[0]} products you might like! Show this text for 10% off your next purchase.`);
                      }}
                      className="flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Send Personalized SMS
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
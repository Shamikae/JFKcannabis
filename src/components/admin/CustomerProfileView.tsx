import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Star, 
  Clock, 
  Brain,
  Leaf,
  Beaker,
  Package,
  Check,
  X,
  Camera,
  FileText,
  AlertTriangle,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Save
} from 'lucide-react';

interface CustomerProfileProps {
  customerId: string;
  onClose: () => void;
}

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  idVerification: {
    verified: boolean;
    expirationDate: string;
    idType: 'drivers_license' | 'state_id' | 'passport';
    idNumber: string;
    idImage?: string;
  };
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  rewardsPoints: number;
  joinDate: string;
  lastActive: string;
  purchaseHistory: {
    id: string;
    date: string;
    total: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  }[];
  preferences: {
    strainTypes: string[];
    effects: string[];
    categories: string[];
    terpenes: string[];
    potencyRange: [number, number];
  };
  notes: string;
  aiInsights: {
    recommendedProducts: Array<{
      id: string;
      name: string;
      reason: string;
    }>;
    healthSuggestions: Array<{
      condition: string;
      suggestion: string;
      cannabinoids: string[];
      terpenes: string[];
    }>;
    behaviorPatterns: {
      preferredTime: string;
      preferredCategories: string[];
      averagePurchaseFrequency: string;
    };
  };
}

const CustomerProfileView: React.FC<CustomerProfileProps> = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'preferences' | 'insights' | 'id'>('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showIdImage, setShowIdImage] = useState(false);
  
  useEffect(() => {
    // In a real implementation, this would fetch customer data from an API
    const fetchCustomer = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock customer data
        const mockCustomer: CustomerData = {
          id: customerId,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          dateOfBirth: '1985-06-15',
          address: {
            street: '123 Main St, Apt 4B',
            city: 'Queens',
            state: 'NY',
            zipCode: '11434'
          },
          idVerification: {
            verified: true,
            expirationDate: '2026-06-15',
            idType: 'drivers_license',
            idNumber: 'NY12345678',
            idImage: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg'
          },
          membershipTier: 'gold',
          rewardsPoints: 2450,
          joinDate: '2023-09-10',
          lastActive: '2024-12-20T14:30:00Z',
          purchaseHistory: [
            {
              id: 'ORD-001234',
              date: '2024-12-18T10:30:00Z',
              total: 65.50,
              items: [
                { name: 'Blue Dream 3.5g', quantity: 1, price: 45.00 },
                { name: 'Cosmic Gummies', quantity: 1, price: 20.50 }
              ]
            },
            {
              id: 'ORD-001235',
              date: '2024-12-05T15:45:00Z',
              total: 85.00,
              items: [
                { name: 'Northern Lights Cart', quantity: 1, price: 50.00 },
                { name: 'CBD Recovery Balm', quantity: 1, price: 35.00 }
              ]
            }
          ],
          preferences: {
            strainTypes: ['hybrid', 'indica'],
            effects: ['relaxed', 'happy', 'sleepy'],
            categories: ['flower', 'edibles', 'vapes'],
            terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
            potencyRange: [15, 25]
          },
          notes: 'Customer prefers indica strains for evening use. Has mentioned using cannabis for sleep and anxiety. Interested in trying new edible products.',
          aiInsights: {
            recommendedProducts: [
              { 
                id: 'prod-001', 
                name: 'Northern Lights Flower', 
                reason: 'Based on preference for indica strains and sleep effects' 
              },
              { 
                id: 'prod-002', 
                name: 'CBN Sleep Gummies', 
                reason: 'Matches interest in edibles and sleep aid' 
              },
              { 
                id: 'prod-003', 
                name: 'Myrcene-Rich Vape Cart', 
                reason: 'Contains preferred terpene profile' 
              }
            ],
            healthSuggestions: [
              {
                condition: 'Anxiety',
                suggestion: 'Products with CBD and the terpene linalool may help reduce anxiety symptoms',
                cannabinoids: ['CBD', 'CBG'],
                terpenes: ['Linalool', 'Limonene']
              },
              {
                condition: 'Sleep',
                suggestion: 'Products with CBN and myrcene may help improve sleep quality',
                cannabinoids: ['CBN', 'THC'],
                terpenes: ['Myrcene', 'Linalool']
              }
            ],
            behaviorPatterns: {
              preferredTime: 'Evening (6pm-9pm)',
              preferredCategories: ['Flower', 'Edibles'],
              averagePurchaseFrequency: '12 days'
            }
          }
        };
        
        setCustomer(mockCustomer);
        setNotes(mockCustomer.notes);
        setLoading(false);
      }, 1000);
    };
    
    fetchCustomer();
  }, [customerId]);
  
  const handleSaveNotes = () => {
    if (customer) {
      // In a real implementation, this would update the customer notes via API
      setCustomer({
        ...customer,
        notes
      });
      setIsEditingNotes(false);
    }
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
  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p>Customer not found. Please try again.</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Customer Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Customer Header */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{customer.firstName} {customer.lastName}</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(customer.membershipTier)}`}>
                    {customer.membershipTier.charAt(0).toUpperCase() + customer.membershipTier.slice(1)} Member
                  </span>
                  <span className="ml-2 flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {customer.rewardsPoints} points
                  </span>
                  {customer.idVerification.verified && (
                    <span className="ml-2 flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      ID Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
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
                onClick={() => setActiveTab('purchases')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'purchases'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Purchase History
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
                onClick={() => setActiveTab('insights')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'insights'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI Insights
              </button>
              <button
                onClick={() => setActiveTab('id')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'id'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ID Verification
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{new Date(customer.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p>{customer.address.street}</p>
                        <p>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium">Notes</h3>
                      {isEditingNotes ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setIsEditingNotes(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={handleSaveNotes}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setIsEditingNotes(true)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    {isEditingNotes ? (
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-700">{customer.notes}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recent Purchases</h3>
                    {customer.purchaseHistory.length > 0 ? (
                      <div className="space-y-3">
                        {customer.purchaseHistory.slice(0, 2).map(purchase => (
                          <div key={purchase.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">Order #{purchase.id}</span>
                                <span className="ml-3 text-sm text-gray-500">
                                  {new Date(purchase.date).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="font-medium">${purchase.total.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {purchase.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {customer.purchaseHistory.length > 2 && (
                          <button 
                            onClick={() => setActiveTab('purchases')}
                            className="text-primary-600 hover:underline text-sm"
                          >
                            View all {customer.purchaseHistory.length} orders
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">No purchase history available.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-3">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent</span>
                        <span className="font-medium">
                          ${customer.purchaseHistory.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders</span>
                        <span className="font-medium">{customer.purchaseHistory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Order Value</span>
                        <span className="font-medium">
                          ${(customer.purchaseHistory.reduce((sum, order) => sum + order.total, 0) / 
                            (customer.purchaseHistory.length || 1)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active</span>
                        <span className="font-medium">
                          {new Date(customer.lastActive).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3 text-primary-800">AI Product Recommendations</h3>
                    <div className="space-y-2">
                      {customer.aiInsights.recommendedProducts.map((product, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-primary-100">
                          <p className="font-medium text-primary-700">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Purchase History Tab */}
            {activeTab === 'purchases' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Purchase History</h3>
                {customer.purchaseHistory.length > 0 ? (
                  <div className="space-y-4">
                    {customer.purchaseHistory.map(purchase => (
                      <div key={purchase.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <span className="font-medium">Order #{purchase.id}</span>
                            <span className="ml-3 text-sm text-gray-500">
                              {new Date(purchase.date).toLocaleDateString()} at {new Date(purchase.date).toLocaleTimeString()}
                            </span>
                          </div>
                          <span className="font-medium">${purchase.total.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="space-y-2">
                            {purchase.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
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
              <div>
                <h3 className="text-lg font-medium mb-4">Cannabis Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      Strain Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {customer.preferences.strainTypes.map(type => (
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
                      {customer.preferences.effects.map(effect => (
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
                      {customer.preferences.categories.map(category => (
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
                      {customer.preferences.terpenes.map(terpene => (
                        <span key={terpene} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                          {terpene}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium mb-3">Potency Preference</h4>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>THC Range: {customer.preferences.potencyRange[0]}% - {customer.preferences.potencyRange[1]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${(customer.preferences.potencyRange[1] / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI Insights Tab */}
            {activeTab === 'insights' && (
              <div>
                <h3 className="text-lg font-medium mb-4">AI-Generated Insights</h3>
                
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center mb-4">
                    <Brain className="h-6 w-6 mr-2" />
                    <h4 className="text-lg font-medium">Health & Wellness Suggestions</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {customer.aiInsights.healthSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-white bg-opacity-10 rounded p-4">
                        <h5 className="font-medium mb-2">For {suggestion.condition}</h5>
                        <p className="text-sm mb-3">{suggestion.suggestion}</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.cannabinoids.map(cannabinoid => (
                            <span key={cannabinoid} className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                              {cannabinoid}
                            </span>
                          ))}
                          {suggestion.terpenes.map(terpene => (
                            <span key={terpene} className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                              {terpene}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-white text-opacity-80">
                    <p>These suggestions are based on reported effects and scientific studies. Not medical advice.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Behavior Patterns</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Time</span>
                        <span className="font-medium">{customer.aiInsights.behaviorPatterns.preferredTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Categories</span>
                        <span className="font-medium">{customer.aiInsights.behaviorPatterns.preferredCategories.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Frequency</span>
                        <span className="font-medium">Every {customer.aiInsights.behaviorPatterns.averagePurchaseFrequency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Product Recommendations</h4>
                    <div className="space-y-2">
                      {customer.aiInsights.recommendedProducts.map((product, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-gray-200">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
                      <p className="text-sm text-yellow-700">
                        These insights are generated based on purchase history, preferences, and anonymized data patterns.
                        They are not medical advice. All health-related suggestions should be discussed with healthcare professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* ID Verification Tab */}
            {activeTab === 'id' && (
              <div>
                <h3 className="text-lg font-medium mb-4">ID Verification</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        customer.idVerification.verified 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {customer.idVerification.verified ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <X className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {customer.idVerification.verified ? 'Verified' : 'Not Verified'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {customer.idVerification.verified 
                            ? `Expires: ${new Date(customer.idVerification.expirationDate).toLocaleDateString()}`
                            : 'ID verification required'
                          }
                        </p>
                      </div>
                    </div>
                    
                    {customer.idVerification.verified && (
                      <button
                        onClick={() => setShowIdImage(!showIdImage)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        {showIdImage ? 'Hide ID' : 'View ID'}
                      </button>
                    )}
                  </div>
                  
                  {showIdImage && customer.idVerification.idImage && (
                    <div className="mt-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={customer.idVerification.idImage} 
                          alt="Customer ID" 
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ID images are stored securely and encrypted. Access is logged.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">ID Type</p>
                        <p className="font-medium capitalize">
                          {customer.idVerification.idType.replace('_', ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ID Number</p>
                        <p className="font-medium">{customer.idVerification.idNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!customer.idVerification.verified && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Verify ID</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Type
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="drivers_license">Driver's License</option>
                          <option value="state_id">State ID</option>
                          <option value="passport">Passport</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Upload ID Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
                      >
                        Verify ID
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">OCM Compliance</h4>
                      <p className="text-sm text-blue-700">
                        According to New York State OCM regulations, all customers must be 21+ with valid ID.
                        ID verification is required for all cannabis purchases and must be stored securely.
                      </p>
                    </div>
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

export default CustomerProfileView;
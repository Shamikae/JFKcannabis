import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Mail,
  Truck,
  DollarSign,
  Percent,
  Database,
  Key,
  Lock,
  Save,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    // Simulate saving
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your store settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'general' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>General</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'users' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>User Management</span>
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'payment' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payment Methods</span>
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'shipping' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Truck className="h-5 w-5 mr-3" />
                <span>Shipping & Delivery</span>
              </button>
              <button
                onClick={() => setActiveTab('tax')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'tax' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Percent className="h-5 w-5 mr-3" />
                <span>Tax Settings</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'notifications' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'security' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'integrations' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Database className="h-5 w-5 mr-3" />
                <span>Integrations</span>
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                  activeTab === 'api' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Key className="h-5 w-5 mr-3" />
                <span>API Keys</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-bold mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Store Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Store Name
                        </label>
                        <input
                          type="text"
                          defaultValue="JFK Cannabis"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Store Email
                        </label>
                        <input
                          type="email"
                          defaultValue="info@jfkcannabis.com"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="(555) 123-4567"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Store Currency
                        </label>
                        <select
                          defaultValue="USD"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Store Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          defaultValue="175-01 Rockaway Blvd"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue="Queens"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          defaultValue="NY"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          defaultValue="11434"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          defaultValue="United States"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Day
                          </label>
                          <input
                            type="text"
                            defaultValue="Monday - Saturday"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Opening Time
                          </label>
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Closing Time
                          </label>
                          <input
                            type="time"
                            defaultValue="22:00"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Day
                          </label>
                          <input
                            type="text"
                            defaultValue="Sunday"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Opening Time
                          </label>
                          <input
                            type="time"
                            defaultValue="10:00"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Closing Time
                          </label>
                          <input
                            type="time"
                            defaultValue="20:00"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Payment Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Credit/Debit Cards</h4>
                            <p className="text-sm text-gray-500">Accept Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <DollarSign className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Cash on Delivery</h4>
                            <p className="text-sm text-gray-500">Accept cash payments on delivery</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Gateway</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          API Key
                        </label>
                        <input
                          type="password"
                          defaultValue="sk_test_51HZ6qEKG5..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Webhook Secret
                        </label>
                        <input
                          type="password"
                          defaultValue="whsec_1234567890..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="test-mode"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="test-mode" className="ml-2 block text-sm text-gray-700">
                          Enable Test Mode
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === 'shipping' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Shipping & Delivery Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Delivery Zones</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Zone 1: Queens</h4>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Delivery Fee
                            </label>
                            <input
                              type="text"
                              defaultValue="$5.00"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Free Delivery Threshold
                            </label>
                            <input
                              type="text"
                              defaultValue="$60.00"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Estimated Delivery Time
                            </label>
                            <input
                              type="text"
                              defaultValue="60-90 minutes"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP Codes
                            </label>
                            <input
                              type="text"
                              defaultValue="11434, 11435, 11436"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Zone 2: Nassau County</h4>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Delivery Fee
                            </label>
                            <input
                              type="text"
                              defaultValue="$8.00"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Free Delivery Threshold
                            </label>
                            <input
                              type="text"
                              defaultValue="$100.00"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Estimated Delivery Time
                            </label>
                            <input
                              type="text"
                              defaultValue="90-120 minutes"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP Codes
                            </label>
                            <input
                              type="text"
                              defaultValue="11550, 11551, 11552"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center text-primary-600 hover:text-primary-700">
                        <Plus className="h-4 w-4 mr-1" />
                        <span>Add Delivery Zone</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Pickup Settings</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preparation Time
                        </label>
                        <input
                          type="text"
                          defaultValue="30 minutes"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pickup Instructions
                        </label>
                        <textarea
                          defaultValue="Please bring your ID and order confirmation. Enter through the main entrance and proceed to the express pickup counter."
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="enable-pickup"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="enable-pickup" className="ml-2 block text-sm text-gray-700">
                          Enable In-Store Pickup
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tax Settings */}
            {activeTab === 'tax' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Tax Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Tax Rates</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">New York Cannabis Tax</h4>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tax Rate
                            </label>
                            <input
                              type="text"
                              defaultValue="13%"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Applies To
                            </label>
                            <input
                              type="text"
                              defaultValue="All cannabis products"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">New York Sales Tax</h4>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tax Rate
                            </label>
                            <input
                              type="text"
                              defaultValue="8.875%"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Applies To
                            </label>
                            <input
                              type="text"
                              defaultValue="Non-cannabis products"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center text-primary-600 hover:text-primary-700">
                        <Plus className="h-4 w-4 mr-1" />
                        <span>Add Tax Rate</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Tax Settings</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="prices-include-tax"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="prices-include-tax" className="ml-2 block text-sm text-gray-700">
                            Prices include tax
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="display-tax-totals"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="display-tax-totals" className="ml-2 block text-sm text-gray-700">
                            Display tax totals on product pages
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="separate-tax-items"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="separate-tax-items" className="ml-2 block text-sm text-gray-700">
                            Show separate tax items in cart and checkout
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Authentication</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Require 2FA for admin users</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Password Requirements</h4>
                            <p className="text-sm text-gray-500">Enforce strong password policy</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Session Timeout</h4>
                            <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                          </div>
                          <select
                            defaultValue="30"
                            className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Privacy & Compliance</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Age Verification</h4>
                            <p className="text-sm text-gray-500">Require age verification for all visitors</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cookie Consent</h4>
                            <p className="text-sm text-gray-500">Show cookie consent banner</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Data Retention</h4>
                            <p className="text-sm text-gray-500">Customer data retention period</p>
                          </div>
                          <select
                            defaultValue="365"
                            className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="90">90 days</option>
                            <option value="180">180 days</option>
                            <option value="365">1 year</option>
                            <option value="730">2 years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
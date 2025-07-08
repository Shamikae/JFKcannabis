import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Clock, CreditCard, LogOut, Star, Award, Camera, Settings, Calendar, AlertTriangle, Brain } from 'lucide-react';
import AskAI from '../components/AskAI';

// Account components
const AccountOverview: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showAskAI, setShowAskAI] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Overview</h2>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center mb-6">
            <div className="relative mr-6">
              <div className="w-24 h-24 bg-neutral-200 rounded-full overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-12 w-12 text-neutral-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-neutral-600">Gold VIP Member</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm">2,450 Rewards Points</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Full Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Phone</p>
              <p className="font-medium">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Date of Birth</p>
              <p className="font-medium">January 1, 1990</p>
            </div>
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:underline">
            Edit Profile
          </button>
        </div>

        {/* Cannabis Preferences */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium mb-4">Cannabis Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Preferred Strain Types</h4>
              <div className="flex flex-wrap gap-2">
                {['Hybrid', 'Indica'].map(type => (
                  <span key={type} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Preferred Effects</h4>
              <div className="flex flex-wrap gap-2">
                {['Relaxed', 'Creative', 'Happy'].map(effect => (
                  <span key={effect} className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs">
                    {effect}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Favorite Terpenes</h4>
              <div className="flex flex-wrap gap-2">
                {['Myrcene', 'Limonene', 'Pinene'].map(terpene => (
                  <span key={terpene} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {terpene}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Potency Range</h4>
              <p className="text-sm text-neutral-600">15% - 25% THC</p>
            </div>
          </div>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:underline">
            Update Preferences
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Default Address</h3>
          <p className="mb-1">John Doe</p>
          <p className="mb-1">123 Main St, Apt 4B</p>
          <p className="mb-1">Queens, NY 11434</p>
          <p className="mb-3">(555) 123-4567</p>
          <button className="text-primary-600 text-sm font-medium hover:underline">
            Edit Address
          </button>
        </div>
      </div>

      {/* AI Health Suggestions */}
      <div className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold">Personalized Wellness Suggestions</h3>
          </div>
          <button 
            onClick={() => setShowAskAI(true)}
            className="bg-white text-primary-600 px-3 py-1 rounded-lg text-sm hover:bg-opacity-90"
          >
            Ask AI
          </button>
        </div>
        <p className="mb-4 opacity-90">
          Based on your preferences and purchase history, our AI suggests these products for your wellness needs:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-medium mb-2">For Stress Relief</h4>
            <p className="text-sm opacity-90 mb-2">
              Your preference for Indica strains and relaxing effects suggests you may benefit from:
            </p>
            <ul className="text-sm space-y-1">
              <li>• CBD-rich tinctures before bedtime</li>
              <li>• Myrcene-dominant strains for evening use</li>
              <li>• Low-dose edibles with 1:1 THC:CBD ratio</li>
            </ul>
            <button className="mt-3 text-sm bg-white text-primary-600 px-3 py-1 rounded-full hover:bg-opacity-90">
              View Products
            </button>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-medium mb-2">For Creativity</h4>
            <p className="text-sm opacity-90 mb-2">
              Based on your interest in creative effects, consider trying:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Limonene-rich Sativa strains</li>
              <li>• Microdosed beverages (2.5-5mg THC)</li>
              <li>• Terpinolene-dominant vape cartridges</li>
            </ul>
            <button className="mt-3 text-sm bg-white text-primary-600 px-3 py-1 rounded-full hover:bg-opacity-90">
              View Products
            </button>
          </div>
        </div>
        <div className="text-center">
          <button 
            onClick={() => setShowAskAI(true)}
            className="text-sm underline opacity-80 hover:opacity-100"
          >
            Ask AI for personalized recommendations
          </button>
        </div>
      </div>

      {/* Exclusive Deals */}
      <div className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Exclusive Member Deals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">20% Off Premium Flower</h4>
            <p className="text-sm opacity-90">Valid until Dec 31, 2024</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Free Delivery This Week</h4>
            <p className="text-sm opacity-90">No minimum order required</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="font-medium">Recent Orders</h3>
          </div>
          <p className="text-sm text-neutral-500 mb-4">
            You haven't placed any orders yet.
          </p>
          <Link to="/shop" className="text-primary-600 text-sm font-medium hover:underline">
            Browse Products
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="font-medium">Saved Products</h3>
          </div>
          <p className="text-sm text-neutral-500 mb-4">
            You haven't saved any products yet.
          </p>
          <Link to="/shop" className="text-primary-600 text-sm font-medium hover:underline">
            Browse Products
          </Link>
        </div>
      </div>

      {/* Pre-Orders Section */}
      <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="font-medium">Pre-Orders</h3>
        </div>
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No Pre-Orders</h4>
          <p className="text-neutral-500 mb-4">
            You don't have any active pre-orders. Browse our pre-order products to reserve items before they arrive.
          </p>
          <Link to="/shop/pre-order" className="btn-primary">
            Browse Pre-Order Products
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="font-medium">Upcoming Events</h3>
        </div>
        <div className="space-y-4">
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Cannabis Cooking Class</h4>
                <p className="text-sm text-neutral-600 mb-2">Learn how to infuse cannabis into your favorite recipes</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>January 15, 2025 • 6:00 PM</span>
                </div>
              </div>
              <button className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                RSVP
              </button>
            </div>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Terpene Tasting Event</h4>
                <p className="text-sm text-neutral-600 mb-2">Explore different terpene profiles and their effects</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>February 5, 2025 • 7:00 PM</span>
                </div>
              </div>
              <button className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ask AI Modal */}
      {showAskAI && <AskAI onClose={() => setShowAskAI(false)} />}
    </div>
  );
};

const OrderHistory: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Order History</h2>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        <ShoppingBag className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
        <p className="text-neutral-500 mb-4">
          When you place an order, it will appear here.
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    </div>
  </div>
);

const SavedItems: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No saved items</h3>
        <p className="text-neutral-500 mb-4">
          Save items you like for easy access later.
        </p>
        <Link to="/shop" className="btn-primary">
          Browse Products
        </Link>
      </div>
    </div>
  </div>
);

const Addresses: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
    
    <div className="mb-6 flex justify-end">
      <button className="btn-primary">
        Add New Address
      </button>
    </div>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 text-xs font-medium rounded-full">
              Default
            </span>
            <h3 className="ml-2 font-medium">Home</h3>
          </div>
          <div>
            <button className="text-primary-600 text-sm hover:underline mr-4">
              Edit
            </button>
            <button className="text-red-600 text-sm hover:underline">
              Delete
            </button>
          </div>
        </div>
        <p className="mb-1">John Doe</p>
        <p className="mb-1">123 Main St, Apt 4B</p>
        <p className="mb-1">Queens, NY 11434</p>
        <p>(555) 123-4567</p>
      </div>
    </div>
  </div>
);

const PaymentMethods: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
    
    <div className="mb-6 flex justify-end">
      <button className="btn-primary">
        Add New Payment Method
      </button>
    </div>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 text-xs font-medium rounded-full mr-2">
              Default
            </span>
            <div className="w-8 h-5 mr-2">
              <svg viewBox="0 0 38 24" width="100%" height="100%">
                <path fill="#16366F" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
                <path fill="#fff" d="M19 16.6c-2.7 0-5-2.2-5-5s2.2-5 5-5c1.2 0 2.3.4 3.2 1.2l1.2-1.4c-1.2-1-2.7-1.6-4.4-1.6-3.8 0-6.8 3.1-6.8 6.8 0 3.8 3.1 6.8 6.8 6.8 1.7 0 3.2-.6 4.3-1.6l-1.3-1.4c-.8.8-1.9 1.2-3 1.2z" />
                <path fill="#fff" d="M35 16.6h-2l-2.2-5.2-2.2 5.2h-2l-2.7-8.9h2l1.7 5.6 2.3-5.6h1.9l2.2 5.6 1.7-5.6H38l-3 8.9z" />
              </svg>
            </div>
            <span className="font-medium">••••••••4242</span>
          </div>
          <div>
            <button className="text-primary-600 text-sm hover:underline mr-4">
              Edit
            </button>
            <button className="text-red-600 text-sm hover:underline">
              Delete
            </button>
          </div>
        </div>
        <p className="text-sm text-neutral-500">Expires 12/2025</p>
      </div>
    </div>
  </div>
);

const PreOrders: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Pre-Orders</h2>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No pre-orders yet</h3>
        <p className="text-neutral-500 mb-4">
          Pre-order exclusive products before they arrive in store.
        </p>
        <Link to="/shop/pre-order" className="btn-primary">
          Browse Pre-Order Products
        </Link>
      </div>
    </div>
  </div>
);

const Events: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Events & RSVPs</h2>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="font-medium mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Cannabis Cooking Class</h4>
                <p className="text-sm text-neutral-600 mb-2">Learn how to infuse cannabis into your favorite recipes</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>January 15, 2025 • 6:00 PM</span>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                RSVP Confirmed
              </div>
            </div>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Terpene Tasting Event</h4>
                <p className="text-sm text-neutral-600 mb-2">Explore different terpene profiles and their effects</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>February 5, 2025 • 7:00 PM</span>
                </div>
              </div>
              <button className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AccountSettings: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
    
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue="John"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              defaultValue="Doe"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              defaultValue="john.doe@example.com"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              defaultValue="(555) 123-4567"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
        </form>
        <button className="mt-4 btn-primary">
          Save Changes
        </button>
      </div>
      
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </div>
        </form>
        <button className="mt-4 btn-primary">
          Update Password
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Email Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketing"
                name="marketing"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary-600 border-neutral-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketing" className="font-medium text-neutral-700">
                Marketing emails
              </label>
              <p className="text-neutral-500">
                Receive promotions, special offers, and new product announcements.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="orders"
                name="orders"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary-600 border-neutral-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="orders" className="font-medium text-neutral-700">
                Order updates
              </label>
              <p className="text-neutral-500">
                Receive notifications about your order status and delivery.
              </p>
            </div>
          </div>
        </div>
        <button className="mt-4 btn-primary">
          Save Preferences
        </button>
      </div>
    </div>
  </div>
);

const AccountPage: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);
  
  const accountSections = [
    { path: '', icon: User, name: 'Account Overview' },
    { path: 'orders', icon: ShoppingBag, name: 'Order History' },
    { path: 'saved', icon: Heart, name: 'Saved Items' },
    { path: 'addresses', icon: MapPin, name: 'Addresses' },
    { path: 'payment', icon: CreditCard, name: 'Payment Methods' },
    { path: 'pre-orders', icon: Clock, name: 'Pre-Orders' },
    { path: 'events', icon: Calendar, name: 'Events & RSVPs' },
    { path: 'settings', icon: Settings, name: 'Account Settings' },
  ];
  
  if (!isLoggedIn) {
    return (
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Sign In</h1>
              <p className="text-neutral-600">
                Sign in to your account to view orders, manage your profile, and access exclusive deals.
              </p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-primary-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="w-full btn-primary py-2"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-neutral-600">
                Don't have an account?{' '}
                <a href="#" className="text-primary-600 hover:underline font-medium">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-bold">My Account</h2>
                <p className="text-sm text-neutral-500">
                  Hello, John Doe
                </p>
                <div className="mt-2 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-primary-600 font-medium">Gold VIP Member</span>
                </div>
                <button 
                  onClick={() => setShowAskAI(true)}
                  className="mt-4 w-full flex items-center justify-center p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI Assistant
                </button>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {accountSections.map(section => {
                    const isActive = location.pathname === `/account/${section.path}` || 
                      (location.pathname === '/account' && section.path === '');
                    
                    return (
                      <li key={section.path}>
                        <Link 
                          to={`/account/${section.path}`}
                          className={`flex items-center px-4 py-2 rounded-md ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'hover:bg-neutral-50'
                          }`}
                        >
                          <section.icon className="h-5 w-5 mr-3" />
                          {section.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="flex items-center px-4 py-2 rounded-md text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<AccountOverview />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/saved" element={<SavedItems />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/payment" element={<PaymentMethods />} />
              <Route path="/pre-orders" element={<PreOrders />} />
              <Route path="/events" element={<Events />} />
              <Route path="/settings" element={<AccountSettings />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Ask AI Modal */}
      {showAskAI && <AskAI onClose={() => setShowAskAI(false)} />}
    </div>
  );
};

export default AccountPage;
import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Plus, Trash2, Check, Package, Calendar } from 'lucide-react';
import ContentEditor from './ContentEditor';
import ImageUploader from './ImageUploader';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  description: string;
  features: string[];
  products: number;
  savings: number;
  deliveryOptions: string[];
  image?: string;
  status: 'active' | 'draft' | 'archived';
}

interface SubscriptionEditorProps {
  planId?: string;
  onBack: () => void;
  onSave: (planData: SubscriptionPlan) => void;
}

const SubscriptionEditor: React.FC<SubscriptionEditorProps> = ({ planId, onBack, onSave }) => {
  const [plan, setPlan] = useState<SubscriptionPlan>({
    id: planId || `plan-${Date.now()}`,
    name: '',
    price: 49.99,
    frequency: 'monthly',
    description: '',
    features: [''],
    products: 4,
    savings: 10,
    deliveryOptions: ['Home delivery', 'Express pickup lane'],
    status: 'draft'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(!!planId);

  useEffect(() => {
    if (planId) {
      // Simulate API call to fetch subscription plan data
      setIsLoading(true);
      setTimeout(() => {
        // This would be replaced with actual API call
        const mockPlan: SubscriptionPlan = {
          id: planId,
          name: 'Monthly Connoisseur',
          price: 129.99,
          frequency: 'monthly',
          description: 'The ultimate cannabis experience',
          features: [
            '8-12 premium products',
            'Limited edition and rare strains',
            'Expert curation notes',
            'VIP customer support',
            'Exclusive events access',
            'Custom product requests'
          ],
          products: 10,
          savings: 25,
          deliveryOptions: ['Home delivery', 'Express pickup lane', 'White glove service'],
          image: 'https://images.pexels.com/photos/7667724/pexels-photo-7667724.jpeg',
          status: 'active'
        };
        
        setPlan(mockPlan);
        setIsLoading(false);
      }, 1000);
    }
  }, [planId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPlan(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setPlan(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setPlan(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures[index] = value;
    setPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleDeliveryOptionChange = (index: number, value: string) => {
    const updatedOptions = [...plan.deliveryOptions];
    updatedOptions[index] = value;
    setPlan(prev => ({ ...prev, deliveryOptions: updatedOptions }));
  };

  const addFeature = () => {
    setPlan(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures.splice(index, 1);
    setPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const addDeliveryOption = () => {
    setPlan(prev => ({ ...prev, deliveryOptions: [...prev.deliveryOptions, ''] }));
  };

  const removeDeliveryOption = (index: number) => {
    const updatedOptions = [...plan.deliveryOptions];
    updatedOptions.splice(index, 1);
    setPlan(prev => ({ ...prev, deliveryOptions: updatedOptions }));
  };

  const handleImageChange = (imageUrl: string) => {
    setPlan(prev => ({ ...prev, image: imageUrl }));
  };

  const handleStatusChange = (status: 'active' | 'draft' | 'archived') => {
    setPlan(prev => ({ ...prev, status }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(plan);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {planId ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}
            </h1>
            {plan.status === 'active' && (
              <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
            {plan.status === 'draft' && (
              <span className="ml-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Draft
              </span>
            )}
            {plan.status === 'archived' && (
              <span className="ml-3 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                Archived
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <span className="text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Saved successfully
              </span>
            )}
            <div className="flex">
              <button
                onClick={() => handleStatusChange('draft')}
                className={`px-3 py-1.5 border-y border-l border-gray-300 rounded-l-lg ${
                  plan.status === 'draft' 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => handleStatusChange('active')}
                className={`px-3 py-1.5 border border-gray-300 ${
                  plan.status === 'active' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusChange('archived')}
                className={`px-3 py-1.5 border-y border-r border-gray-300 rounded-r-lg ${
                  plan.status === 'archived' 
                    ? 'bg-gray-50 text-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Archive
              </button>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={plan.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. Monthly Connoisseur"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={plan.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of this subscription plan"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={plan.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={plan.frequency}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="products" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Products
                  </label>
                  <input
                    type="number"
                    id="products"
                    name="products"
                    value={plan.products}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="savings" className="block text-sm font-medium text-gray-700 mb-1">
                  Savings Percentage (%)
                </label>
                <input
                  type="number"
                  id="savings"
                  name="savings"
                  value={plan.savings}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Features
                </label>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. 8-12 premium products"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={plan.features.length <= 1}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Delivery Options
                </label>
                <div className="space-y-3">
                  {plan.deliveryOptions.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleDeliveryOptionChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. Home delivery"
                      />
                      <button
                        type="button"
                        onClick={() => removeDeliveryOption(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={plan.deliveryOptions.length <= 1}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDeliveryOption}
                    className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Delivery Option
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>
              <ImageUploader
                currentImage={plan.image}
                onImageSelected={handleImageChange}
                aspectRatio="16/9"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-full inline-block mb-2">
                    <Package className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name || 'Plan Name'}</h3>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary-600">
                    ${plan.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-neutral-500 capitalize">
                    per {plan.frequency === 'biweekly' ? 'two weeks' : plan.frequency}
                  </div>
                </div>
                
                <p className="text-neutral-600 text-center text-sm mb-4">{plan.description || 'Plan description'}</p>
                
                <div className="text-center mb-4">
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                    Save {plan.savings}%
                  </div>
                </div>
                
                <div className="text-sm text-neutral-500 text-center">
                  {plan.products} products included
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Danger Zone</h3>
              </div>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEditor;
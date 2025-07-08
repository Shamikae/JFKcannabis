import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Plus, Trash2, Check, Star, Crown, Zap } from 'lucide-react';
import ContentEditor from './ContentEditor';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: string[];
  benefits: string[];
  icon: 'star' | 'crown' | 'zap';
  color: string;
  popular?: boolean;
  requiresApproval?: boolean;
}

interface MembershipEditorProps {
  tierId?: string;
  onBack: () => void;
  onSave: (tierData: MembershipTier) => void;
}

const MembershipEditor: React.FC<MembershipEditorProps> = ({ tierId, onBack, onSave }) => {
  const [tier, setTier] = useState<MembershipTier>({
    id: tierId || `tier-${Date.now()}`,
    name: '',
    price: 19.99,
    annualPrice: 199.99,
    description: '',
    features: [''],
    benefits: [''],
    icon: 'star',
    color: 'from-amber-600 to-orange-600',
    popular: false,
    requiresApproval: false
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(!!tierId);

  useEffect(() => {
    if (tierId) {
      // Simulate API call to fetch membership tier data
      setIsLoading(true);
      setTimeout(() => {
        // This would be replaced with actual API call
        const mockTier: MembershipTier = {
          id: tierId,
          name: 'Gold VIP',
          price: 79.99,
          annualPrice: 799.99,
          description: 'Ultimate cannabis experience for enthusiasts and travelers',
          features: [
            '15% discount on all purchases',
            'Weekly premium product deliveries',
            'Private lounge access at JFK Cannabis Cafe',
            'Personal cannabis consultant',
            'Exclusive limited edition products',
            'Complimentary airport shuttle service',
            'International cannabis travel assistance'
          ],
          benefits: [
            'Free delivery on all orders',
            '24/7 concierge support',
            'Private member events and tastings',
            'Cannabis sommelier consultations',
            'Custom product curation',
            'Access to rare and vintage strains',
            'Cannabis travel planning services'
          ],
          icon: 'zap',
          color: 'from-yellow-500 to-amber-600',
          popular: true,
          requiresApproval: true
        };
        
        setTier(mockTier);
        setIsLoading(false);
      }, 1000);
    }
  }, [tierId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTier(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setTier(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setTier(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...tier.features];
    updatedFeatures[index] = value;
    setTier(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...tier.benefits];
    updatedBenefits[index] = value;
    setTier(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  const addFeature = () => {
    setTier(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...tier.features];
    updatedFeatures.splice(index, 1);
    setTier(prev => ({ ...prev, features: updatedFeatures }));
  };

  const addBenefit = () => {
    setTier(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = [...tier.benefits];
    updatedBenefits.splice(index, 1);
    setTier(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(tier);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'crown':
        return <Crown className="h-6 w-6" />;
      case 'zap':
        return <Zap className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
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
              {tierId ? 'Edit Membership Tier' : 'Create New Membership Tier'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <span className="text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Saved successfully
              </span>
            )}
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
                  Tier Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={tier.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. Gold VIP"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={tier.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of this membership tier"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={tier.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="annualPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Price ($)
                  </label>
                  <input
                    type="number"
                    id="annualPrice"
                    name="annualPrice"
                    value={tier.annualPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Features
                </label>
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. 15% discount on all purchases"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={tier.features.length <= 1}
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
                  Benefits
                </label>
                <div className="space-y-3">
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. Free delivery on all orders"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={tier.benefits.length <= 1}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Benefit
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Tier Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    id="icon"
                    name="icon"
                    value={tier.icon}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="star">Star</option>
                    <option value="crown">Crown</option>
                    <option value="zap">Lightning</option>
                  </select>
                  <div className="mt-2 p-3 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.color} text-white`}>
                      {getIconComponent(tier.icon)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                    Color Scheme
                  </label>
                  <select
                    id="color"
                    name="color"
                    value={tier.color}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="from-amber-600 to-orange-600">Bronze</option>
                    <option value="from-slate-400 to-slate-600">Silver</option>
                    <option value="from-yellow-500 to-amber-600">Gold</option>
                    <option value="from-purple-500 to-indigo-600">Platinum</option>
                    <option value="from-primary-500 to-primary-700">Primary</option>
                    <option value="from-secondary-500 to-secondary-700">Secondary</option>
                  </select>
                  <div className="mt-2 h-6 rounded-lg bg-gradient-to-r w-full" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="popular"
                      name="popular"
                      checked={tier.popular}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                      Mark as "Most Popular"
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requiresApproval"
                      name="requiresApproval"
                      checked={tier.requiresApproval}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requiresApproval" className="ml-2 block text-sm text-gray-700">
                      Requires approval
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className={`h-2 bg-gradient-to-r ${tier.color} rounded-t-lg -mt-4 -mx-4 mb-4`}></div>
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.color} text-white mr-3`}>
                    {getIconComponent(tier.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{tier.name || 'Tier Name'}</h3>
                    {tier.requiresApproval && (
                      <span className="text-xs text-amber-600 font-medium">Approval Required</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-neutral-900">
                    ${tier.price.toFixed(2)}
                    <span className="text-base font-normal text-neutral-500">/month</span>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm mb-4">{tier.description || 'Tier description'}</p>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipEditor;
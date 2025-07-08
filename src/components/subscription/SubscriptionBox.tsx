import React, { useState } from 'react';
import { Package, Calendar, Gift, Star, Truck, Clock, Check, CreditCard } from 'lucide-react';

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
}

const SubscriptionBox: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'NY',
    zipCode: '',
    preferences: {
      categories: [] as string[],
      strainTypes: [] as string[],
      potency: 'medium',
      budget: 'standard'
    },
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const plans: SubscriptionPlan[] = [
    {
      id: 'weekly',
      name: 'Weekly Explorer',
      price: 49.99,
      frequency: 'weekly',
      description: 'Perfect for daily users who love variety',
      features: [
        '3-4 premium products',
        'Mix of flower, edibles, and concentrates',
        'Educational materials included',
        'Flexible delivery scheduling',
        'Cancel anytime'
      ],
      products: 4,
      savings: 10,
      deliveryOptions: ['Home delivery', 'Express pickup lane']
    },
    {
      id: 'biweekly',
      name: 'Bi-Weekly Discovery',
      price: 79.99,
      frequency: 'biweekly',
      description: 'Ideal balance of variety and value',
      features: [
        '5-7 premium products',
        'Curated by cannabis experts',
        'Exclusive member pricing',
        'Priority customer support',
        'Free shipping included'
      ],
      products: 6,
      savings: 15,
      deliveryOptions: ['Home delivery', 'Express pickup lane', 'Scheduled delivery']
    },
    {
      id: 'monthly',
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
      deliveryOptions: ['Home delivery', 'Express pickup lane', 'White glove service']
    }
  ];

  const categories = [
    'Flower', 'Pre-Rolls', 'Edibles', 'Vapes', 'Concentrates', 
    'Tinctures', 'Topicals', 'Beverages', 'Accessories'
  ];

  const strainTypes = ['Sativa', 'Indica', 'Hybrid', 'Mixed', 'CBD'];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        categories: prev.preferences.categories.includes(category)
          ? prev.preferences.categories.filter(c => c !== category)
          : [...prev.preferences.categories, category]
      }
    }));
  };

  const handleStrainTypeChange = (strainType: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        strainTypes: prev.preferences.strainTypes.includes(strainType)
          ? prev.preferences.strainTypes.filter(s => s !== strainType)
          : [...prev.preferences.strainTypes, strainType]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Subscription created successfully! Your first box will arrive within 3-5 business days.');
    setShowSignupForm(false);
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Package className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Cannabis Subscription Boxes</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover new products, exclusive strains, and premium cannabis experiences delivered to your door or ready for express pickup.
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`card p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-primary-600 bg-primary-50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  ${plan.price}
                </div>
                <div className="text-sm text-neutral-500 capitalize">
                  per {plan.frequency === 'biweekly' ? 'two weeks' : plan.frequency}
                </div>
              </div>

              <p className="text-neutral-600 text-center mb-4">{plan.description}</p>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
                  Save {plan.savings}%
                </div>
                <div className="text-sm text-neutral-500">
                  {plan.products} products included
                </div>
              </div>

              {selectedPlan === plan.id && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="text-primary-600 font-medium">Selected</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Delivery Method Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Choose Your Delivery Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryMethod('delivery')}
              className={`p-4 border rounded-lg text-left transition-all ${
                deliveryMethod === 'delivery'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 mr-2 text-primary-600" />
                <span className="font-medium">Home Delivery</span>
              </div>
              <p className="text-sm text-neutral-600">
                Delivered directly to your door on your schedule
              </p>
            </button>

            <button
              onClick={() => setDeliveryMethod('pickup')}
              className={`p-4 border rounded-lg text-left transition-all ${
                deliveryMethod === 'pickup'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-primary-600" />
                <span className="font-medium">Express Pickup</span>
              </div>
              <p className="text-sm text-neutral-600">
                Skip the line with our dedicated express pickup lane
              </p>
            </button>
          </div>
        </div>

        {/* Selected Plan Details */}
        {selectedPlanData && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedPlanData.name} Details
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                    <span>
                      Delivered every {selectedPlanData.frequency === 'biweekly' ? 'two weeks' : selectedPlanData.frequency}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-primary-600 mr-3" />
                    <span>{selectedPlanData.products} carefully curated products</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 text-primary-600 mr-3" />
                    <span>Save {selectedPlanData.savings}% compared to individual purchases</span>
                  </div>
                  <div className="flex items-center">
                    {deliveryMethod === 'delivery' ? (
                      <Truck className="h-5 w-5 text-primary-600 mr-3" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary-600 mr-3" />
                    )}
                    <span>
                      {deliveryMethod === 'delivery' ? 'Home delivery included' : 'Express pickup ready in 1 hour'}
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Premium flower samples (multiple strains)</li>
                    <li>• Artisanal edibles and beverages</li>
                    <li>• Concentrate samples and vape cartridges</li>
                    <li>• Educational materials and strain guides</li>
                    <li>• Exclusive member-only products</li>
                    <li>• Cannabis accessories and tools</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Subscribe Now</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subscription Price:</span>
                      <span className="font-bold">${selectedPlanData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="font-bold">
                        {deliveryMethod === 'delivery' ? 'FREE' : 'N/A'}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between text-lg">
                      <span>Total:</span>
                      <span className="font-bold">${selectedPlanData.price}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowSignupForm(true)}
                    className="w-full bg-white text-primary-600 font-bold py-3 rounded-lg hover:bg-neutral-100 transition-colors mb-4"
                  >
                    Subscribe Now
                  </button>

                  <div className="text-center text-sm opacity-90">
                    <p>Cancel anytime • No commitment</p>
                    <p>Next box ships in 3-5 business days</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-600 mb-2">
                    Questions about our subscription service?
                  </p>
                  <button className="text-primary-600 hover:underline text-sm font-medium">
                    Contact our subscription specialists
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Signup Form */}
        {showSignupForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Subscribe to {selectedPlanData?.name}
                  </h2>
                  <button
                    onClick={() => setShowSignupForm(false)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address (for delivery) */}
                  {deliveryMethod === 'delivery' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-neutral-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-neutral-300 rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              State *
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              className="w-full p-2 border border-neutral-300 rounded-md"
                            >
                              <option value="NY">New York</option>
                              <option value="NJ">New Jersey</option>
                              <option value="CT">Connecticut</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full p-2 border border-neutral-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Preferences</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Preferred Categories (select all that apply)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {categories.map(category => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.preferences.categories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                              className="mr-2"
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Preferred Strain Types
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {strainTypes.map(type => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.preferences.strainTypes.includes(type)}
                              onChange={() => handleStrainTypeChange(type)}
                              className="mr-2"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Potency Preference
                        </label>
                        <select
                          name="preferences.potency"
                          value={formData.preferences.potency}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        >
                          <option value="low">Low (5-15% THC)</option>
                          <option value="medium">Medium (15-25% THC)</option>
                          <option value="high">High (25%+ THC)</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Budget Preference
                        </label>
                        <select
                          name="preferences.budget"
                          value={formData.preferences.budget}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        >
                          <option value="value">Value Products</option>
                          <option value="standard">Standard Quality</option>
                          <option value="premium">Premium Only</option>
                          <option value="luxury">Luxury/Rare Items</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Expiry *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          CVC *
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowSignupForm(false)}
                      className="flex-1 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Choose Your Plan</h3>
              <p className="text-neutral-600">
                Select the subscription frequency and delivery method that fits your lifestyle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Set Preferences</h3>
              <p className="text-neutral-600">
                Tell us your favorite categories, strain types, and potency preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-bold mb-2">We Curate</h3>
              <p className="text-neutral-600">
                Our experts hand-select products based on your preferences and current trends.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Enjoy</h3>
              <p className="text-neutral-600">
                Receive your box via delivery or express pickup with detailed product information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBox;
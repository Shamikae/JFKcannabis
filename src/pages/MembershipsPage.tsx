import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Gift, Phone, Mail, CreditCard, Calendar } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'annual';
  description: string;
  features: string[];
  benefits: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  requiresApproval?: boolean;
}

const MembershipsPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('gold');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'NY',
    zipCode: '',
    membershipTier: 'gold',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeToTerms: false,
    ageVerified: false
  });

  const membershipTiers: MembershipTier[] = [
    {
      id: 'bronze',
      name: 'Bronze Explorer',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      billingPeriod,
      description: 'Perfect for occasional cannabis users and beginners',
      features: [
        '5% discount on all purchases',
        'Monthly newsletter with cannabis education',
        'Access to member-only products',
        'Priority customer support',
        'Birthday month special offer'
      ],
      benefits: [
        'Free delivery on orders over $75',
        'Early access to new products',
        'Educational webinars',
        'Product recommendations'
      ],
      icon: <Star className="h-6 w-6" />,
      color: 'from-amber-600 to-orange-600'
    },
    {
      id: 'silver',
      name: 'Silver Connoisseur',
      price: billingPeriod === 'monthly' ? 39.99 : 399.99,
      billingPeriod,
      description: 'For regular users who appreciate quality and variety',
      features: [
        '10% discount on all purchases',
        'Bi-weekly curated product selections',
        'Access to premium member events',
        'Dedicated customer success manager',
        'Quarterly exclusive strain releases',
        'Free monthly consultation with budtender'
      ],
      benefits: [
        'Free delivery on orders over $50',
        'VIP customer support line',
        'Exclusive member-only strains',
        'Cannabis education courses',
        'Product testing opportunities'
      ],
      icon: <Crown className="h-6 w-6" />,
      color: 'from-slate-400 to-slate-600',
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold VIP',
      price: billingPeriod === 'monthly' ? 79.99 : 799.99,
      billingPeriod,
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
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-500 to-amber-600',
      requiresApproval: true
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMembership = membershipTiers.find(tier => tier.id === formData.membershipTier);
    
    if (selectedMembership?.requiresApproval) {
      alert('Thank you for your application! Our team will review your Gold VIP membership request and contact you within 24 hours.');
    } else {
      alert('Welcome to JFK Cannabis Membership! Your account has been created successfully.');
    }
    
    setShowSignupForm(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: 'NY',
      zipCode: '',
      membershipTier: 'gold',
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      agreeToTerms: false,
      ageVerified: false
    });
  };

  const selectedMembership = membershipTiers.find(tier => tier.id === selectedTier);

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cannabis Membership Program
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Join our exclusive membership program designed for cannabis enthusiasts, travelers, and locals. 
            Enjoy premium benefits, exclusive access, and personalized service at JFK Cannabis.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Annual
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {membershipTiers.map(tier => (
            <div
              key={tier.id}
              className={`relative card overflow-hidden transition-all duration-300 ${
                selectedTier === tier.id
                  ? 'ring-2 ring-primary-600 shadow-xl scale-105'
                  : 'hover:shadow-lg'
              } ${tier.popular ? 'border-2 border-primary-600' : ''}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.color} text-white mr-3`}>
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    {tier.requiresApproval && (
                      <span className="text-xs text-amber-600 font-medium">Approval Required</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-neutral-900">
                    ${tier.price}
                    <span className="text-lg font-normal text-neutral-500">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingPeriod === 'annual' && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${((tier.price / 10) * 2).toFixed(0)} per year
                    </div>
                  )}
                </div>

                <p className="text-neutral-600 mb-6">{tier.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {tier.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Gift className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                    {tier.benefits.length > 3 && (
                      <li className="text-sm text-neutral-500">
                        +{tier.benefits.length - 3} more benefits
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setFormData(prev => ({ ...prev, membershipTier: tier.id }));
                    setShowSignupForm(true);
                  }}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedTier === tier.id
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {tier.requiresApproval ? 'Apply Now' : 'Join Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Signup Form */}
        {showSignupForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Join {selectedMembership?.name}
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
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
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
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
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
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
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
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
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
                            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
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
                            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  {!selectedMembership?.requiresApproval && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Payment Method
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              Credit/Debit Card
                            </label>
                          </div>
                        </div>

                        {formData.paymentMethod === 'card' && (
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
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
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
                                className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="ageVerified"
                        checked={formData.ageVerified}
                        onChange={handleInputChange}
                        required
                        className="mt-1 mr-3"
                      />
                      <label className="text-sm text-neutral-700">
                        I confirm that I am 21 years of age or older and have valid identification.
                      </label>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required
                        className="mt-1 mr-3"
                      />
                      <label className="text-sm text-neutral-700">
                        I agree to the Terms of Service, Privacy Policy, and Membership Agreement.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowSignupForm(false)}
                      className="flex-1 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {selectedMembership?.requiresApproval ? 'Submit Application' : 'Join Now'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-primary-600" />
              Need Help Choosing?
            </h3>
            <p className="text-neutral-600 mb-4">
              Our membership specialists are here to help you find the perfect plan for your cannabis journey.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-neutral-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-neutral-500" />
                <span>memberships@jfkcannabis.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              Membership Benefits
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Cancel or change your membership anytime
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                No hidden fees or long-term contracts
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Exclusive member-only events and tastings
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Access to limited edition and rare products
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Personalized cannabis education and guidance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipsPage;
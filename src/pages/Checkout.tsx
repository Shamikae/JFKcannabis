import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MapPin, 
  Truck, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle,
  User,
  Phone,
  Mail,
  Calendar,
  Info,
  Package,
  Store,
  Building
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import PaymentProcessor from '../components/checkout/PaymentProcessor';
import IDVerification from '../components/checkout/IDVerification';
import PickupAuthorization from '../components/checkout/PickupAuthorization';
import BusinessLocationSearch from '../components/checkout/BusinessLocationSearch';
import ExpressDeliveryOptions from '../components/checkout/ExpressDeliveryOptions';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryInstructions: string;
  deliveryMethod: 'delivery' | 'pickup' | 'drive-thru' | 'business';
  businessLocation?: {
    id: string;
    name: string;
    address: string;
  };
  pickupPerson: 'self' | 'authorized' | 'budtender';
  authorizedPerson?: {
    id: string;
    name: string;
  };
  idVerified: boolean;
  expressDelivery: boolean;
  expressProducts: string[];
  paymentMethod: 'card' | 'cash';
  savePaymentMethod: boolean;
  saveAddress: boolean;
  agreeToTerms: boolean;
}

interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: number;
  acceptsDelivery: boolean;
  image: string;
}

interface AuthorizedPerson {
  id: string;
  name: string;
  type: 'authorized' | 'budtender';
  image?: string;
  available?: boolean;
}

interface ExpressProduct {
  id: string;
  name: string;
  price: number;
  eta: string;
  distance: number;
  image?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'NY',
    zipCode: '',
    deliveryInstructions: '',
    deliveryMethod: 'delivery',
    pickupPerson: 'self',
    idVerified: false,
    expressDelivery: false,
    expressProducts: [],
    paymentMethod: 'card',
    savePaymentMethod: false,
    saveAddress: false,
    agreeToTerms: false
  });
  const [showBusinessLocationSearch, setShowBusinessLocationSearch] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Mock data for authorized persons
  const authorizedPersons: AuthorizedPerson[] = [
    { id: 'auth1', name: 'Jane Smith', type: 'authorized' },
    { id: 'auth2', name: 'Michael Johnson', type: 'authorized' }
  ];
  
  // Mock data for budtenders
  const budtenders: AuthorizedPerson[] = [
    { id: 'bud1', name: 'Sarah Chen', type: 'budtender', available: true },
    { id: 'bud2', name: 'Mike Rodriguez', type: 'budtender', available: true },
    { id: 'bud3', name: 'Emily Davis', type: 'budtender', available: false }
  ];
  
  // Mock data for express delivery products
  const expressProducts: ExpressProduct[] = [
    { 
      id: 'exp1', 
      name: 'Blue Dream 3.5g', 
      price: 45.00, 
      eta: '15-30 min', 
      distance: 1.2,
      image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'
    },
    { 
      id: 'exp2', 
      name: 'Northern Lights Cart', 
      price: 50.00, 
      eta: '20-35 min', 
      distance: 1.8,
      image: 'https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg'
    },
    { 
      id: 'exp3', 
      name: 'Cosmic Gummies', 
      price: 25.00, 
      eta: '15-30 min', 
      distance: 1.2,
      image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'
    }
  ];
  
  useEffect(() => {
    // Redirect to cart if cart is empty
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [items, navigate, orderPlaced]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleDeliveryMethodChange = (method: 'delivery' | 'pickup' | 'drive-thru' | 'business') => {
    setFormData(prev => ({
      ...prev,
      deliveryMethod: method
    }));
  };
  
  const handleBusinessLocationSelect = (location: BusinessLocation) => {
    setFormData(prev => ({
      ...prev,
      businessLocation: {
        id: location.id,
        name: location.name,
        address: location.address
      }
    }));
  };
  
  const handleSelectPerson = (person: AuthorizedPerson | null) => {
    if (!person) {
      setFormData(prev => ({
        ...prev,
        authorizedPerson: undefined
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      authorizedPerson: {
        id: person.id,
        name: person.name
      }
    }));
  };
  
  const handleAddNewPerson = (personData: any) => {
    // In a real implementation, this would add the person to the database
    console.log('Adding new authorized person:', personData);
    
    // For demo purposes, just add to the form data
    const newPerson = {
      id: `auth-${Date.now()}`,
      name: `${personData.firstName} ${personData.lastName}`
    };
    
    setFormData(prev => ({
      ...prev,
      authorizedPerson: newPerson
    }));
  };
  
  const handleIDVerified = () => {
    setFormData(prev => ({
      ...prev,
      idVerified: true
    }));
  };
  
  const handleExpressProductSelect = (productId: string) => {
    setFormData(prev => {
      const expressProducts = [...prev.expressProducts];
      
      if (expressProducts.includes(productId)) {
        return {
          ...prev,
          expressProducts: expressProducts.filter(id => id !== productId)
        };
      } else {
        return {
          ...prev,
          expressProducts: [...expressProducts, productId]
        };
      }
    });
  };
  
  const handlePaymentSuccess = (paymentId: string) => {
    // Generate a random order ID
    const newOrderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    
    // In a real implementation, this would create an order in the database
    console.log('Payment successful:', paymentId);
    console.log('Order created:', newOrderId);
    
    // Clear the cart
    clearCart();
  };
  
  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentProcessing(false);
  };
  
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Delivery Method
        if (formData.deliveryMethod === 'business' && !formData.businessLocation) {
          return false;
        }
        return true;
      
      case 2: // Contact Information
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      
      case 3: // Delivery Address (if delivery)
        if (formData.deliveryMethod === 'delivery') {
          return !!(
            formData.address &&
            formData.city &&
            formData.state &&
            formData.zipCode
          );
        }
        return true;
      
      case 4: // ID Verification
        return formData.idVerified;
      
      case 5: // Payment
        return formData.agreeToTerms;
      
      default:
        return true;
    }
  };
  
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const submitOrder = () => {
    if (formData.paymentMethod === 'card') {
      setPaymentProcessing(true);
    } else {
      // For cash payments, just create the order
      handlePaymentSuccess('cash-payment');
    }
  };
  
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="mb-6 text-neutral-600">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-neutral-600 mb-6">
              Thank you for your order. Your order number is <span className="font-bold">{orderId}</span>.
            </p>
            
            <div className="mb-8 p-6 bg-neutral-50 rounded-lg">
              <h2 className="text-xl font-bold mb-4">What's Next?</h2>
              
              {formData.deliveryMethod === 'delivery' && (
                <div className="text-left mb-6">
                  <h3 className="font-bold flex items-center mb-2">
                    <Truck className="h-5 w-5 mr-2 text-primary-600" />
                    Delivery Information
                  </h3>
                  <p className="mb-2">Your order will be delivered to:</p>
                  <p className="font-medium">
                    {formData.address}{formData.apartment ? `, ${formData.apartment}` : ''}<br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    You'll receive a text message when your driver is on the way. Please have your ID ready for verification.
                  </p>
                </div>
              )}
              
              {formData.deliveryMethod === 'pickup' && (
                <div className="text-left mb-6">
                  <h3 className="font-bold flex items-center mb-2">
                    <Store className="h-5 w-5 mr-2 text-primary-600" />
                    Pickup Information
                  </h3>
                  <p className="mb-2">Your order will be available for pickup at:</p>
                  <p className="font-medium">
                    JFK Cannabis<br />
                    175-01 Rockaway Blvd, Queens NY 11434
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    You'll receive a text message when your order is ready for pickup. Please bring your ID for verification.
                  </p>
                </div>
              )}
              
              {formData.deliveryMethod === 'drive-thru' && (
                <div className="text-left mb-6">
                  <h3 className="font-bold flex items-center mb-2">
                    <Truck className="h-5 w-5 mr-2 text-primary-600" />
                    Drive-Thru Information
                  </h3>
                  <p className="mb-2">Your order will be available at our drive-thru window:</p>
                  <p className="font-medium">
                    JFK Cannabis Drive-Thru<br />
                    175-01 Rockaway Blvd, Queens NY 11434
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    You'll receive a text message with a QR code when your order is ready. Please have your ID ready for verification.
                  </p>
                </div>
              )}
              
              {formData.deliveryMethod === 'business' && formData.businessLocation && (
                <div className="text-left mb-6">
                  <h3 className="font-bold flex items-center mb-2">
                    <Building className="h-5 w-5 mr-2 text-primary-600" />
                    Business Delivery Information
                  </h3>
                  <p className="mb-2">Your order will be delivered to:</p>
                  <p className="font-medium">
                    {formData.businessLocation.name}<br />
                    {formData.businessLocation.address}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    You'll receive a text message when your order is on the way. Please have your ID ready for verification.
                  </p>
                </div>
              )}
              
              <div className="text-left">
                <h3 className="font-bold flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  Estimated Time
                </h3>
                <p className="font-medium">
                  {formData.deliveryMethod === 'delivery' 
                    ? 'Your delivery will arrive in approximately 60-90 minutes.' 
                    : formData.deliveryMethod === 'pickup'
                      ? 'Your order will be ready for pickup in approximately 30 minutes.'
                      : formData.deliveryMethod === 'drive-thru'
                        ? 'Your order will be ready at the drive-thru in approximately 15 minutes.'
                        : 'Your order will be delivered to the business location in approximately 45-60 minutes.'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Return to Home
              </Link>
              <Link to="/account/orders" className="btn-outline">
                View Order History
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-primary-600 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mt-4">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Checkout Steps */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Checkout</h2>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-600">Step {currentStep} of 5</span>
                </div>
              </div>
              
              {/* Step 1: Delivery Method */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Delivery Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => handleDeliveryMethodChange('delivery')}
                      className={`p-4 rounded-lg text-left transition-all ${
                        formData.deliveryMethod === 'delivery'
                          ? 'bg-primary-50 border-2 border-primary-600'
                          : 'bg-white border border-neutral-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Truck className="h-5 w-5 mr-2 text-primary-600" />
                        <span className="font-medium">Home Delivery</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Get your order delivered right to your door.
                      </p>
                    </button>
                    
                    <button
                      onClick={() => handleDeliveryMethodChange('pickup')}
                      className={`p-4 rounded-lg text-left transition-all ${
                        formData.deliveryMethod === 'pickup'
                          ? 'bg-primary-50 border-2 border-primary-600'
                          : 'bg-white border border-neutral-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Store className="h-5 w-5 mr-2 text-primary-600" />
                        <span className="font-medium">Store Pickup</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Pick up your order at our store.
                      </p>
                    </button>
                    
                    <button
                      onClick={() => handleDeliveryMethodChange('drive-thru')}
                      className={`p-4 rounded-lg text-left transition-all ${
                        formData.deliveryMethod === 'drive-thru'
                          ? 'bg-primary-50 border-2 border-primary-600'
                          : 'bg-white border border-neutral-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Truck className="h-5 w-5 mr-2 text-primary-600" />
                        <span className="font-medium">Drive-Thru</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Pick up your order at our drive-thru window.
                      </p>
                    </button>
                    
                    <button
                      onClick={() => handleDeliveryMethodChange('business')}
                      className={`p-4 rounded-lg text-left transition-all ${
                        formData.deliveryMethod === 'business'
                          ? 'bg-primary-50 border-2 border-primary-600'
                          : 'bg-white border border-neutral-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Building className="h-5 w-5 mr-2 text-primary-600" />
                        <span className="font-medium">Business Delivery</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Deliver to a partner business location.
                      </p>
                    </button>
                  </div>
                  
                  {/* Business Location Selection */}
                  {formData.deliveryMethod === 'business' && (
                    <div className="mb-6">
                      {formData.businessLocation ? (
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                              <Building className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{formData.businessLocation.name}</h4>
                              <p className="text-sm text-neutral-600">{formData.businessLocation.address}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowBusinessLocationSearch(true)}
                            className="text-primary-600 text-sm hover:underline"
                          >
                            Change location
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowBusinessLocationSearch(true)}
                          className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Select Business Location
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Express Delivery Option */}
                  {formData.deliveryMethod === 'delivery' && (
                    <div className="mb-6">
                      <ExpressDeliveryOptions
                        products={expressProducts}
                        onSelectProduct={handleExpressProductSelect}
                        selectedProducts={formData.expressProducts}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={goToNextStep}
                      disabled={formData.deliveryMethod === 'business' && !formData.businessLocation}
                      className="btn-primary py-3 px-6"
                    >
                      Continue to Contact Information
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={goToPreviousStep}
                      className="btn-outline py-3 px-6"
                    >
                      Back
                    </button>
                    <button
                      onClick={goToNextStep}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                      className="btn-primary py-3 px-6"
                    >
                      {formData.deliveryMethod === 'delivery' 
                        ? 'Continue to Delivery Address' 
                        : 'Continue to ID Verification'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Delivery Address (if delivery) */}
              {currentStep === 3 && formData.deliveryMethod === 'delivery' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Delivery Address</h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="apartment" className="block text-sm font-medium text-neutral-700 mb-1">
                        Apartment, Suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                          State *
                        </label>
                        <select
                          id="state"
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
                        <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-neutral-700 mb-1">
                        Delivery Instructions (optional)
                      </label>
                      <textarea
                        id="deliveryInstructions"
                        name="deliveryInstructions"
                        value={formData.deliveryInstructions}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="E.g., Gate code, landmark, or special instructions for the driver"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="saveAddress" className="ml-2 block text-sm text-neutral-700">
                      Save this address for future orders
                    </label>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={goToPreviousStep}
                      className="btn-outline py-3 px-6"
                    >
                      Back
                    </button>
                    <button
                      onClick={goToNextStep}
                      disabled={!formData.address || !formData.city || !formData.state || !formData.zipCode}
                      className="btn-primary py-3 px-6"
                    >
                      Continue to ID Verification
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3/4: ID Verification */}
              {((currentStep === 3 && formData.deliveryMethod !== 'delivery') || currentStep === 4) && (
                <div>
                  <h3 className="text-lg font-medium mb-4">ID Verification</h3>
                  
                  <IDVerification 
                    onVerified={handleIDVerified}
                    personType="customer"
                    personName={`${formData.firstName} ${formData.lastName}`}
                  />
                  
                  {formData.deliveryMethod === 'pickup' && (
                    <div className="mt-6">
                      <PickupAuthorization
                        authorizedPersons={authorizedPersons}
                        budtenders={budtenders}
                        onSelectPerson={handleSelectPerson}
                        onAddNewPerson={handleAddNewPerson}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={goToPreviousStep}
                      className="btn-outline py-3 px-6"
                    >
                      Back
                    </button>
                    <button
                      onClick={goToNextStep}
                      disabled={!formData.idVerified}
                      className="btn-primary py-3 px-6"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4/5: Payment */}
              {currentStep === 5 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Payment</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <h4 className="font-medium">Payment Method</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                        className={`p-4 rounded-lg text-left transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'bg-primary-50 border-2 border-primary-600'
                            : 'bg-white border border-neutral-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Pay securely with your credit or debit card.
                        </p>
                      </button>
                      
                      {(formData.deliveryMethod === 'delivery' || formData.deliveryMethod === 'business') && (
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                          className={`p-4 rounded-lg text-left transition-all ${
                            formData.paymentMethod === 'cash'
                              ? 'bg-primary-50 border-2 border-primary-600'
                              : 'bg-white border border-neutral-200 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <DollarSign className="h-5 w-5 mr-2 text-primary-600" />
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                          <p className="text-sm text-neutral-600">
                            Pay with cash when your order is delivered.
                          </p>
                        </button>
                      )}
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="mb-6">
                        <PaymentProcessor
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                          amount={Math.round(getTotal() * 100)} // Convert to cents
                          orderId={`order-${Date.now()}`}
                          customerEmail={formData.email}
                        />
                        
                        <div className="mt-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="savePaymentMethod"
                              name="savePaymentMethod"
                              checked={formData.savePaymentMethod}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                            />
                            <label htmlFor="savePaymentMethod" className="ml-2 block text-sm text-neutral-700">
                              Save this payment method for future orders
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Info className="h-5 w-5 mr-2 text-neutral-600" />
                      <h4 className="font-medium">Order Summary</h4>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Tax</span>
                        <span className="font-medium">${getTax().toFixed(2)}</span>
                      </div>
                      {formData.deliveryMethod === 'delivery' && (
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Delivery Fee</span>
                          <span className="font-medium">${getDeliveryFee().toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-neutral-700">
                        I agree to the <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className=\"text-primary-600 hover:underline">Privacy Policy</Link>. I confirm that I am 21 years of age or older.
                      </label>
                    </div>
                  </div>
                  
                  {paymentError && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>{paymentError}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <button
                      onClick={goToPreviousStep}
                      className="btn-outline py-3 px-6"
                    >
                      Back
                    </button>
                    {formData.paymentMethod === 'cash' && (
                      <button
                        onClick={submitOrder}
                        disabled={!formData.agreeToTerms}
                        className="btn-primary py-3 px-6"
                      >
                        Place Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-neutral-100">
                    <div className="w-16 h-16 bg-neutral-100 rounded-md overflow-hidden mr-3">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-neutral-500">Qty: {item.cartQuantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.cartQuantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                {formData.expressProducts.length > 0 && (
                  <>
                    <div className="py-3 border-b border-neutral-100">
                      <h3 className="font-medium text-sm mb-2">Express Delivery Items</h3>
                      {formData.expressProducts.map(productId => {
                        const product = expressProducts.find(p => p.id === productId);
                        if (!product) return null;
                        
                        return (
                          <div key={product.id} className="flex items-center py-2">
                            <div className="w-12 h-12 bg-neutral-100 rounded-md overflow-hidden mr-3">
                              {product.image && (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-xs">{product.name}</h4>
                              <p className="text-xs text-neutral-500">Express: {product.eta}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium">${getTax().toFixed(2)}</span>
                </div>
                {formData.deliveryMethod === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Delivery Fee</span>
                    <span className="font-medium">${getDeliveryFee().toFixed(2)}</span>
                  </div>
                )}
                {formData.expressProducts.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Express Fee</span>
                    <span className="font-medium">$10.00</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(getTotal() + (formData.expressProducts.length > 0 ? 10 : 0)).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="text-sm text-neutral-500 mb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {formData.deliveryMethod === 'delivery' 
                      ? 'Estimated delivery: 60-90 minutes' 
                      : formData.deliveryMethod === 'pickup'
                        ? 'Estimated pickup: 30 minutes'
                        : formData.deliveryMethod === 'drive-thru'
                          ? 'Estimated ready time: 15 minutes'
                          : 'Estimated delivery: 45-60 minutes'}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {formData.deliveryMethod === 'delivery' 
                      ? formData.address 
                        ? `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
                        : 'Delivery address will be added'
                      : formData.deliveryMethod === 'business' && formData.businessLocation
                        ? formData.businessLocation.address
                        : '175-01 Rockaway Blvd, Queens NY 11434'}
                  </span>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 mr-2 text-neutral-600" />
                  <h4 className="font-medium">Important Information</h4>
                </div>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Must be 21+ with valid ID for all orders</li>
                  <li>• ID verification required at delivery/pickup</li>
                  <li>• No refunds on cannabis products</li>
                  <li>• Consume responsibly and legally</li>
                </ul>
              </div>
              
              <div className="text-center text-xs text-neutral-500">
                By placing your order, you agree to our Terms of Service and confirm that you are 21 years of age or older.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Business Location Search Modal */}
      {showBusinessLocationSearch && (
        <BusinessLocationSearch
          onSelect={handleBusinessLocationSelect}
          onClose={() => setShowBusinessLocationSearch(false)}
        />
      )}
    </div>
  );
};

export default Checkout;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, User, Phone, Mail, MapPin, Upload, Calendar, Shield, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

const DriverSignup: React.FC = () => {
  const [step, setStep] = useState(1);
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
    licenseNumber: '',
    licenseState: 'NY',
    licenseExpiry: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehiclePlate: '',
    insuranceProvider: '',
    insurancePolicy: '',
    backgroundCheck: false,
    termsAgreed: false,
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    preferredAreas: [],
    profileImage: null,
    licenseImage: null,
    insuranceImage: null,
    vehicleImage: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name.startsWith('availability.')) {
        const day = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          availability: {
            ...prev.availability,
            [day]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handlePreferredAreaChange = (area: string) => {
    setFormData(prev => {
      const currentAreas = prev.preferredAreas as string[];
      
      if (currentAreas.includes(area)) {
        return {
          ...prev,
          preferredAreas: currentAreas.filter(a => a !== area)
        };
      } else {
        return {
          ...prev,
          preferredAreas: [...currentAreas, area]
        };
      }
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNumber === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 21) newErrors.dateOfBirth = 'You must be at least 21 years old';
      }
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    } else if (stepNumber === 2) {
      if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      if (!formData.licenseState) newErrors.licenseState = 'License state is required';
      if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiration date is required';
      if (!formData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required';
      if (!formData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required';
      if (!formData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
      if (!formData.vehicleColor) newErrors.vehicleColor = 'Vehicle color is required';
      if (!formData.vehiclePlate) newErrors.vehiclePlate = 'Vehicle plate number is required';
      if (!formData.insuranceProvider) newErrors.insuranceProvider = 'Insurance provider is required';
      if (!formData.insurancePolicy) newErrors.insurancePolicy = 'Insurance policy number is required';
    } else if (stepNumber === 3) {
      const hasAvailability = Object.values(formData.availability).some(value => value);
      if (!hasAvailability) newErrors.availability = 'Please select at least one day of availability';
      
      if (formData.preferredAreas.length === 0) newErrors.preferredAreas = 'Please select at least one preferred area';
    } else if (stepNumber === 4) {
      if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';
      if (!formData.licenseImage) newErrors.licenseImage = 'License image is required';
      if (!formData.insuranceImage) newErrors.insuranceImage = 'Insurance image is required';
      if (!formData.vehicleImage) newErrors.vehicleImage = 'Vehicle image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(step) && !formData.termsAgreed) {
      setErrors({ termsAgreed: 'You must agree to the terms and conditions' });
      return;
    }
    
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // In a real app, this would submit the form data to your backend
        console.log('Form submitted:', formData);
      }, 2000);
    }
  };

  // Areas for delivery
  const deliveryAreas = [
    'JFK Airport Area',
    'Queens',
    'Nassau County',
    'Five Towns',
    'Long Island',
    'Brooklyn'
  ];

  if (submitSuccess) {
    return (
      <div className="bg-neutral-50 min-h-screen py-16">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-xl text-neutral-600 mb-6">
              Thank you for applying to be a JFK Cannabis delivery driver. We'll review your application and contact you within 2-3 business days.
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg mb-6 text-left">
              <h2 className="text-xl font-bold mb-4">What's Next?</h2>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                  <span>Our team will review your application and verify your information</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                  <span>You'll receive an email with instructions for a background check</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                  <span>Once approved, you'll be invited to an orientation session</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
                  <span>Start making deliveries and earning money!</span>
                </li>
              </ol>
            </div>
            <Link to="/" className="btn-primary inline-flex items-center">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <Link to="/" className="flex items-center text-primary-600 hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 text-white p-6">
            <h1 className="text-2xl font-bold">Become a JFK Cannabis Delivery Driver</h1>
            <p className="mt-2 opacity-90">Flexible hours, competitive pay, and weekly payouts</p>
          </div>
          
          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700">Application Progress</span>
              <span className="text-sm font-medium text-neutral-700">{step} of 4</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                
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
                      className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
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
                      className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                      className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 mb-1">
                      Date of Birth * (Must be 21+)
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.dateOfBirth ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
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
                      className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full p-2 border ${errors.state ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                      >
                        <option value="NY">New York</option>
                        <option value="NJ">New Jersey</option>
                        <option value="CT">Connecticut</option>
                      </select>
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
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
                        className={`w-full p-2 border ${errors.zipCode ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Driver Information */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Driver Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                      Driver's License Number *
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.licenseNumber ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
                  </div>
                  <div>
                    <label htmlFor="licenseState" className="block text-sm font-medium text-neutral-700 mb-1">
                      License State *
                    </label>
                    <select
                      id="licenseState"
                      name="licenseState"
                      value={formData.licenseState}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.licenseState ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    >
                      <option value="NY">New York</option>
                      <option value="NJ">New Jersey</option>
                      <option value="CT">Connecticut</option>
                    </select>
                    {errors.licenseState && <p className="mt-1 text-sm text-red-600">{errors.licenseState}</p>}
                  </div>
                  <div>
                    <label htmlFor="licenseExpiry" className="block text-sm font-medium text-neutral-700 mb-1">
                      License Expiration Date *
                    </label>
                    <input
                      type="date"
                      id="licenseExpiry"
                      name="licenseExpiry"
                      value={formData.licenseExpiry}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.licenseExpiry ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.licenseExpiry && <p className="mt-1 text-sm text-red-600">{errors.licenseExpiry}</p>}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="vehicleMake" className="block text-sm font-medium text-neutral-700 mb-1">
                      Vehicle Make *
                    </label>
                    <input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleInputChange}
                      placeholder="e.g., Toyota"
                      className={`w-full p-2 border ${errors.vehicleMake ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.vehicleMake && <p className="mt-1 text-sm text-red-600">{errors.vehicleMake}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleModel" className="block text-sm font-medium text-neutral-700 mb-1">
                      Vehicle Model *
                    </label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="e.g., Camry"
                      className={`w-full p-2 border ${errors.vehicleModel ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.vehicleModel && <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleYear" className="block text-sm font-medium text-neutral-700 mb-1">
                      Vehicle Year *
                    </label>
                    <input
                      type="text"
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleInputChange}
                      placeholder="e.g., 2020"
                      className={`w-full p-2 border ${errors.vehicleYear ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.vehicleYear && <p className="mt-1 text-sm text-red-600">{errors.vehicleYear}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleColor" className="block text-sm font-medium text-neutral-700 mb-1">
                      Vehicle Color *
                    </label>
                    <input
                      type="text"
                      id="vehicleColor"
                      name="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={handleInputChange}
                      placeholder="e.g., Silver"
                      className={`w-full p-2 border ${errors.vehicleColor ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.vehicleColor && <p className="mt-1 text-sm text-red-600">{errors.vehicleColor}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehiclePlate" className="block text-sm font-medium text-neutral-700 mb-1">
                      License Plate Number *
                    </label>
                    <input
                      type="text"
                      id="vehiclePlate"
                      name="vehiclePlate"
                      value={formData.vehiclePlate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.vehiclePlate ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.vehiclePlate && <p className="mt-1 text-sm text-red-600">{errors.vehiclePlate}</p>}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="insuranceProvider" className="block text-sm font-medium text-neutral-700 mb-1">
                      Insurance Provider *
                    </label>
                    <input
                      type="text"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.insuranceProvider ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.insuranceProvider && <p className="mt-1 text-sm text-red-600">{errors.insuranceProvider}</p>}
                  </div>
                  <div>
                    <label htmlFor="insurancePolicy" className="block text-sm font-medium text-neutral-700 mb-1">
                      Policy Number *
                    </label>
                    <input
                      type="text"
                      id="insurancePolicy"
                      name="insurancePolicy"
                      value={formData.insurancePolicy}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${errors.insurancePolicy ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    />
                    {errors.insurancePolicy && <p className="mt-1 text-sm text-red-600">{errors.insurancePolicy}</p>}
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="backgroundCheck"
                    name="backgroundCheck"
                    checked={formData.backgroundCheck}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="backgroundCheck" className="ml-2 block text-sm text-neutral-700">
                    I consent to a background check as part of the application process
                  </label>
                </div>
              </div>
            )}
            
            {/* Step 3: Availability & Preferences */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Availability & Preferences</h2>
                
                <h3 className="text-lg font-medium mb-4">Weekly Availability</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {Object.keys(formData.availability).map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`availability.${day}`}
                        name={`availability.${day}`}
                        checked={formData.availability[day as keyof typeof formData.availability]}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor={`availability.${day}`} className="ml-2 block text-sm text-neutral-700 capitalize">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.availability && <p className="mt-1 text-sm text-red-600 mb-4">{errors.availability}</p>}
                
                <h3 className="text-lg font-medium mb-4">Preferred Delivery Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {deliveryAreas.map((area) => (
                    <div key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`area-${area}`}
                        checked={(formData.preferredAreas as string[]).includes(area)}
                        onChange={() => handlePreferredAreaChange(area)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor={`area-${area}`} className="ml-2 block text-sm text-neutral-700">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.preferredAreas && <p className="mt-1 text-sm text-red-600 mb-4">{errors.preferredAreas}</p>}
                
                <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Car className="h-5 w-5 text-primary-600 mr-2" />
                    Delivery Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Valid driver's license with clean driving record</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Reliable vehicle with current registration and insurance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Smartphone with data plan for delivery app</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Must be 21+ years of age</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Must pass background check</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Step 4: Document Upload */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Document Upload</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Profile Photo *
                    </label>
                    <div className={`border-2 border-dashed ${errors.profileImage ? 'border-red-300' : 'border-neutral-300'} rounded-lg p-6 flex flex-col items-center`}>
                      <User className="h-12 w-12 text-neutral-400 mb-3" />
                      <p className="text-sm text-neutral-500 mb-4 text-center">
                        Upload a clear photo of yourself for your driver profile
                      </p>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'profileImage')}
                        className="hidden"
                      />
                      <label
                        htmlFor="profileImage"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                      >
                        Select Photo
                      </label>
                      {formData.profileImage && (
                        <p className="mt-2 text-sm text-green-600">
                          Photo selected: {(formData.profileImage as File).name}
                        </p>
                      )}
                    </div>
                    {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Driver's License (Front & Back) *
                    </label>
                    <div className={`border-2 border-dashed ${errors.licenseImage ? 'border-red-300' : 'border-neutral-300'} rounded-lg p-6 flex flex-col items-center`}>
                      <Shield className="h-12 w-12 text-neutral-400 mb-3" />
                      <p className="text-sm text-neutral-500 mb-4 text-center">
                        Upload clear photos of the front and back of your driver's license
                      </p>
                      <input
                        type="file"
                        id="licenseImage"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'licenseImage')}
                        className="hidden"
                      />
                      <label
                        htmlFor="licenseImage"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                      >
                        Select Photos
                      </label>
                      {formData.licenseImage && (
                        <p className="mt-2 text-sm text-green-600">
                          Photos selected: {(formData.licenseImage as File).name}
                        </p>
                      )}
                    </div>
                    {errors.licenseImage && <p className="mt-1 text-sm text-red-600">{errors.licenseImage}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Proof of Insurance *
                    </label>
                    <div className={`border-2 border-dashed ${errors.insuranceImage ? 'border-red-300' : 'border-neutral-300'} rounded-lg p-6 flex flex-col items-center`}>
                      <Shield className="h-12 w-12 text-neutral-400 mb-3" />
                      <p className="text-sm text-neutral-500 mb-4 text-center">
                        Upload a photo of your current insurance card or policy
                      </p>
                      <input
                        type="file"
                        id="insuranceImage"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'insuranceImage')}
                        className="hidden"
                      />
                      <label
                        htmlFor="insuranceImage"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                      >
                        Select Photo
                      </label>
                      {formData.insuranceImage && (
                        <p className="mt-2 text-sm text-green-600">
                          Photo selected: {(formData.insuranceImage as File).name}
                        </p>
                      )}
                    </div>
                    {errors.insuranceImage && <p className="mt-1 text-sm text-red-600">{errors.insuranceImage}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Vehicle Photo *
                    </label>
                    <div className={`border-2 border-dashed ${errors.vehicleImage ? 'border-red-300' : 'border-neutral-300'} rounded-lg p-6 flex flex-col items-center`}>
                      <Car className="h-12 w-12 text-neutral-400 mb-3" />
                      <p className="text-sm text-neutral-500 mb-4 text-center">
                        Upload a clear photo of your vehicle (exterior)
                      </p>
                      <input
                        type="file"
                        id="vehicleImage"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'vehicleImage')}
                        className="hidden"
                      />
                      <label
                        htmlFor="vehicleImage"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                      >
                        Select Photo
                      </label>
                      {formData.vehicleImage && (
                        <p className="mt-2 text-sm text-green-600">
                          Photo selected: {(formData.vehicleImage as File).name}
                        </p>
                      )}
                    </div>
                    {errors.vehicleImage && <p className="mt-1 text-sm text-red-600">{errors.vehicleImage}</p>}
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="termsAgreed"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                    />
                    <label htmlFor="termsAgreed" className="ml-2 block text-sm text-neutral-700">
                      I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>, <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>, and <a href="#" className="text-primary-600 hover:underline">Driver Agreement</a>. I confirm that I am 21 years of age or older and have a valid driver's license.
                    </label>
                  </div>
                  {errors.termsAgreed && <p className="mt-1 text-sm text-red-600 mb-4">{errors.termsAgreed}</p>}
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 ml-auto flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
          
          {/* Benefits Section */}
          <div className="bg-neutral-50 p-6 border-t border-neutral-200">
            <h3 className="text-lg font-medium mb-4">Benefits of Driving with JFK Cannabis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="font-medium mb-1">Competitive Pay</h4>
                <p className="text-sm text-neutral-600">Earn $20-30/hr including tips</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="font-medium mb-1">Flexible Schedule</h4>
                <p className="text-sm text-neutral-600">Work when you want, no minimum hours</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-3 rounded-full mb-3">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="font-medium mb-1">Weekly Payouts</h4>
                <p className="text-sm text-neutral-600">Get paid every week, direct deposit</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What are the requirements to become a driver?</h3>
              <p className="text-neutral-600 text-sm">
                You must be 21+ years old, have a valid driver's license, reliable vehicle, smartphone, auto insurance, and pass a background check.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How much can I earn?</h3>
              <p className="text-neutral-600 text-sm">
                Drivers typically earn $20-30 per hour including tips. Earnings can vary based on delivery volume, distance, and tips.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How does scheduling work?</h3>
              <p className="text-neutral-600 text-sm">
                You can set your own availability and choose which days and times you want to work. There are no minimum hour requirements.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How long does the application process take?</h3>
              <p className="text-neutral-600 text-sm">
                Typically 3-5 business days, including background check verification. You'll be notified by email once approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSignup;
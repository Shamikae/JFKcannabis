import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cake, 
  Gift, 
  Calendar, 
  Users, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Info, 
  Star, 
  Package, 
  Truck, 
  Clock, 
  Building,
  Sparkles,
  PartyPopper
} from 'lucide-react';

interface BirthdayPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  guestCount: string;
  image: string;
  popular?: boolean;
  products: Array<{
    name: string;
    quantity: number;
    type: string;
  }>;
}

interface CorporatePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  guestCount: string;
  image: string;
  popular?: boolean;
  products: Array<{
    name: string;
    quantity: number;
    type: string;
  }>;
}

const BirthdayPackages: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'birthday' | 'corporate' | 'gift'>('birthday');
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<BirthdayPackage | CorporatePackage | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Birthday packages
  const birthdayPackages: BirthdayPackage[] = [
    {
      id: 'birthday-small',
      name: 'Birthday Starter',
      price: 199.99,
      description: 'Perfect for intimate birthday celebrations with close friends',
      features: [
        'Curated selection of premium products',
        'Birthday-themed packaging',
        'Personalized birthday card',
        'Free delivery within service area',
        'Pre-rolled joints for easy sharing'
      ],
      guestCount: '5-10 guests',
      image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
      products: [
        { name: 'Pre-Rolls', quantity: 10, type: 'Hybrid' },
        { name: 'Edible Gummies', quantity: 2, type: 'Assorted Flavors' },
        { name: 'Vape Cartridge', quantity: 1, type: 'Sativa' }
      ]
    },
    {
      id: 'birthday-medium',
      name: 'Birthday Blowout',
      price: 349.99,
      description: 'The ultimate birthday party package for cannabis enthusiasts',
      features: [
        'Premium selection of top-shelf products',
        'Luxury birthday-themed packaging',
        'Personalized birthday card and gift',
        'Priority delivery within service area',
        'Mix of products for different preferences',
        'Cannabis-infused birthday treats'
      ],
      guestCount: '10-20 guests',
      image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
      popular: true,
      products: [
        { name: 'Pre-Rolls', quantity: 20, type: 'Assorted' },
        { name: 'Edible Gummies', quantity: 5, type: 'Assorted Flavors' },
        { name: 'Vape Cartridges', quantity: 2, type: 'Hybrid & Indica' },
        { name: 'Flower', quantity: 7, type: '3.5g Jars' }
      ]
    },
    {
      id: 'birthday-large',
      name: 'Birthday Extravaganza',
      price: 599.99,
      description: 'For the ultimate cannabis birthday celebration with all your friends',
      features: [
        'Comprehensive selection of premium products',
        'Luxury gift boxes for each guest',
        'Custom birthday banner and decorations',
        'VIP delivery service',
        'Dedicated cannabis concierge',
        'Cannabis-infused birthday cake',
        'Exclusive birthday merch'
      ],
      guestCount: '20-30 guests',
      image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg',
      products: [
        { name: 'Pre-Rolls', quantity: 30, type: 'Assorted' },
        { name: 'Edible Gummies', quantity: 10, type: 'Assorted Flavors' },
        { name: 'Vape Cartridges', quantity: 5, type: 'Full Spectrum' },
        { name: 'Flower', quantity: 14, type: '3.5g Jars' },
        { name: 'Concentrates', quantity: 3, type: 'Live Rosin' }
      ]
    }
  ];
  
  // Corporate packages
  const corporatePackages: CorporatePackage[] = [
    {
      id: 'corporate-small',
      name: 'Team Retreat',
      price: 499.99,
      description: 'Perfect for small team-building events and corporate retreats',
      features: [
        'Curated selection of premium products',
        'Professional packaging',
        'Discreet delivery',
        'Variety of low-dose options',
        'Educational materials included'
      ],
      guestCount: '10-15 team members',
      image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
      products: [
        { name: 'Low-dose Pre-Rolls', quantity: 15, type: 'Balanced' },
        { name: 'Microdose Edibles', quantity: 5, type: 'Assorted' },
        { name: 'CBD-dominant Products', quantity: 5, type: 'Various' }
      ]
    },
    {
      id: 'corporate-medium',
      name: 'Corporate Event',
      price: 999.99,
      description: 'Elevate your corporate event with premium cannabis products',
      features: [
        'Extensive selection of premium products',
        'Elegant corporate packaging',
        'Scheduled delivery',
        'Mix of THC and CBD options',
        'Product information cards',
        'Cannabis concierge available'
      ],
      guestCount: '20-30 attendees',
      image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
      popular: true,
      products: [
        { name: 'Pre-Rolls', quantity: 30, type: 'Assorted' },
        { name: 'Edible Gummies', quantity: 10, type: 'Low-dose' },
        { name: 'Vape Cartridges', quantity: 5, type: 'Premium' },
        { name: 'CBD Products', quantity: 10, type: 'Various' }
      ]
    },
    {
      id: 'corporate-large',
      name: 'Executive Retreat',
      price: 1999.99,
      description: 'The ultimate cannabis experience for executive teams and VIP events',
      features: [
        'Exclusive selection of top-shelf products',
        'Luxury branded packaging',
        'White glove delivery service',
        'On-site cannabis educator',
        'Custom product selection',
        'Private tasting experience',
        'Exclusive corporate gifts'
      ],
      guestCount: '30-50 executives',
      image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg',
      products: [
        { name: 'Premium Pre-Rolls', quantity: 50, type: 'Artisanal' },
        { name: 'Gourmet Edibles', quantity: 15, type: 'Chef-created' },
        { name: 'Luxury Vape Pens', quantity: 10, type: 'Limited Edition' },
        { name: 'Top-shelf Flower', quantity: 20, type: '3.5g Jars' },
        { name: 'Premium Concentrates', quantity: 5, type: 'Solventless' }
      ]
    }
  ];
  
  // Gift packages
  const giftPackages = [
    {
      id: 'gift-small',
      name: 'Cannabis Starter Gift',
      price: 99.99,
      description: 'Perfect introduction to cannabis for your loved one',
      features: [
        'Curated selection for beginners',
        'Elegant gift packaging',
        'Personalized gift message',
        'Educational materials',
        'Discreet delivery'
      ],
      image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
      products: [
        { name: 'Pre-Rolls', quantity: 3, type: 'Balanced' },
        { name: 'Edible Gummies', quantity: 1, type: 'Low-dose' },
        { name: 'CBD Tincture', quantity: 1, type: 'Beginner-friendly' }
      ]
    },
    {
      id: 'gift-medium',
      name: 'Cannabis Connoisseur Gift',
      price: 199.99,
      description: 'For the cannabis enthusiast in your life',
      features: [
        'Premium selection of products',
        'Luxury gift box',
        'Personalized gift message',
        'Terpene and strain guide',
        'Scheduled delivery'
      ],
      image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
      popular: true,
      products: [
        { name: 'Premium Flower', quantity: 2, type: '3.5g Jars' },
        { name: 'Artisanal Pre-Rolls', quantity: 5, type: 'Assorted' },
        { name: 'Gourmet Edibles', quantity: 2, type: 'Chef-created' },
        { name: 'Live Resin Cartridge', quantity: 1, type: 'Full Spectrum' }
      ]
    },
    {
      id: 'gift-large',
      name: 'Cannabis Luxury Gift',
      price: 349.99,
      description: 'The ultimate cannabis gift experience',
      features: [
        'Exclusive selection of top-shelf products',
        'Handcrafted wooden gift box',
        'Personalized gift card and message',
        'Cannabis accessories included',
        'White glove delivery service',
        'Gift wrapping service'
      ],
      image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg',
      products: [
        { name: 'Top-shelf Flower', quantity: 3, type: '3.5g Jars' },
        { name: 'Luxury Pre-Rolls', quantity: 7, type: 'Artisanal' },
        { name: 'Premium Edibles', quantity: 3, type: 'Gourmet' },
        { name: 'Live Rosin Cartridge', quantity: 2, type: 'Solventless' },
        { name: 'Cannabis Accessories', quantity: 1, type: 'Premium Set' }
      ]
    }
  ];
  
  const handlePackageSelect = (pkg: BirthdayPackage | CorporatePackage) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    setSelectedPackage(pkg);
    setShowCustomizeModal(true);
  };
  
  const handleSubmitOrder = () => {
    // In a real app, this would submit the order to your backend
    console.log('Order submitted:', {
      package: selectedPackage,
      deliveryDate,
      specialInstructions
    });
    
    // Close modal and show success message
    setShowCustomizeModal(false);
    alert('Your order has been placed successfully! We will contact you to confirm the details.');
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[50vh] min-h-[400px] bg-black">
          <img
            src="https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg"
            alt="Cannabis Birthday Packages"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Cannabis Party Packages
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-xl">
                Elevate your celebrations with premium cannabis packages for birthdays, corporate events, and gifts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setSelectedTab('birthday')}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedTab === 'birthday' 
                      ? 'bg-white text-primary-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Cake className="h-5 w-5 inline-block mr-2" />
                  Birthday Packages
                </button>
                <button 
                  onClick={() => setSelectedTab('corporate')}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedTab === 'corporate' 
                      ? 'bg-white text-primary-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Building className="h-5 w-5 inline-block mr-2" />
                  Corporate Events
                </button>
                <button 
                  onClick={() => setSelectedTab('gift')}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedTab === 'gift' 
                      ? 'bg-white text-primary-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Gift className="h-5 w-5 inline-block mr-2" />
                  Gift Packages
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {selectedTab === 'birthday' && (
            <>
              <h2 className="text-3xl font-bold mb-4">Birthday Cannabis Packages</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Make your birthday celebration unforgettable with our premium cannabis packages. Perfect for sharing with friends and creating memorable experiences.
              </p>
            </>
          )}
          
          {selectedTab === 'corporate' && (
            <>
              <h2 className="text-3xl font-bold mb-4">Corporate Event Packages</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Elevate your corporate events, team retreats, and business gatherings with our premium cannabis packages designed for professionals.
              </p>
            </>
          )}
          
          {selectedTab === 'gift' && (
            <>
              <h2 className="text-3xl font-bold mb-4">Cannabis Gift Packages</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Give the gift of premium cannabis to your loved ones. Our curated gift packages are perfect for any occasion.
              </p>
            </>
          )}
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Pre-order 7+ days in advance
            </div>
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <Users className="h-4 w-4 mr-2" />
              Perfect for groups
            </div>
            <div className="flex items-center bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-sm">
              <Truck className="h-4 w-4 mr-2" />
              Free delivery
            </div>
          </div>
        </div>
        
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {selectedTab === 'birthday' && birthdayPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg z-10">
                  <Star className="h-4 w-4 inline-block mr-1" />
                  Most Popular
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-neutral-600 mb-4">{pkg.description}</p>
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-neutral-700">{pkg.guestCount}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {pkg.products.map((product, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{product.quantity}x {product.name} ({product.type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-primary-600">${pkg.price}</div>
                  <div className="text-sm text-neutral-500">Bulk savings applied</div>
                </div>
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Select Package
                </button>
              </div>
            </motion.div>
          ))}
          
          {selectedTab === 'corporate' && corporatePackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg z-10">
                  <Star className="h-4 w-4 inline-block mr-1" />
                  Most Popular
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-neutral-600 mb-4">{pkg.description}</p>
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-neutral-700">{pkg.guestCount}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {pkg.products.map((product, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{product.quantity}x {product.name} ({product.type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-primary-600">${pkg.price}</div>
                  <div className="text-sm text-neutral-500">Bulk savings applied</div>
                </div>
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Select Package
                </button>
              </div>
            </motion.div>
          ))}
          
          {selectedTab === 'gift' && giftPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg z-10">
                  <Star className="h-4 w-4 inline-block mr-1" />
                  Most Popular
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-neutral-600 mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {pkg.products.map((product, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{product.quantity}x {product.name} ({product.type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-primary-600">${pkg.price}</div>
                  <div className="text-sm text-neutral-500">Gift wrapped</div>
                </div>
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Select Gift
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Choose Your Package</h3>
              <p className="text-neutral-600 text-sm">
                Select the perfect package for your celebration or event
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Customize Your Order</h3>
              <p className="text-neutral-600 text-sm">
                Add special requests or customize products to your preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Schedule Delivery</h3>
              <p className="text-neutral-600 text-sm">
                Choose your preferred delivery date and time
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Enjoy Your Celebration</h3>
              <p className="text-neutral-600 text-sm">
                Receive your package and enjoy your cannabis-enhanced celebration
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">J</span>
                </div>
                <div>
                  <h3 className="font-bold">Jessica M.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "I ordered the Birthday Blowout package for my 30th and it was amazing! Everything arrived on time, beautifully packaged, and my friends were impressed with the quality. Will definitely order again!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">M</span>
                </div>
                <div>
                  <h3 className="font-bold">Michael T.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "Ordered the Corporate Event package for our company retreat. The variety was perfect for our team's different preferences, and the discreet packaging was much appreciated. Great service!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-600">S</span>
                </div>
                <div>
                  <h3 className="font-bold">Sarah K.</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">
                "I sent the Cannabis Connoisseur Gift to my brother for his birthday. He was thrilled with the selection and quality. The gift packaging was beautiful and the personalized message was a nice touch."
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">How far in advance should I order?</h3>
              <p className="text-neutral-600">
                We recommend placing your order at least 7 days before your event to ensure availability and proper preparation. For large corporate events, 14 days is preferred.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Can I customize my package?</h3>
              <p className="text-neutral-600">
                Yes! After selecting a package, you can customize it to your preferences. You can add or remove products, specify strains, and add special requests.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Is ID verification required?</h3>
              <p className="text-neutral-600">
                Yes, all recipients must be 21+ with valid ID. For parties, the primary purchaser must verify their ID, and all guests consuming cannabis must be 21+.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Do you deliver to event venues?</h3>
              <p className="text-neutral-600">
                Yes, we can deliver to private residences, select hotels, and partner venues. Please check with your venue about their cannabis policies before ordering.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Can I schedule a specific delivery time?</h3>
              <p className="text-neutral-600">
                Yes, you can select a preferred delivery window during checkout. For events, we recommend scheduling delivery 1-2 hours before guests arrive.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">What if I need to cancel or change my order?</h3>
              <p className="text-neutral-600">
                Changes or cancellations can be made up to 72 hours before your scheduled delivery. Contact our customer service team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customize Modal */}
      {showCustomizeModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Customize Your {selectedPackage.name}
                </h2>
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Package Details</h3>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Package:</span>
                    <span>{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Price:</span>
                    <span>${selectedPackage.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">For:</span>
                    <span>{selectedPackage.guestCount}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Included Products</h3>
                <div className="space-y-3">
                  {selectedPackage.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <span className="font-medium">{product.quantity}x {product.name}</span>
                        <p className="text-sm text-neutral-500">{product.type}</p>
                      </div>
                      <div className="flex items-center">
                        <button className="p-1 text-neutral-400 hover:text-neutral-600">
                          <Info className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                      Delivery Date *
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <p className="mt-1 text-xs text-neutral-500">
                      Please select a date at least 7 days from today
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-neutral-700 mb-1">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="specialInstructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add any special requests, customizations, or delivery instructions here..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="font-medium">Important Information</h4>
                </div>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• All recipients must be 21+ with valid ID</li>
                  <li>• Orders can be modified up to 72 hours before delivery</li>
                  <li>• Delivery available within our service area only</li>
                  <li>• Payment will be processed upon order confirmation</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="flex-1 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!deliveryDate}
                  className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center ${
                    deliveryDate 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Account Required</h2>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-600 mb-4">
                  You need to be logged in to order birthday and event packages. This helps us verify your age and manage your orders.
                </p>
                
                <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 text-primary-600 mr-2" />
                    <h4 className="font-medium">Why create an account?</h4>
                  </div>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Track your orders and delivery status</li>
                    <li>• Save your preferences for future orders</li>
                    <li>• Access exclusive member-only deals</li>
                    <li>• Verify your age once for all purchases</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/account"
                  className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/account"
                  className="flex-1 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayPackages;
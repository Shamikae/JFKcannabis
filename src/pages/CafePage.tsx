import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, IceCream, Utensils, Clock, MapPin, Users, ArrowRight, Check, Plus, ShoppingCart } from 'lucide-react';
import { nyLicensedProducts } from '../data/nyLicensedProducts';

interface CafeItem {
  id: string;
  name: string;
  category: 'beverages' | 'ice-cream' | 'pastries';
  price: number;
  description: string;
  image: string;
  compatibleAddOns: string[];
}

interface THCAddOn {
  id: string;
  name: string;
  type: 'dissolvable' | 'tincture' | 'chocolate' | 'caramel' | 'honey' | 'edible' | 'mix';
  thcContent: number;
  price: number;
  compatibleWith: string[];
  pickupRequired: boolean;
}

const CafePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beverages' | 'ice-cream' | 'pastries'>('all');
  const [selectedAddOns, setSelectedAddOns] = useState<{ [itemId: string]: string[] }>({});
  const [showAddOnModal, setShowAddOnModal] = useState<string | null>(null);

  // Mock cafe menu items
  const cafeItems: CafeItem[] = [
    {
      id: 'espresso',
      name: 'Specialty Espresso',
      category: 'beverages',
      price: 4.50,
      description: 'Rich and smooth espresso, perfect with THC honey or tinctures',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      compatibleAddOns: ['dissolvables', 'tinctures', 'honey']
    },
    {
      id: 'cold-brew',
      name: 'Nitro Cold Brew',
      category: 'beverages',
      price: 5.50,
      description: 'Smooth and creamy cold brew with subtle chocolate notes',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      compatibleAddOns: ['dissolvables', 'tinctures', 'chocolate']
    },
    {
      id: 'matcha-latte',
      name: 'Matcha Latte',
      category: 'beverages',
      price: 5.00,
      description: 'Organic ceremonial grade matcha latte',
      image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
      compatibleAddOns: ['dissolvables', 'tinctures', 'honey']
    },
    {
      id: 'herbal-tea',
      name: 'Fresh Herb Tea',
      category: 'beverages',
      price: 4.00,
      description: 'Locally sourced herbs and botanicals',
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
      compatibleAddOns: ['dissolvables', 'tinctures', 'honey']
    },
    {
      id: 'vanilla-ice-cream',
      name: 'Artisanal Vanilla Ice Cream',
      category: 'ice-cream',
      price: 6.00,
      description: 'Small-batch vanilla ice cream, perfect for crushing THC cookies or adding cannabis caramel',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
      compatibleAddOns: ['edibles', 'chocolate', 'caramel', 'mix']
    },
    {
      id: 'chocolate-ice-cream',
      name: 'Rich Chocolate Ice Cream',
      category: 'ice-cream',
      price: 6.50,
      description: 'Decadent chocolate ice cream made with premium cocoa',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
      compatibleAddOns: ['edibles', 'chocolate', 'caramel', 'mix']
    },
    {
      id: 'seasonal-sorbet',
      name: 'Seasonal Fruit Sorbet',
      category: 'ice-cream',
      price: 5.50,
      description: 'Fresh seasonal fruit sorbet, dairy-free option',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
      compatibleAddOns: ['tinctures', 'mix']
    },
    {
      id: 'croissant',
      name: 'Butter Croissant',
      category: 'pastries',
      price: 4.50,
      description: 'Flaky, buttery croissant baked fresh daily',
      image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg',
      compatibleAddOns: ['chocolate', 'caramel', 'honey']
    },
    {
      id: 'muffin',
      name: 'Blueberry Muffin',
      category: 'pastries',
      price: 4.00,
      description: 'House-made blueberry muffin with fresh berries',
      image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg',
      compatibleAddOns: ['chocolate', 'caramel', 'honey']
    }
  ];

  // THC Add-ons from JFK Cannabis products
  const thcAddOns: THCAddOn[] = [
    // Dissolvables
    {
      id: 'nanticoke-hi-stix',
      name: 'Nanticoke Hi Stix Powder',
      type: 'dissolvable',
      thcContent: 5,
      price: 20.00,
      compatibleWith: ['beverages'],
      pickupRequired: true
    },
    // Tinctures
    {
      id: 'mfny-tincture',
      name: 'MFNY Premium Tincture',
      type: 'tincture',
      thcContent: 5,
      price: 25.00,
      compatibleWith: ['beverages', 'ice-cream'],
      pickupRequired: true
    },
    {
      id: 'green-spectrum-tincture',
      name: 'Green Spectrum Tincture',
      type: 'tincture',
      thcContent: 5,
      price: 25.00,
      compatibleWith: ['beverages', 'ice-cream'],
      pickupRequired: true
    },
    // Chocolates
    {
      id: 'incredibles-chocolate',
      name: 'Incredibles Chocolate Pieces',
      type: 'chocolate',
      thcContent: 10,
      price: 15.00,
      compatibleWith: ['beverages', 'ice-cream', 'pastries'],
      pickupRequired: true
    },
    // Caramel
    {
      id: 'geezont-caramel',
      name: 'Geezont Cannabis Caramel',
      type: 'caramel',
      thcContent: 10,
      price: 20.00,
      compatibleWith: ['beverages', 'ice-cream', 'pastries'],
      pickupRequired: true
    },
    // Honey
    {
      id: 'honey-pot',
      name: 'Cannabis Honey',
      type: 'honey',
      thcContent: 10,
      price: 30.00,
      compatibleWith: ['beverages', 'pastries'],
      pickupRequired: true
    },
    // Edibles for ice cream
    {
      id: 'geezont-cookies',
      name: 'Geezont Chocolate Chip Cookies',
      type: 'edible',
      thcContent: 10,
      price: 20.00,
      compatibleWith: ['ice-cream'],
      pickupRequired: true
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? cafeItems 
    : cafeItems.filter(item => item.category === selectedCategory);

  const getCompatibleAddOns = (item: CafeItem) => {
    return thcAddOns.filter(addon => 
      addon.compatibleWith.some(category => item.compatibleAddOns.includes(category))
    );
  };

  const handleAddOnToggle = (itemId: string, addonId: string) => {
    setSelectedAddOns(prev => {
      const current = prev[itemId] || [];
      const updated = current.includes(addonId)
        ? current.filter(id => id !== addonId)
        : [...current, addonId];
      return { ...prev, [itemId]: updated };
    });
  };

  const getTotalPrice = (item: CafeItem) => {
    const addOnIds = selectedAddOns[item.id] || [];
    const addOnTotal = addOnIds.reduce((total, addonId) => {
      const addon = thcAddOns.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return item.price + addOnTotal;
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[60vh] min-h-[400px] bg-black">
          <img
            src="https://images.pexels.com/photos/6306246/pexels-photo-6306246.jpeg"
            alt="JFK Cannabis Cafe"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              JFK Cannabis Cafe
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Where premium coffee meets premium cannabis.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-heading">A Unique Experience</h2>
            <p className="text-lg text-neutral-600">
              Our cafe is directly connected to our dispensary, allowing you to enhance your favorite cafe treats with our premium cannabis products. Create your perfect experience by infusing our cafe items with your cannabis purchases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mb-4">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Coffee</h3>
              <p className="text-neutral-600">
                Enjoy our selection of specialty coffees, from rich espressos to smooth cold brews, ready to be infused with THC honey or cannabis-infused tinctures.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mb-4">
                <IceCream className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gourmet Ice Cream</h3>
              <p className="text-neutral-600">
                Indulge in our artisanal ice creams, perfect for crushing up a THC cookie or adding caramel cannabis toppings for an elevated experience.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mb-4">
                <Utensils className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cannabis Infusion</h3>
              <p className="text-neutral-600">
                Our staff will help you pair the perfect cannabis product with your cafe selection for a customized, elevated experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cafe Menu */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-heading text-center">Cafe Menu</h2>
          <p className="text-center text-neutral-600 mb-8">
            Choose your cafe items and add THC products for the perfect infusion experience
          </p>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-100 rounded-lg p-1">
              {(['all', 'beverages', 'ice-cream', 'pastries'] as const).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category === 'all' ? 'All Items' : 
                   category === 'ice-cream' ? 'Ice Cream' :
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const compatibleAddOns = getCompatibleAddOns(item);
              const selectedItemAddOns = selectedAddOns[item.id] || [];
              
              return (
                <div key={item.id} className="card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-neutral-500">Cafe Item Only</span>
                    </div>

                    {/* THC Add-ons */}
                    {compatibleAddOns.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3 flex items-center">
                          <Plus className="h-4 w-4 mr-2 text-primary-600" />
                          Available THC Add-ons
                        </h4>
                        
                        <div className="space-y-2 mb-4">
                          {compatibleAddOns.slice(0, 3).map(addon => (
                            <label key={addon.id} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={selectedItemAddOns.includes(addon.id)}
                                onChange={() => handleAddOnToggle(item.id, addon.id)}
                                className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                              />
                              <span className="flex-1">{addon.name}</span>
                              <span className="font-medium">${addon.price.toFixed(2)}</span>
                            </label>
                          ))}
                          {compatibleAddOns.length > 3 && (
                            <button
                              onClick={() => setShowAddOnModal(item.id)}
                              className="text-primary-600 text-sm hover:underline"
                            >
                              +{compatibleAddOns.length - 3} more add-ons
                            </button>
                          )}
                        </div>

                        {selectedItemAddOns.length > 0 && (
                          <div className="bg-primary-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total with Add-ons:</span>
                              <span className="font-bold text-primary-600">
                                ${getTotalPrice(item).toFixed(2)}
                              </span>
                            </div>
                            <p className="text-xs text-primary-700 mt-1">
                              Cannabis products require pickup at cafe with ID verification
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button className="flex-1 bg-neutral-100 text-neutral-700 py-2 px-4 rounded-lg hover:bg-neutral-200 transition-colors">
                            Cafe Item Only
                          </button>
                          {selectedItemAddOns.length > 0 && (
                            <Link
                              to="/shop"
                              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center"
                            >
                              Buy Add-ons
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important Notice */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-bold text-amber-800 mb-2">Important Notice</h3>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Cafe items cannot be purchased online - visit our cafe for food and beverages</li>
              <li>• Cannabis products must be purchased separately from our dispensary</li>
              <li>• Valid ID required for all cannabis product pickups</li>
              <li>• Cannabis products can be delivered to the cafe or picked up curbside</li>
              <li>• Our staff will help you create the perfect infusion experience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-16 bg-neutral-100">
        <div className="container-custom">
          <h2 className="section-heading text-center">Cannabis Delivery to Cafe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Direct Delivery</h3>
              <p className="text-neutral-600 mb-4">
                Have your cannabis products delivered directly to our cafe. Perfect for when you're already enjoying our space.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Order online for cafe delivery
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  ID verification at pickup
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Staff assistance with infusion
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Employee Pickup Service</h3>
              <p className="text-neutral-600 mb-4">
                Authorize our employees to pick up your order on your behalf for curbside delivery or cafe pickup.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Authorized pickup with documentation
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Curbside delivery available
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  OCM compliant process
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Private Membership */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Private Membership Club</h2>
              <p className="text-lg mb-6">
                Join our exclusive membership program designed for local and international cannabis enthusiasts and travelers.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mt-1 bg-primary-600 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Access to members-only lounge areas</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-primary-600 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Priority service and exclusive products</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-primary-600 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Special events and educational workshops</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-primary-600 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Complimentary airport shuttle service</span>
                </li>
              </ul>
              
              <Link to="/memberships" className="btn-primary bg-white text-neutral-900 hover:bg-neutral-200">
                Learn More About Membership
              </Link>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3316926/pexels-photo-3316926.jpeg"
                alt="JFK Cannabis Cafe Lounge"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">Hours</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>9:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>9:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">Location</h3>
              </div>
              <p className="mb-4">
                JFK Cannabis Cafe is located at the same address as our dispensary, directly across from JFK Airport and the JFK DMV.
              </p>
              <p className="font-medium">175-01 Rockaway Blvd, Queens NY 11434</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:underline mt-4 inline-block"
              >
                Get Directions
              </a>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">Policies</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Must be 21+ with valid ID to enter</li>
                <li>• Cannabis consumption permitted in designated areas only</li>
                <li>• No alcohol allowed on premises</li>
                <li>• No reselling of products</li>
                <li>• Management reserves the right to refuse service</li>
                <li>• Please consume responsibly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Modal */}
      {showAddOnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Available THC Add-ons</h3>
                <button
                  onClick={() => setShowAddOnModal(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {getCompatibleAddOns(cafeItems.find(item => item.id === showAddOnModal)!).map(addon => (
                  <div key={addon.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{addon.name}</h4>
                      <span className="font-bold">${addon.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-neutral-600">
                      <span>{addon.thcContent}mg THC</span>
                      <span className="capitalize">{addon.type}</span>
                    </div>
                    {addon.pickupRequired && (
                      <p className="text-xs text-amber-600 mt-2">
                        Requires pickup at cafe with ID verification
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/shop"
                  className="btn-primary inline-flex items-center"
                  onClick={() => setShowAddOnModal(null)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop Cannabis Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafePage;
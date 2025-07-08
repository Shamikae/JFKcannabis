import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Leaf, Zap, Package, Droplets, Pill, Sparkles, Coffee, ShoppingBag, Clock, Cake, Gift, Building, PartyPopper } from 'lucide-react';
import { menuData, productSubCategories } from '../../data/menuData';

const NavMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Flowers': <Leaf className="h-4 w-4" />,
      'Pre-Rolls': <Package className="h-4 w-4" />,
      'Edibles': <Coffee className="h-4 w-4" />,
      'Vapes': <Zap className="h-4 w-4" />,
      'Concentrates': <Sparkles className="h-4 w-4" />,
      'Tinctures': <Droplets className="h-4 w-4" />,
      'Topicals': <Pill className="h-4 w-4" />,
      'Beverages': <Coffee className="h-4 w-4" />,
      'Accessories': <ShoppingBag className="h-4 w-4" />,
      'CBD': <Leaf className="h-4 w-4" />,
      'Pre-Order': <Clock className="h-4 w-4" />,
      'Birthday Packages': <Cake className="h-4 w-4" />,
      'Bulk Orders': <Package className="h-4 w-4" />,
      'Corporate Events': <Building className="h-4 w-4" />,
      'Gift Packages': <Gift className="h-4 w-4" />
    };
    return iconMap[categoryName] || <Package className="h-4 w-4" />;
  };

  const getStrainTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'Sativa': 'text-green-600 bg-green-50',
      'Indica': 'text-purple-600 bg-purple-50',
      'Hybrid': 'text-orange-600 bg-orange-50',
      'Mixed': 'text-blue-600 bg-blue-50'
    };
    return colorMap[type] || 'text-neutral-600 bg-neutral-50';
  };

  // Add Pre-Order to menu data
  const updatedMenuData = [
    ...menuData.slice(0, 1), // Shop
    {
      name: 'Pre-Order',
      path: '/shop/pre-order',
    },
    {
      name: 'Birthday Packages',
      path: '/birthday-packages',
    },
    {
      name: 'Bulk Orders',
      path: '/bulk-orders',
    },
    ...menuData.slice(1) // Rest of the items
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        {updatedMenuData.map((item) => (
          <li 
            key={item.name}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to={item.path}
              className={`flex items-center py-2 text-base font-medium hover:text-primary-600 transition-colors ${
                activeCategory === item.name ? 'text-primary-600' : 'text-neutral-800'
              }`}
            >
              {item.name}
              {item.subCategories && (
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                  activeCategory === item.name ? 'rotate-180' : ''
                }`} />
              )}
            </Link>

            {/* Enhanced Dropdown Menu for Shop */}
            {item.name === 'Shop' && activeCategory === item.name && (
              <div 
                ref={dropdownRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                className="absolute left-0 z-50 mt-1 w-[800px] rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-scrollable"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Shop by Type */}
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                        Shop by Type
                      </h3>
                      <div className="space-y-2">
                        {['Sativa', 'Indica', 'Hybrid', 'Mixed'].map((type) => (
                          <Link
                            key={type}
                            to={`/shop/${type.toLowerCase()}`}
                            className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${getStrainTypeColor(type)} hover:opacity-80`}
                          >
                            <Leaf className="h-4 w-4 mr-2" />
                            {type}
                          </Link>
                        ))}
                        <Link
                          to="/shop/pre-order"
                          className="flex items-center px-3 py-2 text-sm rounded-md transition-colors bg-amber-100 text-amber-800 hover:opacity-80"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Pre-Order
                        </Link>
                      </div>
                    </div>

                    {/* Shop by Category - Column 1 */}
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                        Categories
                      </h3>
                      <div className="space-y-1">
                        {['Flowers', 'Pre-Rolls', 'Edibles', 'Vapes', 'Concentrates'].map((category) => (
                          <div key={category} className="group/item">
                            <Link
                              to={`/shop/${category.toLowerCase().replace('-', '')}`}
                              className="flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors"
                            >
                              {getCategoryIcon(category)}
                              <span className="ml-2">{category}</span>
                            </Link>
                            
                            {/* Subcategories */}
                            {productSubCategories[category.toLowerCase().replace('-', '') as keyof typeof productSubCategories] && (
                              <div className="ml-6 mt-1 space-y-1">
                                {productSubCategories[category.toLowerCase().replace('-', '') as keyof typeof productSubCategories]?.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    to={`/shop/${category.toLowerCase().replace('-', '')}/${sub.slug}`}
                                    className="block px-3 py-1 text-xs text-neutral-500 hover:text-primary-600 transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shop by Category - Column 2 */}
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                        More Categories
                      </h3>
                      <div className="space-y-1">
                        {['Tinctures', 'Topicals', 'Beverages', 'Accessories', 'CBD', 'Pre-Order'].map((category) => (
                          <div key={category} className="group/item">
                            <Link
                              to={`/shop/${category.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors"
                            >
                              {getCategoryIcon(category)}
                              <span className="ml-2">{category}</span>
                            </Link>
                            
                            {/* Subcategories */}
                            {productSubCategories[category.toLowerCase() as keyof typeof productSubCategories] && (
                              <div className="ml-6 mt-1 space-y-1">
                                {productSubCategories[category.toLowerCase() as keyof typeof productSubCategories]?.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    to={`/shop/${category.toLowerCase()}/${sub.slug}`}
                                    className="block px-3 py-1 text-xs text-neutral-500 hover:text-primary-600 transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Banner */}
                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Buying in bulk? Save Big Today!</h4>
                          <p className="text-sm opacity-90">Delivery and Pick Up Available</p>
                        </div>
                        <Link 
                          to="/bulk-orders"
                          className="bg-white text-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Birthday Packages Dropdown */}
            {item.name === 'Birthday Packages' && activeCategory === item.name && (
              <div 
                ref={dropdownRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                className="absolute left-0 z-50 mt-1 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-2">
                  <Link
                    to="/birthday-packages"
                    className="block px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 hover:text-primary-600"
                  >
                    <Cake className="h-4 w-4 inline-block mr-2" />
                    Birthday Packages
                  </Link>
                  <Link
                    to="/birthday-packages?tab=corporate"
                    className="block px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 hover:text-primary-600"
                  >
                    <Building className="h-4 w-4 inline-block mr-2" />
                    Corporate Events
                  </Link>
                  <Link
                    to="/birthday-packages?tab=gift"
                    className="block px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 hover:text-primary-600"
                  >
                    <Gift className="h-4 w-4 inline-block mr-2" />
                    Gift Packages
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link
                    to="/bulk-orders"
                    className="block px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 hover:text-primary-600"
                  >
                    <Package className="h-4 w-4 inline-block mr-2" />
                    Bulk Orders
                  </Link>
                </div>
              </div>
            )}

            {/* Standard Dropdown for other menu items */}
            {item.subCategories && item.name !== 'Shop' && activeCategory === item.name && (
              <div 
                className="absolute left-0 z-50 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="py-2">
                  {item.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.name}
                      to={`${item.path}/${subCategory.slug}`}
                      className="block px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
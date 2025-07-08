import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, X, Phone, Cake, Gift, Package, Building } from 'lucide-react';
import { useMenuStore } from '../../store/menuStore';
import { menuData } from '../../data/menuData';

const MobileMenu: React.FC = () => {
  const { isOpen, closeMenu } = useMenuStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary-600 text-white">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Phone Number */}
        <div className="p-4 border-b border-neutral-100 flex items-center">
          <a href="tel:+15551234567" className="flex items-center text-primary-600 font-medium">
            <Phone className="h-5 w-5 mr-2" />
            (555) 123-4567
          </a>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto flex-1">
          <ul className="py-2">
            {updatedMenuData.map((item) => (
              <li key={item.name} className="border-b border-neutral-100">
                {item.subCategories ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full p-4 text-left hover:bg-neutral-50 transition-colors"
                      onClick={() => toggleCategory(item.name)}
                    >
                      <span className="font-medium text-neutral-900">{item.name}</span>
                      {expandedCategories.includes(item.name) ? (
                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-neutral-500" />
                      )}
                    </button>

                    {expandedCategories.includes(item.name) && (
                      <div className="bg-neutral-50">
                        {/* Shop by Type for Shop menu */}
                        {item.name === 'Shop' && (
                          <div className="px-4 py-2 border-b border-neutral-200">
                            <h4 className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-2">
                              Shop by Type
                            </h4>
                            <div className="space-y-1">
                              {['Sativa', 'Indica', 'Hybrid', 'Mixed'].map((type) => (
                                <Link
                                  key={type}
                                  to={`/shop/${type.toLowerCase()}`}
                                  className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                                  onClick={closeMenu}
                                >
                                  {type}
                                </Link>
                              ))}
                              <Link
                                to="/shop/pre-order"
                                className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                                onClick={closeMenu}
                              >
                                Pre-Order
                              </Link>
                            </div>
                          </div>
                        )}
                        
                        {/* Regular subcategories */}
                        <div className="px-4 py-2">
                          {item.name === 'Shop' && (
                            <h4 className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-2">
                              Categories
                            </h4>
                          )}
                          <div className="space-y-1">
                            {item.subCategories.map((subCategory) => (
                              <Link
                                key={subCategory.name}
                                to={`${item.path}/${subCategory.slug}`}
                                className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                                onClick={closeMenu}
                              >
                                {subCategory.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block p-4 font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            
            {/* Birthday Packages Submenu */}
            <li className="border-b border-neutral-100">
              <button
                className="flex items-center justify-between w-full p-4 text-left hover:bg-neutral-50 transition-colors"
                onClick={() => toggleCategory('Birthday Packages Submenu')}
              >
                <div className="flex items-center">
                  <Cake className="h-5 w-5 mr-2 text-primary-600" />
                  <span className="font-medium text-neutral-900">Party Packages</span>
                </div>
                {expandedCategories.includes('Birthday Packages Submenu') ? (
                  <ChevronDown className="h-5 w-5 text-neutral-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-neutral-500" />
                )}
              </button>

              {expandedCategories.includes('Birthday Packages Submenu') && (
                <div className="bg-neutral-50 px-4 py-2">
                  <div className="space-y-1">
                    <Link
                      to="/birthday-packages"
                      className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                      onClick={closeMenu}
                    >
                      <Cake className="h-4 w-4 inline-block mr-2" />
                      Birthday Packages
                    </Link>
                    <Link
                      to="/birthday-packages?tab=corporate"
                      className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                      onClick={closeMenu}
                    >
                      <Building className="h-4 w-4 inline-block mr-2" />
                      Corporate Events
                    </Link>
                    <Link
                      to="/birthday-packages?tab=gift"
                      className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                      onClick={closeMenu}
                    >
                      <Gift className="h-4 w-4 inline-block mr-2" />
                      Gift Packages
                    </Link>
                    <Link
                      to="/bulk-orders"
                      className="block py-2 px-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white rounded transition-colors"
                      onClick={closeMenu}
                    >
                      <Package className="h-4 w-4 inline-block mr-2" />
                      Bulk Orders
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-neutral-50">
          <Link 
            to="/account" 
            className="block w-full py-3 px-4 text-center rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            onClick={closeMenu}
          >
            Sign In / Register
          </Link>
          <div className="mt-3 text-center">
            <p className="text-xs text-neutral-500">
              Must be 21+ with valid ID
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
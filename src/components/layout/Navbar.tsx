import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Phone } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useMenuStore } from '../../store/menuStore';
import NavMenu from './NavMenu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { items } = useCartStore();
  const { isOpen, toggleMenu } = useMenuStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    setSearchOpen(false);
    setSearchTerm('');
  };

  const cartItemCount = items.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src="/Add a subheading.png" 
                alt="JFK Cannabis - Premium Cannabis Dispensary Queens NY" 
                className="h-12 w-auto md:h-16 lg:h-20"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block flex-1 mx-8">
              <NavMenu />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Phone Number */}
              <a 
                href="tel:+15551234567" 
                className="hidden md:flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                aria-label="Call us at (555) 123-4567"
              >
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">(555) 123-4567</span>
              </a>

              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors touch-target"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Account Button */}
              <Link 
                to="/account" 
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors touch-target"
                aria-label="My Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors relative touch-target"
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors lg:hidden touch-target"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-40">
            <div className="container-custom py-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center border-2 border-primary-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cannabis products, brands, effects..."
                    className="flex-1 p-3 outline-none text-base"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-primary-600 text-white p-3 hover:bg-primary-700 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navbar;
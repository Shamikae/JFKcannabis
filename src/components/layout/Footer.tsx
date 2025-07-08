import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter, MapPin, Phone, Clock, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">JFK Cannabis</span>
            </Link>
            <p className="text-sm mb-4">
              Premium cannabis dispensary located across from JFK Airport, offering quality products and exceptional service to the Queens community.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/flowers" className="hover:text-white transition-colors">Flowers</Link>
              </li>
              <li>
                <Link to="/shop/pre-rolls" className="hover:text-white transition-colors">Pre-Rolls</Link>
              </li>
              <li>
                <Link to="/shop/edibles" className="hover:text-white transition-colors">Edibles</Link>
              </li>
              <li>
                <Link to="/shop/vapes" className="hover:text-white transition-colors">Vapes</Link>
              </li>
              <li>
                <Link to="/shop/concentrates" className="hover:text-white transition-colors">Concentrates</Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/shop/pre-order" className="hover:text-white transition-colors">Pre-Order</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-white transition-colors">Rewards Program</Link>
              </li>
              <li>
                <Link to="/cafe" className="hover:text-white transition-colors">Cannabis Cafe</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-2 text-primary-500" />
                <a 
                  href="https://maps.google.com/?q=175-01+Rockaway+Blvd,+Queens+NY+11434" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  175-01 Rockaway Blvd, Queens NY 11434
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-0.5 mr-2 text-primary-500" />
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-0.5 mr-2 text-primary-500" />
                <a 
                  href="mailto:info@jfkcannabis.com"
                  className="hover:text-white transition-colors"
                >
                  info@jfkcannabis.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mt-0.5 mr-2 text-primary-500" />
                <div>
                  <p>Mon-Sat: 9AM - 10PM</p>
                  <p>Sunday: 10AM - 8PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} JFK Cannabis. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-neutral-500">
            <p>
              Must be 21+ years of age with valid ID to purchase cannabis products. Keep out of reach of children. For adult use only.
              Cannabis can impair concentration, coordination, and judgment. Do not operate a vehicle or machinery under the influence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
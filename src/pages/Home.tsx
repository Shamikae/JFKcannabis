import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Truck, Package, Star, TrendingUp, Play, Zap, Award, Shield, Brain } from 'lucide-react';
import { getFeaturedProducts } from '../data/productData';
import ProductCard from '../components/shop/ProductCard';
import AskAI from '../components/AskAI';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts(8);
  const [showAskAI, setShowAskAI] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/7667641/pexels-photo-7667641.jpeg" 
            alt="JFK Cannabis dispensary" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-5">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-primary-500 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-16 h-16 bg-secondary-500 rounded-full opacity-20"
            animate={{
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent-500 rounded-full opacity-15"
            animate={{
              x: [0, 30, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full container-custom flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Premium Cannabis <br />
              <span className="text-primary-400">Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Your gateway to the finest cannabis products in Queens, New York. Lab-tested quality, expert curation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="btn-primary px-8 py-3 text-lg flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/delivery" 
                className="btn-secondary px-8 py-3 text-lg flex items-center justify-center"
              >
                <Truck className="mr-2 h-5 w-5" />
                Delivery
              </Link>
              <button 
                onClick={() => setShowAskAI(true)}
                className="btn-outline border-white text-white hover:bg-white hover:bg-opacity-20 px-8 py-3 text-lg flex items-center justify-center"
              >
                <Brain className="mr-2 h-5 w-5" />
                Ask AI
              </button>
            </div>
            <div className="mt-8 flex items-center text-primary-300">
              <MapPin className="h-5 w-5 mr-2" />
              <a 
                href="https://maps.google.com/?q=175-01+Rockaway+Blvd,+Queens+NY+11434" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                175-01 Rockaway Blvd, Queens NY 11434
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">500+</div>
              <div className="text-sm text-neutral-600">Premium Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">50+</div>
              <div className="text-sm text-neutral-600">Trusted Brands</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <Star className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">10K+</div>
              <div className="text-sm text-neutral-600">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">4.9★</div>
              <div className="text-sm text-neutral-600">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Age Verification Banner */}
      <div className="bg-neutral-900 text-white py-3 text-center text-sm">
        You must be 21+ with valid ID to purchase cannabis products. Consume responsibly.
      </div>

      {/* Featured Products Section - 2 Rows */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="section-heading">Featured Products</h2>
                <p className="subtitle">Discover our handpicked selection of premium cannabis products</p>
              </div>
              <Link to="/shop" className="btn-outline hidden md:flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
          
          {/* First Row - 4 Products */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Second Row - 4 Products */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {featuredProducts.slice(4, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="btn-primary inline-flex items-center">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Partnership Banner */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Premium Brand Partnerships</h3>
            <p className="text-xl opacity-90 mb-6">
              Featuring the finest cannabis brands in New York
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-80">
              <TrendingUp className="h-8 w-8" />
              <Star className="h-8 w-8" />
              <Package className="h-8 w-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading">Shop by Category</h2>
            <p className="subtitle">Browse our comprehensive selection of premium cannabis products</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Flower', image: 'https://images.pexels.com/photos/7667711/pexels-photo-7667711.jpeg', path: '/shop/flowers', description: 'Premium buds & ground flower' },
              { name: 'Pre-Rolls', image: 'https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg', path: '/shop/pre-rolls', description: 'Convenient ready-to-smoke' },
              { name: 'Edibles', image: 'https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg', path: '/shop/edibles', description: 'Gummies, chocolates & more' },
              { name: 'Vapes', image: 'https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg', path: '/shop/vapes', description: 'Cartridges & disposables' },
              { name: 'Concentrates', image: 'https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg', path: '/shop/concentrates', description: 'Rosin, resin & extracts' },
              { name: 'Beverages', image: 'https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg', path: '/shop/beverages', description: 'THC drinks & mixers' },
              { name: 'Topicals', image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg', path: '/shop/topicals', description: 'Balms, lotions & wellness' },
              { name: 'Pre-Order', image: 'https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg', path: '/shop/pre-order', description: 'Reserve before arrival' },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={category.path}
                  className="card group overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Box CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Package className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cannabis Subscription Boxes</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover new products every month with our curated subscription service. 
              Premium products, exclusive strains, and expert curation delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/subscription" 
                className="btn-primary bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 inline-flex items-center"
              >
                Explore Subscriptions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/subscription" 
                className="btn-outline border-white text-white hover:bg-white hover:bg-opacity-20 px-8 py-3 inline-flex items-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Ad Space */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-neutral-800 rounded-lg p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Brand Spotlight</h3>
              <p className="text-lg mb-6 opacity-90">
                Featured video content and brand partnerships
              </p>
              <div className="aspect-video bg-neutral-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20"></div>
                <div className="text-center relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <p className="text-neutral-400">Premium Brand Video Content</p>
                  <p className="text-sm text-neutral-500 mt-2">Advertise your brand here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cafe Section */}
      <section className="py-16 bg-cover bg-center text-white" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/6306157/pexels-photo-6306157.jpeg')` 
      }}>
        <div className="container-custom">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">JFK Cannabis Cafe</h2>
            <p className="text-lg mb-8">
              Enhance your favorite cafe treats with our premium cannabis products. 
              From THC-infused coffees to edible-enhanced desserts, create your perfect experience.
            </p>
            <Link 
              to="/cafe" 
              className="btn-primary bg-white text-primary-800 hover:bg-neutral-100 px-8 py-3 inline-flex items-center"
            >
              Visit Our Cafe <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading">Find Us</h2>
            <p className="subtitle">Conveniently located across from JFK Airport and the JFK DMV</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-16 aspect-h-9 h-[400px] bg-neutral-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2883510/pexels-photo-2883510.jpeg" 
                  alt="Map of JFK Cannabis location"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">JFK Cannabis Dispensary</h3>
              <p className="flex items-start mb-4">
                <MapPin className="h-5 w-5 mt-1 mr-2 text-primary-600" />
                <a 
                  href="https://maps.google.com/?q=175-01+Rockaway+Blvd,+Queens+NY+11434" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transition-colors"
                >
                  175-01 Rockaway Blvd, Queens NY 11434
                </a>
              </p>
              <p className="mb-4">
                We're conveniently located directly across from JFK Airport and the JFK DMV, 
                making us the perfect stop for travelers and locals alike.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-2">Hours:</h4>
                <p>Monday - Saturday: 9:00 AM - 10:00 PM</p>
                <p>Sunday: 10:00 AM - 8:00 PM</p>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://maps.google.com/?q=175-01+Rockaway+Blvd,+Queens+NY+11434" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary inline-flex items-center"
                >
                  Get Directions <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <Link 
                  to="/delivery" 
                  className="btn-outline inline-flex items-center"
                >
                  <Truck className="mr-2 h-5 w-5" />
                  Delivery
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ask AI Modal */}
      {showAskAI && <AskAI onClose={() => setShowAskAI(false)} />}
    </div>
  );
};

export default Home;
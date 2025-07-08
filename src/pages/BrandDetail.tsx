import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { brands } from '../data/brandData';
import { Product, products } from '../data/productData';
import ProductCard from '../components/shop/ProductCard';

const BrandDetail: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  
  // Find the brand
  const brand = brands.find(b => b.id === brandName);
  
  // For demo purposes, filter products by this brand
  // In a real application, this would come from an API
  const brandProducts = products.filter(p => p.brand === brand?.name);
  
  if (!brand) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Brand Not Found</h2>
        <p className="mb-6">The brand you're looking for doesn't exist or has been removed.</p>
        <Link to="/brands" className="btn-primary">
          View All Brands
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Brand Header */}
      <div className="bg-neutral-900 text-white">
        <div className="container-custom py-12">
          <Link to="/brands" className="flex items-center text-neutral-300 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Brands
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg w-40 h-40 mx-auto md:mx-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{brand.name}</h1>
              <p className="text-neutral-300 mb-4">{brand.description}</p>
              
              {brand.categories && (
                <div className="flex flex-wrap gap-2">
                  {brand.categories.map(category => (
                    <span
                      key={category}
                      className="text-xs px-3 py-1 bg-neutral-800 rounded-full"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-6">Products by {brand.name}</h2>
        
        {brandProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {brandProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-600">
              Check back soon for products from this brand.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetail;
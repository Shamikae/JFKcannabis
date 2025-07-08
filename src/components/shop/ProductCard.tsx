import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star, Beaker, Award, Leaf } from 'lucide-react';
import { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { trackEvent } from '../../services/googleAnalytics';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
  hideBrand?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showQuickView = true, 
  hideBrand = false 
}) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      ...product,
      cartQuantity: 1
    });
  };
  
  const handleProductClick = () => {
    // Track product click in Google Analytics
    trackEvent('Ecommerce', 'Product Click', product.name);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getDisplayPrice = () => {
    if (product.salePrice && product.salePrice < product.price) {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.salePrice)}
          </span>
          <span className="text-sm text-neutral-500 line-through">
            {formatPrice(product.price)}
          </span>
        </div>
      );
    }
    return (
      <span className="text-lg font-bold text-neutral-900">
        {formatPrice(product.price)}
      </span>
    );
  };

  const getBadges = () => {
    const badges = [];
    
    if (product.salePrice && product.salePrice < product.price) {
      const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
      badges.push(
        <span key="sale" className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {discount}% OFF
        </span>
      );
    }
    
    if (product.featured) {
      badges.push(
        <span key="featured" className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Featured
        </span>
      );
    }
    
    if (product.smallBatch) {
      badges.push(
        <span key="smallbatch" className="bg-accent-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Small Batch
        </span>
      );
    }

    if (product.indoor) {
      badges.push(
        <span key="indoor" className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Indoor
        </span>
      );
    }
    
    if (product.preOrder) {
      badges.push(
        <span key="preorder" className="bg-accent-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Pre-Order
        </span>
      );
    }
    
    if (!product.inStock) {
      badges.push(
        <span key="outofstock" className="bg-neutral-500 text-white text-xs font-semibold px-2 py-1 rounded">
          Out of Stock
        </span>
      );
    }
    
    return badges;
  };

  const getProductDetails = () => {
    const details = [];
    
    if (product.weight) details.push(product.weight);
    if (product.size) details.push(product.size);
    if (product.packSize && product.packSize > 1) details.push(`${product.packSize} pack`);
    
    return details.join(' • ');
  };

  const getPotencyInfo = () => {
    if (product.category === 'flower' || product.category === 'vapes' || product.category === 'concentrates') {
      return `${product.thcContent}% THC`;
    } else if (product.category === 'edibles' || product.category === 'beverages' || product.category === 'tinctures') {
      return `${product.thcContent}mg THC`;
    }
    return null;
  };

  const getStrainTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'sativa': 'bg-green-100 text-green-800',
      'indica': 'bg-purple-100 text-purple-800',
      'hybrid': 'bg-orange-100 text-orange-800',
      'mixed': 'bg-blue-100 text-blue-800'
    };
    return colorMap[type] || 'bg-neutral-100 text-neutral-800';
  };

  return (
    <div className="mobile-card group transition-all hover:shadow-lg relative" onClick={handleProductClick}>
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {getBadges()}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {showQuickView && (
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors touch-target"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-neutral-600" />
            </button>
          )}
        </div>

        {/* Lab Report Indicator */}
        {product.hasLabReport && (
          <div className="absolute bottom-2 left-2">
            <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
              <Beaker className="h-3 w-3 text-primary-600 mr-1" />
              <span className="text-xs font-medium text-primary-600">Lab Tested</span>
            </div>
          </div>
        )}

        {/* Strain Type Badge for Flowers */}
        {product.category === 'flower' && product.strainType && (
          <div className="absolute bottom-2 right-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStrainTypeColor(product.strainType)}`}>
              {product.strainType.charAt(0).toUpperCase() + product.strainType.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-start mb-2">
          {!hideBrand && product.category !== 'flower' && (
            <Link to={`/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}`}>
              <p className="text-sm font-medium text-primary-600 hover:underline line-clamp-1">
                {product.brand}
              </p>
            </Link>
          )}
          {product.rating > 0 && (
            <div className="flex items-center flex-shrink-0">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-neutral-600 ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-base md:text-lg mb-1 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Product Details */}
        <div className="text-sm text-neutral-500 mb-2 line-clamp-1">
          {getProductDetails()}
        </div>

        {/* Potency Info */}
        {getPotencyInfo() && (
          <div className="text-sm font-medium text-secondary-600 mb-2">
            {getPotencyInfo()}
          </div>
        )}

        {/* Infusion Info for Pre-rolls */}
        {product.category === 'pre-rolls' && product.infusionMaterial && (
          <div className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full inline-block mb-2">
            Infused with {product.infusionMaterial}
          </div>
        )}

        {/* Effects */}
        {product.effects.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.effects.slice(0, 2).map(effect => (
              <span
                key={effect}
                className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
              >
                {effect}
              </span>
            ))}
            {product.effects.length > 2 && (
              <span className="text-xs text-neutral-500">
                +{product.effects.length - 2} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex-1 mr-2">
            {getDisplayPrice()}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`rounded-full p-2 transition-colors touch-target flex-shrink-0 ${
              product.inStock
                ? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
            aria-label={product.inStock ? 'Add to cart' : 'Out of stock'}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Stock Status */}
        {product.inStock && product.stockQuantity <= 10 && (
          <div className="mt-2 text-xs text-orange-600">
            Only {product.stockQuantity} left in stock
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
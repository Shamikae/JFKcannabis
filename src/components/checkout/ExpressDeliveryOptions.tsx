import React from 'react';
import { Truck, Clock, MapPin, ShoppingCart } from 'lucide-react';

interface ExpressProduct {
  id: string;
  name: string;
  price: number;
  eta: string;
  distance: number;
  image?: string;
}

interface ExpressDeliveryOptionsProps {
  products: ExpressProduct[];
  onSelectProduct: (productId: string) => void;
  selectedProducts: string[];
}

const ExpressDeliveryOptions: React.FC<ExpressDeliveryOptionsProps> = ({ 
  products, 
  onSelectProduct,
  selectedProducts
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="bg-amber-100 p-2 rounded-full mr-3">
          <Truck className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Express Delivery</h3>
          <p className="text-neutral-600 text-sm">Get your cannabis in as little as 15-30 minutes</p>
        </div>
      </div>
      
      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-neutral-700">
          Express delivery is available for select products that are already in our delivery vehicles near your location. These products can be delivered much faster than standard orders.
        </p>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Express Products Near You</h4>
        
        {products.length > 0 ? (
          <div className="space-y-3">
            {products.map(product => (
              <div 
                key={product.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedProducts.includes(product.id)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
                onClick={() => onSelectProduct(product.id)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neutral-200 rounded-md mr-3 flex-shrink-0">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium">{product.name}</h5>
                    <div className="flex items-center text-xs text-neutral-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{product.distance} miles away</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${product.price.toFixed(2)}</div>
                  <div className="flex items-center text-xs text-neutral-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{product.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Truck className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
            <h5 className="font-medium mb-1">No express products available</h5>
            <p className="text-sm text-neutral-500">
              There are currently no express products near your location
            </p>
          </div>
        )}
        
        {selectedProducts.length > 0 && (
          <div className="mt-6">
            <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add Selected to Cart
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-xs text-neutral-500 border-t border-neutral-200 pt-4">
        <p>Express delivery has a $10 fee and is subject to product and driver availability in your area.</p>
      </div>
    </div>
  );
};

export default ExpressDeliveryOptions;
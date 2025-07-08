import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  
  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="mb-6 text-neutral-600">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center">
            Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className={`p-4 ${index < items.length - 1 ? 'border-b border-neutral-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <Link 
                        to={`/product/${item.id}`}
                        className="font-medium hover:text-primary-600"
                      >
                        {item.name}
                      </Link>
                      
                      <div className="text-sm text-neutral-500 mt-1">
                        {item.weight && `${item.weight} • `}
                        {item.thc && `${item.thc}% THC`}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-x border-neutral-200 py-1"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-500 hover:text-neutral-700"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-neutral-500">${item.price.toFixed(2)} each</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxes</span>
                  <span className="font-medium">${(total() * 0.085).toFixed(2)}</span>
                </div>
                {total() < 60 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Delivery Fee</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-neutral-200 pt-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${(total() + (total() * 0.085) + (total() < 60 ? 5 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <div className="mt-4">
                <Link
                  to="/shop"
                  className="text-primary-600 text-center block hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
              
              {total() < 60 && (
                <div className="mt-6 p-3 bg-primary-50 text-primary-800 rounded-md text-sm">
                  Add ${(60 - total()).toFixed(2)} more to qualify for free delivery!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
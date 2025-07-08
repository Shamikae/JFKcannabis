import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';
import { calculateTax, calculateDeliveryFee } from '../data/productData';
import { trackAddToCart, trackRemoveFromCart, trackBeginCheckout } from '../services/googleAnalytics';

export interface CartItem extends Product {
  cartQuantity: number;
  selectedWeight?: string;
  selectedSize?: string;
  addedAt: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, options?: { weight?: string; size?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: (state?: string) => number;
  getDeliveryFee: (distance?: number) => number;
  getTotal: (state?: string, distance?: number) => number;
  getItemCount: () => number;
  abandonedAt?: string;
  setAbandoned: () => void;
  clearAbandoned: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, options = {}) => {
        // Track in Google Analytics
        trackAddToCart(product);
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(item => 
            item.id === product.id && 
            item.selectedWeight === options.weight &&
            item.selectedSize === options.size
          );
          
          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              cartQuantity: updatedItems[existingItemIndex].cartQuantity + 1
            };
            return { items: updatedItems, abandonedAt: undefined };
          }
          
          const newItem: CartItem = {
            ...product,
            cartQuantity: 1,
            selectedWeight: options.weight,
            selectedSize: options.size,
            addedAt: new Date().toISOString()
          };
          
          return { 
            items: [...state.items, newItem],
            abandonedAt: undefined
          };
        });
      },
      
      removeItem: (id) => {
        const itemToRemove = get().items.find(item => item.id === id);
        if (itemToRemove) {
          // Track in Google Analytics
          trackRemoveFromCart(itemToRemove);
        }
        
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === id 
            ? { ...item, cartQuantity: Math.max(1, quantity) }
            : item
        )
      })),
      
      clearCart: () => set({ items: [], abandonedAt: undefined }),
      
      getSubtotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const price = item.salePrice || item.price;
          return total + (price * item.cartQuantity);
        }, 0);
      },
      
      getTax: (state = 'NY') => {
        const subtotal = get().getSubtotal();
        return calculateTax(subtotal, state);
      },
      
      getDeliveryFee: (distance = 5) => {
        const subtotal = get().getSubtotal();
        return calculateDeliveryFee(subtotal, distance);
      },
      
      getTotal: (state = 'NY', distance = 5) => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax(state);
        const deliveryFee = get().getDeliveryFee(distance);
        return subtotal + tax + deliveryFee;
      },
      
      getItemCount: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.cartQuantity, 0);
      },
      
      setAbandoned: () => set({ abandonedAt: new Date().toISOString() }),
      
      clearAbandoned: () => set({ abandonedAt: undefined })
    }),
    {
      name: 'jfk-cannabis-cart',
      partialize: (state) => ({ 
        items: state.items,
        abandonedAt: state.abandonedAt
      })
    }
  )
);

// Cart abandonment tracking
let abandonmentTimer: NodeJS.Timeout;

export const trackCartAbandonment = () => {
  const { items, setAbandoned } = useCartStore.getState();
  
  if (items.length > 0) {
    clearTimeout(abandonmentTimer);
    abandonmentTimer = setTimeout(() => {
      setAbandoned();
    }, 30 * 60 * 1000); // 30 minutes
  }
};

// Auto-save cart items for recovery
export const saveCartForRecovery = () => {
  const { items } = useCartStore.getState();
  if (items.length > 0) {
    localStorage.setItem('jfk-cannabis-cart-backup', JSON.stringify({
      items,
      timestamp: new Date().toISOString()
    }));
  }
};

// Track checkout
export const trackCheckoutStart = () => {
  const { items, getSubtotal } = useCartStore.getState();
  
  trackBeginCheckout({
    items,
    subtotal: getSubtotal()
  });
};
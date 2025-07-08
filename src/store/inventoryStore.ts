import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';
import { InventoryItem, mockAlleavesApi } from '../services/alleaves';

interface InventoryState {
  items: InventoryItem[];
  manualItems: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  lastSynced: string | null;
  
  // Actions
  fetchInventory: () => Promise<void>;
  addManualItem: (item: Omit<InventoryItem, 'id' | 'source'>) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  syncWithAlleaves: () => Promise<void>;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      manualItems: [],
      isLoading: false,
      error: null,
      lastSynced: null,
      
      fetchInventory: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would call the actual Alleaves API
          const alleaveItems = await mockAlleavesApi.getInventory();
          
          set(state => ({
            items: [...alleaveItems, ...state.manualItems],
            isLoading: false,
            lastSynced: new Date().toISOString()
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch inventory',
            isLoading: false
          });
        }
      },
      
      addManualItem: async (item) => {
        set({ isLoading: true, error: null });
        
        try {
          // Generate a unique ID for the manual item
          const newItem: InventoryItem = {
            id: `manual-${Date.now()}`,
            ...item,
            source: 'manual'
          };
          
          set(state => ({
            manualItems: [...state.manualItems, newItem],
            items: [...state.items, newItem],
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add inventory item',
            isLoading: false
          });
        }
      },
      
      updateItem: async (id: string, quantity: number) => {
        set({ isLoading: true, error: null });
        
        try {
          // Check if it's a manual item or Alleaves item
          const isManualItem = id.startsWith('manual-');
          
          if (isManualItem) {
            // Update manual item locally
            set(state => ({
              manualItems: state.manualItems.map(item => 
                item.id === id ? { ...item, quantity } : item
              ),
              items: state.items.map(item => 
                item.id === id ? { ...item, quantity } : item
              ),
              isLoading: false
            }));
          } else {
            // In a real app, this would call the Alleaves API to update
            // For now, just update locally
            set(state => ({
              items: state.items.map(item => 
                item.id === id ? { ...item, quantity } : item
              ),
              isLoading: false
            }));
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update inventory item',
            isLoading: false
          });
        }
      },
      
      removeItem: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Check if it's a manual item
          const isManualItem = id.startsWith('manual-');
          
          if (isManualItem) {
            // Remove manual item
            set(state => ({
              manualItems: state.manualItems.filter(item => item.id !== id),
              items: state.items.filter(item => item.id !== id),
              isLoading: false
            }));
          } else {
            // For Alleaves items, we don't actually delete them, just set quantity to 0
            set(state => ({
              items: state.items.map(item => 
                item.id === id ? { ...item, quantity: 0 } : item
              ),
              isLoading: false
            }));
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove inventory item',
            isLoading: false
          });
        }
      },
      
      syncWithAlleaves: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would call the actual Alleaves API
          const result = await mockAlleavesApi.syncInventory();
          const alleaveItems = await mockAlleavesApi.getInventory();
          
          set(state => ({
            items: [...alleaveItems, ...state.manualItems],
            isLoading: false,
            lastSynced: new Date().toISOString()
          }));
          
          return result;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sync with Alleaves',
            isLoading: false
          });
          throw error;
        }
      }
    }),
    {
      name: 'jfk-cannabis-inventory',
      partialize: (state) => ({ 
        manualItems: state.manualItems,
        lastSynced: state.lastSynced
      })
    }
  )
);
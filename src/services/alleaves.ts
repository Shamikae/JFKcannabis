import axios from 'axios';

// Base URL for Alleaves API
const ALLEAVES_API_URL = import.meta.env.VITE_ALLEAVES_API_URL || 'https://api.alleaves.com/v1';
const ALLEAVES_API_KEY = import.meta.env.VITE_ALLEAVES_API_KEY || '';

// Create axios instance with default config
const alleaves = axios.create({
  baseURL: ALLEAVES_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ALLEAVES_API_KEY}`
  }
});

// Interface for Alleaves product
export interface AlleavesPosProduct {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  cost: number;
  quantity: number;
  thcContent: number;
  cbdContent: number;
  weight: string;
  strain: string;
  strainType: string;
  images: string[];
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Interface for inventory item
export interface InventoryItem {
  id: string;
  productId: string;
  quantity: number;
  location: string;
  batchNumber: string;
  expirationDate: string;
  receivedDate: string;
  source: 'alleaves' | 'manual';
}

// Get all products from Alleaves
export const getAlleavesProducts = async (): Promise<AlleavesPosProduct[]> => {
  try {
    const response = await alleaves.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching Alleaves products:', error);
    throw error;
  }
};

// Get a single product from Alleaves
export const getAlleavesProduct = async (id: string): Promise<AlleavesPosProduct> => {
  try {
    const response = await alleaves.get(`/products/${id}`);
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching Alleaves product ${id}:`, error);
    throw error;
  }
};

// Get inventory from Alleaves
export const getAlleavesInventory = async (): Promise<InventoryItem[]> => {
  try {
    const response = await alleaves.get('/inventory');
    
    // Transform to our inventory format
    return response.data.inventory.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      quantity: item.quantity,
      location: item.location || 'Main Store',
      batchNumber: item.batch_number || '',
      expirationDate: item.expiration_date || '',
      receivedDate: item.received_date || new Date().toISOString(),
      source: 'alleaves'
    }));
  } catch (error) {
    console.error('Error fetching Alleaves inventory:', error);
    throw error;
  }
};

// Update inventory in Alleaves
export const updateAlleavesInventory = async (inventoryId: string, quantity: number): Promise<InventoryItem> => {
  try {
    const response = await alleaves.put(`/inventory/${inventoryId}`, {
      quantity
    });
    return response.data.inventory;
  } catch (error) {
    console.error(`Error updating Alleaves inventory ${inventoryId}:`, error);
    throw error;
  }
};

// Sync local inventory with Alleaves
export const syncWithAlleaves = async (): Promise<{
  added: number;
  updated: number;
  removed: number;
}> => {
  try {
    const response = await alleaves.post('/sync');
    return response.data;
  } catch (error) {
    console.error('Error syncing with Alleaves:', error);
    throw error;
  }
};

// Mock function to simulate Alleaves API for development
export const mockAlleavesApi = {
  getProducts: (): Promise<AlleavesPosProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'al-001',
            name: 'Blue Dream',
            sku: 'BD-3.5G',
            barcode: '123456789012',
            brand: 'Coastal Cannabis',
            category: 'flower',
            subcategory: 'buds',
            description: 'A sativa-dominant hybrid offering perfect balance of full-body relaxation with gentle cerebral invigoration.',
            price: 55.00,
            cost: 35.00,
            quantity: 150,
            thcContent: 24.5,
            cbdContent: 0.8,
            weight: '3.5g',
            strain: 'Blue Dream',
            strainType: 'hybrid',
            images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
            attributes: {
              growingProcess: 'indoor',
              form: 'buds',
              smallBatch: true,
              indoor: true
            },
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-12-15T00:00:00Z',
            isActive: true
          },
          {
            id: 'al-002',
            name: 'OG Kush Ground',
            sku: 'OGK-3.5G',
            barcode: '123456789013',
            brand: 'Emerald Farms',
            category: 'flower',
            subcategory: 'ground',
            description: 'Premium ground OG Kush infused with high-quality kief for enhanced potency.',
            price: 35.00,
            cost: 20.00,
            quantity: 200,
            thcContent: 22.3,
            cbdContent: 0.5,
            weight: '3.5g',
            strain: 'OG Kush',
            strainType: 'indica',
            images: ['https://images.pexels.com/photos/7667669/pexels-photo-7667669.jpeg'],
            attributes: {
              growingProcess: 'indoor',
              form: 'ground',
              indoor: true,
              infusionMaterial: 'kief'
            },
            createdAt: '2024-01-20T00:00:00Z',
            updatedAt: '2024-12-15T00:00:00Z',
            isActive: true
          },
          {
            id: 'al-003',
            name: 'Gelato Infused Pre-Roll 5-Pack',
            sku: 'GIP-5PK',
            barcode: '123456789014',
            brand: 'Cloud Nine',
            category: 'pre-rolls',
            subcategory: 'infused',
            description: 'Premium Gelato flower infused with liquid diamonds and rolled in kief.',
            price: 65.00,
            cost: 40.00,
            quantity: 85,
            thcContent: 32.0,
            cbdContent: 0.0,
            weight: '5g',
            strain: 'Gelato',
            strainType: 'hybrid',
            images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
            attributes: {
              infusionType: 'infused',
              infusionMaterial: 'liquid diamond',
              tipMaterial: 'ceramic',
              packSize: 5
            },
            createdAt: '2024-02-01T00:00:00Z',
            updatedAt: '2024-12-15T00:00:00Z',
            isActive: true
          }
        ]);
      }, 500);
    });
  },
  
  getInventory: (): Promise<InventoryItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'inv-001',
            productId: 'al-001',
            quantity: 150,
            location: 'Main Store',
            batchNumber: 'BD240315',
            expirationDate: '2025-06-15',
            receivedDate: '2024-12-15',
            source: 'alleaves'
          },
          {
            id: 'inv-002',
            productId: 'al-002',
            quantity: 200,
            location: 'Main Store',
            batchNumber: 'OGK240315',
            expirationDate: '2025-06-15',
            receivedDate: '2024-12-15',
            source: 'alleaves'
          },
          {
            id: 'inv-003',
            productId: 'al-003',
            quantity: 85,
            location: 'Main Store',
            batchNumber: 'GIP240315',
            expirationDate: '2025-06-15',
            receivedDate: '2024-12-15',
            source: 'alleaves'
          }
        ]);
      }, 500);
    });
  },
  
  syncInventory: (): Promise<{added: number; updated: number; removed: number}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          added: 3,
          updated: 5,
          removed: 0
        });
      }, 1000);
    });
  }
};

export default alleaves;
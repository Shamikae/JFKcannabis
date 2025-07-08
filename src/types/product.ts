export interface LabReport {
  id: string;
  productId: string;
  cannabinoids: {
    THC: number;
    CBD: number;
    CBG?: number;
    CBN?: number;
    CBC?: number;
    THCV?: number;
    CBDA?: number;
    THCA?: number;
    [key: string]: number | undefined;
  };
  terpenes: {
    [key: string]: number;
  };
  contaminants: {
    pesticides: boolean;
    heavyMetals: boolean;
    residualSolvents: boolean;
    microbials: boolean;
    moisture: number;
  };
  testDate: string;
  labName: string;
  batchNumber: string;
  reportUrl: string;
  imageUrl?: string;
}

export interface TerpeneProfile {
  name: string;
  percentage: number;
  aroma: string;
  effects: string[];
  alsoFoundIn: string[];
}

export interface NutritionalFacts {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  totalFat: number;
  sodium: number;
  totalCarbs: number;
  sugars: number;
  protein: number;
}

export interface AllergenInfo {
  contains: string[];
  mayContain: string[];
  glutenFree: boolean;
  vegan: boolean;
  organic: boolean;
}

export interface UsageInstructions {
  storage: string[];
  dosage: string[];
  onset: string;
  duration: string;
  tips: string[];
  recipes?: {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    videoUrl?: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'flower' | 'topicals' | 'beverages' | 'pre-rolls' | 'edibles' | 'vapes' | 'tinctures' | 'concentrates';
  subcategory: string;
  
  // Pricing & Inventory
  price: number;
  salePrice?: number;
  wholesalePrice?: number;
  inStock: boolean;
  stockQuantity: number;
  preOrder?: boolean;
  
  // Physical Properties
  weight?: string;
  size?: string;
  packSize?: number;
  thcContent: number; // in mg for edibles/beverages, % for flower
  cbdContent?: number;
  
  // Flower Specific
  strainType?: 'sativa' | 'indica' | 'hybrid' | 'mixed';
  growingProcess?: 'indoor' | 'greenhouse' | 'sun-grown';
  form?: 'ground' | 'buds';
  smallBatch?: boolean;
  indoor?: boolean;
  
  // Pre-roll Specific
  infusionType?: 'infused' | 'non-infused';
  infusionMaterial?: string; // liquid diamond, kief, etc.
  tipMaterial?: 'ceramic' | 'wood' | 'paper' | 'glass';
  
  // Vape Specific
  hardware?: 'disposable' | '510-cart' | 'pod';
  concentrationType?: string;
  extractionMethod?: string;
  flavorProfile?: string[];
  
  // Topical Specific
  topicalCategory?: 'skincare' | 'haircare' | 'fragrances' | 'body-care' | 'wellness';
  topicalSubcategory?: string;
  
  // Beverage/Edible Specific
  flavors?: string[];
  ingredients?: string[];
  nutritionalFacts?: NutritionalFacts;
  allergenInfo?: AllergenInfo;
  
  // Terpene Profile
  terpeneProfile?: TerpeneProfile[];
  dominantTerpenes?: string[];
  
  // General
  description: string;
  effects: string[];
  images: string[];
  labReport?: LabReport;
  hasLabReport?: boolean;
  usageInstructions?: UsageInstructions;
  featured?: boolean;
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  
  // Analytics
  views: number;
  purchases: number;
  rating: number;
  reviewCount: number;
}

export interface FilterOptions {
  brands: string[];
  weights: string[];
  sizes: string[];
  packSizes: number[];
  thcRange: [number, number];
  cbdRange: [number, number];
  priceRange: [number, number];
  strainTypes: string[];
  growingProcess: string[];
  forms: string[];
  infusionTypes: string[];
  infusionMaterials: string[];
  tipMaterials: string[];
  hardware: string[];
  topicalCategories: string[];
  flavors: string[];
  effects: string[];
  compounds: string[]; // THC, CBD, CBG, etc.
  extractionMethods: string[];
  terpenes: string[]; // Terpene filtering
  terpeneProfiles: string[]; // Profile types (citrus, earthy, etc.)
  inStock: boolean;
  onSale: boolean;
  smallBatch: boolean;
  indoor: boolean;
}

export interface CartItem extends Product {
  cartQuantity: number;
  selectedWeight?: string;
  selectedSize?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  profilePicture?: string;
  addresses: Address[];
  rewardsPoints: number;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  preferences: {
    strainTypes: string[];
    effects: string[];
    brands: string[];
    terpenes: string[];
    potencyRange: [number, number];
    categories: string[];
  };
  favorites: string[]; // Product IDs
  purchaseHistory: Order[];
  exclusiveDeals: Deal[];
  scientificData: {
    effectsReported: { [productId: string]: string[] };
    questionnaires: Questionnaire[];
    consumptionPatterns: ConsumptionPattern[];
  };
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  productIds: string[];
  validUntil: string;
  membershipTierRequired?: string;
}

export interface Questionnaire {
  id: string;
  productId: string;
  responses: {
    effects: string[];
    onset: string;
    duration: string;
    intensity: number; // 1-10
    satisfaction: number; // 1-10
    sideEffects?: string[];
    consumptionMethod: string;
    dosage: string;
    timeOfDay: string;
    setting: string;
  };
  submittedAt: string;
}

export interface ConsumptionPattern {
  productId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'night';
  preferredSetting: 'home' | 'social' | 'outdoor' | 'work';
  dosage: string;
  effects: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  deliveryAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  apartment?: string;
  instructions?: string;
}

export interface CafeItem {
  id: string;
  name: string;
  category: 'beverages' | 'ice-cream' | 'pastries';
  price: number;
  description: string;
  image: string;
  compatibleAddOns: string[]; // 'dissolvables', 'tinctures', 'chocolates', 'edibles'
}

export interface THCAddOn {
  id: string;
  name: string;
  type: 'dissolvable' | 'tincture' | 'chocolate' | 'caramel' | 'honey' | 'edible' | 'mix';
  thcContent: number;
  price: number;
  compatibleWith: string[]; // cafe item categories
  pickupRequired: boolean;
}
import { Product, LabReport } from '../types/product';

// Sample lab reports with comprehensive data
const sampleLabReports: LabReport[] = [
  {
    id: 'lab-001',
    productId: 'f1',
    cannabinoids: {
      THC: 24.5,
      CBD: 0.8,
      CBG: 1.2,
      CBN: 0.3,
      CBC: 0.5,
      THCA: 26.8,
      CBDA: 0.9,
      THCV: 0.2
    },
    terpenes: {
      'Myrcene': 0.8,
      'Limonene': 0.6,
      'Pinene': 0.4,
      'Linalool': 0.3,
      'Caryophyllene': 0.5,
      'Humulene': 0.2,
      'Terpinolene': 0.1
    },
    contaminants: {
      pesticides: false,
      heavyMetals: false,
      residualSolvents: false,
      microbials: false,
      moisture: 8.2
    },
    testDate: '2024-12-15',
    labName: 'CannaSafe Analytics',
    batchNumber: 'BD240315',
    reportUrl: '/lab-reports/lab-001.pdf',
    imageUrl: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'
  },
  {
    id: 'lab-002',
    productId: 'pr1',
    cannabinoids: {
      THC: 32.0,
      CBD: 0.5,
      CBG: 0.8,
      CBN: 0.4,
      CBC: 0.3
    },
    terpenes: {
      'Myrcene': 1.2,
      'Limonene': 0.8,
      'Caryophyllene': 0.6
    },
    contaminants: {
      pesticides: false,
      heavyMetals: false,
      residualSolvents: false,
      microbials: false,
      moisture: 7.8
    },
    testDate: '2024-12-10',
    labName: 'Green Scientific Labs',
    batchNumber: 'PR240310',
    reportUrl: '/lab-reports/lab-002.pdf'
  }
];

export const products: Product[] = [
  // FLOWER PRODUCTS
  {
    id: 'f1',
    name: 'Blue Dream',
    brand: 'Coastal Cannabis',
    category: 'flower',
    subcategory: 'buds',
    price: 55.00,
    salePrice: 45.00,
    wholesalePrice: 35.00,
    inStock: true,
    stockQuantity: 150,
    weight: '3.5g',
    thcContent: 24.5,
    cbdContent: 0.8,
    strainType: 'hybrid',
    growingProcess: 'indoor',
    form: 'buds',
    smallBatch: true,
    indoor: true,
    description: 'A sativa-dominant hybrid offering perfect balance of full-body relaxation with gentle cerebral invigoration. Blue Dream delivers sweet berry aroma with smooth, flavorful smoke.',
    effects: ['Relaxed', 'Happy', 'Creative', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
    labReport: sampleLabReports[0],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in cool, dry place', 'Keep away from direct sunlight', 'Use airtight container'],
      dosage: ['Start with small amount', 'Wait 15-30 minutes between doses'],
      onset: '5-15 minutes',
      duration: '2-4 hours',
      tips: ['Grind before use for best results', 'Use clean smoking apparatus']
    },
    featured: true,
    seoTitle: 'Blue Dream Cannabis Flower - Premium Indoor Grown | JFK Cannabis',
    seoDescription: 'Buy Blue Dream hybrid cannabis flower with 24.5% THC. Indoor grown, lab tested, premium quality. Fast delivery in Queens, NY.',
    keywords: ['blue dream', 'hybrid cannabis', 'indoor grown', 'premium flower'],
    views: 1250,
    purchases: 89,
    rating: 4.8,
    reviewCount: 156
  },
  
  {
    id: 'f2',
    name: 'OG Kush Ground',
    brand: 'Emerald Farms',
    category: 'flower',
    subcategory: 'ground',
    price: 35.00,
    inStock: true,
    stockQuantity: 200,
    weight: '3.5g',
    thcContent: 22.3,
    cbdContent: 0.5,
    strainType: 'indica',
    growingProcess: 'indoor',
    form: 'ground',
    indoor: true,
    infusionMaterial: 'kief',
    description: 'Premium ground OG Kush infused with high-quality kief for enhanced potency. Perfect for rolling or vaporizing.',
    effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667669/pexels-photo-7667669.jpeg'],
    hasLabReport: true,
    featured: true,
    views: 890,
    purchases: 67,
    rating: 4.7,
    reviewCount: 98
  },

  // PRE-ROLL PRODUCTS
  {
    id: 'pr1',
    name: 'Gelato Infused Pre-Roll 5-Pack',
    brand: 'Cloud Nine',
    category: 'pre-rolls',
    subcategory: 'infused',
    price: 65.00,
    inStock: true,
    stockQuantity: 85,
    weight: '5g',
    packSize: 5,
    thcContent: 32.0,
    strainType: 'hybrid',
    infusionType: 'infused',
    infusionMaterial: 'liquid diamond',
    tipMaterial: 'ceramic',
    description: 'Premium Gelato flower infused with liquid diamonds and rolled in kief. Each pre-roll delivers consistent potency and smooth burn.',
    effects: ['Relaxed', 'Euphoric', 'Creative'],
    images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
    labReport: sampleLabReports[1],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store upright in cool, dry place', 'Keep in original packaging'],
      dosage: ['Start with a few puffs', 'Wait 10-15 minutes between sessions'],
      onset: '5-10 minutes',
      duration: '2-3 hours',
      tips: ['Light evenly for best burn', 'Rotate while smoking']
    },
    featured: true,
    views: 1100,
    purchases: 95,
    rating: 4.9,
    reviewCount: 134
  },

  {
    id: 'pr2',
    name: 'Sativa Sunrise 12-Pack',
    brand: 'Harvest Moon',
    category: 'pre-rolls',
    subcategory: 'uninfused',
    price: 120.00,
    salePrice: 100.00,
    inStock: true,
    stockQuantity: 45,
    weight: '12g',
    packSize: 12,
    thcContent: 26.8,
    strainType: 'sativa',
    infusionType: 'non-infused',
    tipMaterial: 'wood',
    description: 'Pure sativa blend perfect for daytime use. 12 perfectly rolled joints with wooden tips for smooth smoking experience.',
    effects: ['Energetic', 'Creative', 'Focused', 'Uplifted'],
    images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
    hasLabReport: true,
    views: 756,
    purchases: 43,
    rating: 4.6,
    reviewCount: 67
  },

  // EDIBLE PRODUCTS
  {
    id: 'e1',
    name: 'Cosmic Gummies - Mixed Berry',
    brand: 'Galaxy Edibles',
    category: 'edibles',
    subcategory: 'gummies',
    price: 25.00,
    inStock: true,
    stockQuantity: 120,
    packSize: 10,
    thcContent: 100, // 10mg per gummy
    flavors: ['Mixed Berry', 'Strawberry', 'Blueberry', 'Raspberry'],
    description: 'Delicious fruit-flavored gummies with precise 10mg THC dosing. Made with all-natural ingredients and real fruit flavors.',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    ingredients: ['Organic Cane Sugar', 'Tapioca Syrup', 'Natural Fruit Flavors', 'Pectin', 'THC Distillate', 'Citric Acid'],
    allergenInfo: {
      contains: [],
      mayContain: ['Tree Nuts'],
      glutenFree: true,
      vegan: true,
      organic: true
    },
    usageInstructions: {
      storage: ['Store in cool, dry place', 'Keep sealed when not in use'],
      dosage: ['Start with 1 gummy (10mg)', 'Wait 2 hours before taking more'],
      onset: '30-90 minutes',
      duration: '4-8 hours',
      tips: ['Take with food for better absorption', 'Effects may vary by individual']
    },
    hasLabReport: true,
    featured: true,
    views: 980,
    purchases: 156,
    rating: 4.8,
    reviewCount: 203
  },

  // VAPE PRODUCTS
  {
    id: 'v1',
    name: 'Northern Lights Live Resin Cart',
    brand: 'Vapor Labs',
    category: 'vapes',
    subcategory: 'resin',
    price: 50.00,
    inStock: true,
    stockQuantity: 95,
    size: '1g',
    thcContent: 85.3,
    strainType: 'indica',
    hardware: '510-cart',
    concentrationType: 'live-resin',
    extractionMethod: 'solventless',
    flavorProfile: ['Pine', 'Earth', 'Sweet'],
    description: 'Full-spectrum live resin cartridge preserving the original terpene profile. Compatible with all 510-thread batteries.',
    effects: ['Relaxed', 'Sleepy', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667687/pexels-photo-7667687.jpeg'],
    usageInstructions: {
      storage: ['Store upright at room temperature', 'Avoid extreme temperatures'],
      dosage: ['Start with 1-2 small puffs', 'Wait 5-10 minutes between doses'],
      onset: '1-5 minutes',
      duration: '1-3 hours',
      tips: ['Use low voltage setting (2.5-3.2V)', 'Prime cartridge before first use'],
      recipes: [
        {
          title: 'Vape Maintenance Guide',
          description: 'Keep your cartridge performing at its best',
          ingredients: ['510-thread battery', 'Cleaning supplies'],
          instructions: [
            'Store cartridge upright when not in use',
            'Clean battery connection regularly',
            'Use appropriate voltage settings',
            'Avoid overheating the cartridge'
          ]
        }
      ]
    },
    hasLabReport: true,
    featured: true,
    views: 1340,
    purchases: 178,
    rating: 4.9,
    reviewCount: 245
  },

  // BEVERAGE PRODUCTS
  {
    id: 'b1',
    name: 'Strawberry Lemonade THC Drink',
    brand: 'Liquid Bliss',
    category: 'beverages',
    subcategory: 'lemonade',
    price: 12.00,
    inStock: true,
    stockQuantity: 200,
    size: '100ml',
    thcContent: 10,
    flavors: ['Strawberry', 'Lemonade'],
    description: 'Refreshing strawberry lemonade infused with fast-acting THC. Perfect for social occasions or relaxing evenings.',
    effects: ['Relaxed', 'Happy', 'Social'],
    images: ['https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg'],
    ingredients: ['Filtered Water', 'Cane Sugar', 'Natural Strawberry Flavor', 'Lemon Juice', 'THC Distillate', 'Citric Acid'],
    nutritionalFacts: {
      servingSize: '100ml',
      servingsPerContainer: 1,
      calories: 45,
      totalFat: 0,
      sodium: 5,
      totalCarbs: 11,
      sugars: 10,
      protein: 0
    },
    allergenInfo: {
      contains: [],
      mayContain: [],
      glutenFree: true,
      vegan: true,
      organic: false
    },
    usageInstructions: {
      storage: ['Refrigerate after opening', 'Shake well before use'],
      dosage: ['Start with half bottle (5mg)', 'Wait 30-60 minutes before more'],
      onset: '15-45 minutes',
      duration: '2-6 hours',
      tips: ['Drink on empty stomach for faster onset', 'Stay hydrated'],
      recipes: [
        {
          title: 'Cannabis Cocktail Mixer',
          description: 'Create elevated cocktails with THC beverages',
          ingredients: ['THC beverage', 'Fresh fruit', 'Sparkling water', 'Ice'],
          instructions: [
            'Pour THC beverage over ice',
            'Add fresh fruit garnish',
            'Top with sparkling water',
            'Stir gently and enjoy responsibly'
          ],
          videoUrl: 'https://youtube.com/watch?v=example'
        }
      ]
    },
    hasLabReport: true,
    featured: true,
    views: 756,
    purchases: 123,
    rating: 4.7,
    reviewCount: 78
  },

  // TINCTURE PRODUCTS
  {
    id: 'tn1',
    name: 'CBN Sleep Tincture',
    brand: 'Emerald Farms',
    category: 'tinctures',
    subcategory: 'cbn-blend',
    price: 40.00,
    inStock: true,
    stockQuantity: 60,
    size: '50ml',
    thcContent: 250, // 5mg per ml
    cbdContent: 500, // 10mg per ml
    flavors: ['Natural', 'Mint'],
    description: 'Specially formulated CBN-dominant tincture designed to promote restful sleep. Sublingual application for fast onset.',
    effects: ['Sleep', 'Relaxed', 'Calm'],
    images: ['https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg'],
    usageInstructions: {
      storage: ['Store in cool, dark place', 'Keep bottle tightly closed'],
      dosage: ['Start with 0.5ml (2.5mg THC)', 'Increase gradually as needed'],
      onset: '15-45 minutes',
      duration: '4-8 hours',
      tips: ['Hold under tongue for 60 seconds', 'Take 30 minutes before bedtime'],
      recipes: [
        {
          title: 'Sleepy Time Tea Blend',
          description: 'Add tincture to herbal tea for enhanced relaxation',
          ingredients: ['Chamomile tea', 'CBN tincture', 'Honey', 'Lavender'],
          instructions: [
            'Brew chamomile tea as normal',
            'Let cool slightly',
            'Add desired amount of CBN tincture',
            'Stir in honey and lavender',
            'Drink 30 minutes before bed'
          ]
        }
      ]
    },
    hasLabReport: true,
    featured: true,
    views: 670,
    purchases: 89,
    rating: 4.7,
    reviewCount: 112
  },

  // TOPICAL PRODUCTS
  {
    id: 't1',
    name: 'CBD Recovery Balm',
    brand: 'Green Wellness',
    category: 'topicals',
    subcategory: 'balm',
    topicalCategory: 'wellness',
    topicalSubcategory: 'pain-relief',
    price: 45.00,
    inStock: true,
    stockQuantity: 75,
    size: '3oz',
    thcContent: 0,
    cbdContent: 500,
    description: 'Professional-grade CBD recovery balm for targeted relief. Infused with arnica and menthol for enhanced therapeutic benefits.',
    effects: ['Pain Relief', 'Anti-inflammatory', 'Muscle Recovery'],
    images: ['https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg'],
    ingredients: ['CBD Isolate', 'Coconut Oil', 'Beeswax', 'Arnica', 'Menthol', 'Lavender Oil'],
    allergenInfo: {
      contains: ['Tree Nuts (Coconut)'],
      mayContain: [],
      glutenFree: true,
      vegan: false,
      organic: true
    },
    usageInstructions: {
      storage: ['Store at room temperature', 'Keep lid tightly closed'],
      dosage: ['Apply small amount to affected area', 'Massage gently into skin'],
      onset: '10-30 minutes',
      duration: '2-4 hours',
      tips: ['Clean skin before application', 'Wash hands after use', 'Avoid contact with eyes']
    },
    hasLabReport: true,
    featured: true,
    views: 890,
    purchases: 67,
    rating: 4.9,
    reviewCount: 89
  },

  // CONCENTRATE PRODUCTS
  {
    id: 'c1',
    name: 'Wedding Cake Live Rosin',
    brand: 'Solventless Solutions',
    category: 'concentrates',
    subcategory: 'rosin',
    price: 80.00,
    inStock: true,
    stockQuantity: 45,
    size: '1g',
    thcContent: 78.5,
    strainType: 'hybrid',
    extractionMethod: 'solventless',
    description: 'Premium live rosin extracted using ice water and heat press. No solvents, pure terpene preservation.',
    effects: ['Relaxed', 'Euphoric', 'Creative'],
    images: ['https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg'],
    usageInstructions: {
      storage: ['Store in refrigerator', 'Keep in airtight container', 'Use clean tools'],
      dosage: ['Start with rice grain sized amount', 'Increase gradually'],
      onset: 'Immediate when dabbed',
      duration: '1-3 hours',
      tips: ['Use low temperature dabbing', 'Store tools in freezer', 'Let warm to room temp before use']
    },
    hasLabReport: true,
    featured: true,
    views: 890,
    purchases: 67,
    rating: 4.9,
    reviewCount: 89
  }
];

// Enhanced filter options
export const filterOptions = {
  brands: [...new Set(products.map(p => p.brand))],
  weights: ['0.7g', '1g', '2g', '3.5g', '5g', '7g', '14g', '28g', '112g'],
  sizes: ['15ml', '50ml', '60ml', '100ml', '1.5oz', '3oz', '10oz', '0.2g', '0.5g', '1g', '2g'],
  packSizes: [1, 2, 5, 6, 7, 10, 12, 20, 40],
  strainTypes: ['sativa', 'indica', 'hybrid', 'mixed'],
  growingProcess: ['indoor', 'greenhouse', 'sun-grown'],
  forms: ['ground', 'buds'],
  infusionTypes: ['infused', 'non-infused'],
  infusionMaterials: ['liquid diamond', 'kief', 'distillate', 'rosin', 'resin', 'hash', 'isolate', 'badder', 'wax', 'rso'],
  tipMaterials: ['ceramic', 'wood', 'paper', 'glass'],
  hardware: ['disposable', '510-cart', 'pod'],
  topicalCategories: ['skincare', 'haircare', 'fragrances', 'body-care', 'wellness'],
  extractionMethods: ['full spectrum', 'solventless', 'co2', 'butane', 'propane', 'ethanol', 'ice water'],
  compounds: ['THC', 'CBD', 'CBG', 'CBN', 'CBC', 'THCV', 'CBDA', 'THCA'],
  flavors: [...new Set(products.flatMap(p => p.flavors || []))],
  effects: [...new Set(products.flatMap(p => p.effects))]
};

export const getProductsByCategory = (category: string, subcategory?: string) => {
  return products.filter(product => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory;
    }
    return product.category === category;
  });
};

export const getFeaturedProducts = (limit = 8) => {
  return products.filter(product => product.featured).slice(0, limit);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string, limit = 4) => {
  const currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return [];
  
  // First, try to find products from the same category
  let relatedProducts = products.filter(p => 
    p.id !== productId && 
    p.category === currentProduct.category &&
    p.inStock
  );
  
  // If we don't have enough from the same category, add products with similar effects
  if (relatedProducts.length < limit) {
    const similarEffectProducts = products.filter(p => 
      p.id !== productId && 
      p.category !== currentProduct.category &&
      p.inStock &&
      p.effects.some(effect => currentProduct.effects.includes(effect))
    );
    relatedProducts = [...relatedProducts, ...similarEffectProducts];
  }
  
  // If still not enough, add any other in-stock products
  if (relatedProducts.length < limit) {
    const otherProducts = products.filter(p => 
      p.id !== productId && 
      p.inStock &&
      !relatedProducts.some(rp => rp.id === p.id)
    );
    relatedProducts = [...relatedProducts, ...otherProducts];
  }
  
  // Shuffle and return limited results
  return relatedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.effects.some(effect => effect.toLowerCase().includes(lowercaseQuery))
  );
};

// Tax calculation function
export const calculateTax = (subtotal: number, state: string = 'NY') => {
  const taxRates: { [key: string]: number } = {
    'NY': 0.13, // 13% cannabis tax in NY
    'CA': 0.15,
    'CO': 0.15,
    'WA': 0.37
  };
  return subtotal * (taxRates[state] || 0.13);
};

// Delivery fee calculation
export const calculateDeliveryFee = (subtotal: number, distance: number = 5) => {
  if (subtotal >= 60) return 0; // Free delivery over $60
  if (distance <= 5) return 5;
  if (distance <= 10) return 8;
  return 12;
};

// Entourage effect calculator
export const calculateEntourageEffect = (cannabinoids: { [key: string]: number }) => {
  const effects: string[] = [];
  
  // Sleep effects
  if (cannabinoids.CBN > 0.5) {
    effects.push('Sleep Enhancement');
  }
  
  // Focus effects
  if (cannabinoids.CBG > 0.5) {
    effects.push('Focus & Clarity');
  }
  
  // Pain relief
  if (cannabinoids.CBD > 1 && cannabinoids.CBC > 0.3) {
    effects.push('Pain Relief');
  }
  
  // Mood enhancement
  if (cannabinoids.CBD > 0.5 && cannabinoids.CBG > 0.5) {
    effects.push('Mood Enhancement');
  }
  
  // Balanced effects
  if (cannabinoids.THC > 10 && cannabinoids.CBD > 1) {
    effects.push('Balanced High');
  }
  
  return effects;
};
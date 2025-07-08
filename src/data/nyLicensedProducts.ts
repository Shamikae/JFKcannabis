import { Product, LabReport } from '../types/product';

// Enhanced lab reports for NY licensed products
const nyLabReports: LabReport[] = [
  {
    id: 'lab-ny-001',
    productId: 'incredibles-chocolate',
    cannabinoids: {
      THC: 10,
      CBD: 0.5,
      CBG: 0.2,
      CBN: 0.1
    },
    terpenes: {
      'Myrcene': 0.3,
      'Limonene': 0.2,
      'Pinene': 0.1
    },
    contaminants: {
      pesticides: false,
      heavyMetals: false,
      residualSolvents: false,
      microbials: false,
      moisture: 5.2
    },
    testDate: '2024-12-01',
    labName: 'NY Cannabis Labs',
    batchNumber: 'INC240301',
    reportUrl: '/lab-reports/incredibles-001.pdf'
  },
  {
    id: 'lab-ny-002',
    productId: 'jaunty-gummies',
    cannabinoids: {
      THC: 5,
      CBD: 0.3,
      CBG: 0.1
    },
    terpenes: {
      'Limonene': 0.4,
      'Myrcene': 0.2
    },
    contaminants: {
      pesticides: false,
      heavyMetals: false,
      residualSolvents: false,
      microbials: false,
      moisture: 4.8
    },
    testDate: '2024-12-05',
    labName: 'NY Cannabis Labs',
    batchNumber: 'JNT240305',
    reportUrl: '/lab-reports/jaunty-001.pdf'
  }
];

export const nyLicensedProducts: Product[] = [
  // INCREDIBLES CHOCOLATES
  {
    id: 'incredibles-chocolate',
    name: 'Incredibles Chocolate Bar - Dark Chocolate',
    brand: 'Incredibles',
    category: 'edibles',
    subcategory: 'chocolates',
    price: 15.00,
    inStock: true,
    stockQuantity: 150,
    packSize: 1,
    thcContent: 100, // 10mg per piece, 10 pieces
    description: 'Premium dark chocolate bar infused with 100mg THC. Each bar contains 10 pieces with 10mg THC each for precise dosing.',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    ingredients: ['Dark Chocolate', 'THC Distillate', 'Cocoa Butter', 'Sugar', 'Vanilla'],
    allergenInfo: {
      contains: ['Milk', 'Soy'],
      mayContain: ['Tree Nuts', 'Peanuts'],
      glutenFree: false,
      vegan: false,
      organic: false
    },
    labReport: nyLabReports[0],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in cool, dry place below 70°F', 'Keep away from direct sunlight'],
      dosage: ['Start with 1 piece (10mg)', 'Wait 2 hours before taking more'],
      onset: '30-90 minutes',
      duration: '4-8 hours',
      tips: ['Take with food for better absorption', 'Effects may be stronger on empty stomach']
    },
    featured: true,
    views: 890,
    purchases: 156,
    rating: 4.7,
    reviewCount: 89
  },

  // CALAMITY JANE EDIBLES
  {
    id: 'calamity-jane-truffles',
    name: 'Calamity Jane Artisan Truffles',
    brand: 'Calamity Jane',
    category: 'edibles',
    subcategory: 'chocolates',
    price: 25.00,
    inStock: true,
    stockQuantity: 75,
    packSize: 4,
    thcContent: 40, // 10mg per truffle
    description: 'Handcrafted artisan chocolate truffles infused with premium cannabis extract. Four decadent flavors in each package.',
    effects: ['Relaxed', 'Creative', 'Happy'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    flavors: ['Dark Chocolate', 'Salted Caramel', 'Raspberry', 'Espresso'],
    hasLabReport: true,
    featured: true,
    views: 567,
    purchases: 89,
    rating: 4.9,
    reviewCount: 67
  },

  // JAUNTY GUMMIES
  {
    id: 'jaunty-gummies-2pack',
    name: 'Jaunty Fruit Gummies 2-Pack',
    brand: 'Jaunty',
    category: 'edibles',
    subcategory: 'gummies',
    price: 6.00,
    inStock: true,
    stockQuantity: 200,
    packSize: 2,
    thcContent: 10, // 5mg per gummy
    description: 'Premium fruit gummies with natural flavors and precise 5mg THC dosing. Perfect for microdosing.',
    effects: ['Uplifted', 'Focused', 'Creative'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    flavors: ['Strawberry', 'Orange'],
    labReport: nyLabReports[1],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store at room temperature', 'Keep sealed when not in use'],
      dosage: ['Start with 1 gummy (5mg)', 'Wait 2 hours before taking more'],
      onset: '30-60 minutes',
      duration: '3-6 hours',
      tips: ['Great for beginners', 'Perfect for microdosing']
    },
    views: 1234,
    purchases: 234,
    rating: 4.6,
    reviewCount: 156
  },

  // FOY GUMMIES
  {
    id: 'foy-gummies-2pack',
    name: 'Foy Natural Gummies 2-Pack',
    brand: 'Foy',
    category: 'edibles',
    subcategory: 'gummies',
    price: 6.00,
    inStock: true,
    stockQuantity: 180,
    packSize: 2,
    thcContent: 10,
    description: 'All-natural fruit gummies made with real fruit juice and organic ingredients.',
    effects: ['Relaxed', 'Happy', 'Calm'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    flavors: ['Mixed Berry', 'Tropical'],
    hasLabReport: true,
    views: 890,
    purchases: 145,
    rating: 4.5,
    reviewCount: 98
  },

  // GEEZONT PRODUCTS
  {
    id: 'geezont-gummies-2pack',
    name: 'Geezont Premium Gummies 2-Pack',
    brand: 'Geezont',
    category: 'edibles',
    subcategory: 'gummies',
    price: 6.00,
    inStock: true,
    stockQuantity: 160,
    packSize: 2,
    thcContent: 10,
    description: 'Premium cannabis gummies with consistent dosing and exceptional flavor.',
    effects: ['Euphoric', 'Relaxed', 'Creative'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 756,
    purchases: 123,
    rating: 4.7,
    reviewCount: 87
  },

  {
    id: 'geezont-pop-rocks',
    name: 'Geezont Pop Rocks Candy 10-Pack',
    brand: 'Geezont',
    category: 'edibles',
    subcategory: 'hard-candy',
    price: 30.00,
    inStock: true,
    stockQuantity: 45,
    packSize: 10,
    thcContent: 100, // 10mg per pack
    description: 'Nostalgic pop rocks candy infused with cannabis for a fun, fizzy experience.',
    effects: ['Happy', 'Energetic', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    flavors: ['Blue Raspberry', 'Cherry', 'Grape'],
    hasLabReport: true,
    views: 445,
    purchases: 67,
    rating: 4.8,
    reviewCount: 45
  },

  {
    id: 'geezont-caramel-10pack',
    name: 'Geezont Cannabis Caramels 10-Pack',
    brand: 'Geezont',
    category: 'edibles',
    subcategory: 'hard-candy',
    price: 20.00,
    inStock: true,
    stockQuantity: 80,
    packSize: 10,
    thcContent: 100,
    description: 'Rich, buttery caramels infused with premium cannabis extract.',
    effects: ['Relaxed', 'Happy', 'Sleepy'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 567,
    purchases: 89,
    rating: 4.6,
    reviewCount: 67
  },

  {
    id: 'geezont-chocolate-chip-cookies',
    name: 'Geezont Chocolate Chip Cookies 10-Pack',
    brand: 'Geezont',
    category: 'edibles',
    subcategory: 'baked-goods',
    price: 20.00,
    inStock: true,
    stockQuantity: 60,
    packSize: 10,
    thcContent: 100,
    description: 'Classic chocolate chip cookies infused with cannabis for the perfect treat.',
    effects: ['Happy', 'Relaxed', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 678,
    purchases: 98,
    rating: 4.8,
    reviewCount: 76
  },

  // 1906 PRODUCTS
  {
    id: '1906-love-gummies',
    name: '1906 Love Gummies',
    brand: '1906',
    category: 'edibles',
    subcategory: 'gummies',
    price: 6.00,
    inStock: true,
    stockQuantity: 120,
    packSize: 2,
    thcContent: 10,
    description: 'Specially formulated gummies designed to enhance intimacy and connection.',
    effects: ['Euphoric', 'Sensual', 'Relaxed'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 890,
    purchases: 134,
    rating: 4.7,
    reviewCount: 89
  },

  {
    id: '1906-pm-gummies',
    name: '1906 PM Gummies with CBN',
    brand: '1906',
    category: 'edibles',
    subcategory: 'gummies',
    price: 6.00,
    inStock: true,
    stockQuantity: 100,
    packSize: 2,
    thcContent: 16.6, // 8.3mg THC per gummy
    cbdContent: 13.4, // 6.7mg CBD per gummy
    description: 'Evening gummies with THC, CBD, and CBN for restful sleep. Contains 8.3mg THC, 6.7mg CBD, and 3.3mg CBN per gummy.',
    effects: ['Sleepy', 'Relaxed', 'Calm'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in cool, dry place', 'Keep away from children'],
      dosage: ['Take 1 gummy 30 minutes before bedtime', 'Do not exceed 1 gummy per night'],
      onset: '30-60 minutes',
      duration: '6-8 hours',
      tips: ['Best taken on empty stomach', 'Avoid alcohol when using']
    },
    views: 756,
    purchases: 112,
    rating: 4.9,
    reviewCount: 78
  },

  {
    id: '1906-capsules-2pack',
    name: '1906 Capsules 2-Pack (5mg each)',
    brand: '1906',
    category: 'edibles',
    subcategory: 'capsules',
    price: 5.00,
    inStock: true,
    stockQuantity: 150,
    packSize: 2,
    thcContent: 10, // 5mg per capsule
    description: 'Precise cannabis capsules with 5mg THC each for consistent microdosing.',
    effects: ['Focused', 'Uplifted', 'Clear'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 567,
    purchases: 89,
    rating: 4.6,
    reviewCount: 56
  },

  // BLOX GUMMIES
  {
    id: 'blox-gummies',
    name: 'Blox Building Block Gummies',
    brand: 'Blox',
    category: 'edibles',
    subcategory: 'gummies',
    price: 10.00,
    inStock: true,
    stockQuantity: 90,
    packSize: 4,
    thcContent: 40,
    description: 'Fun building block-shaped gummies that stack together for customizable dosing.',
    effects: ['Creative', 'Happy', 'Focused'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 445,
    purchases: 67,
    rating: 4.5,
    reviewCount: 45
  },

  // HIGH FALLS CANNA PRODUCTS
  {
    id: 'high-falls-gummies',
    name: 'High Falls Canna Premium Gummies',
    brand: 'High Falls Canna',
    category: 'edibles',
    subcategory: 'gummies',
    price: 20.00,
    inStock: true,
    stockQuantity: 80,
    packSize: 10,
    thcContent: 100,
    description: 'Premium cannabis gummies from the Finger Lakes region with natural fruit flavors.',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 678,
    purchases: 98,
    rating: 4.7,
    reviewCount: 76
  },

  {
    id: 'high-falls-preroll-07g',
    name: 'High Falls Canna Pre-Roll 0.7g',
    brand: 'High Falls Canna',
    category: 'pre-rolls',
    subcategory: 'uninfused',
    price: 10.00,
    inStock: true,
    stockQuantity: 120,
    weight: '0.7g',
    packSize: 1,
    thcContent: 22.5,
    strainType: 'hybrid',
    infusionType: 'non-infused',
    tipMaterial: 'paper',
    growingProcess: 'indoor',
    description: 'Premium indoor-grown cannabis pre-roll with consistent quality and smooth burn.',
    effects: ['Balanced', 'Relaxed', 'Creative'],
    images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
    hasLabReport: true,
    views: 890,
    purchases: 145,
    rating: 4.6,
    reviewCount: 89
  },

  {
    id: 'high-falls-flower-35g',
    name: 'High Falls Canna Premium Flower 3.5g',
    brand: 'High Falls Canna',
    category: 'flower',
    subcategory: 'buds',
    price: 35.00,
    inStock: true,
    stockQuantity: 60,
    weight: '3.5g',
    thcContent: 24.8,
    strainType: 'indica',
    growingProcess: 'indoor',
    form: 'buds',
    indoor: true,
    description: 'Premium indoor-grown cannabis flower with rich terpene profiles and potent effects.',
    effects: ['Relaxed', 'Sleepy', 'Happy'],
    images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
    hasLabReport: true,
    views: 1234,
    purchases: 178,
    rating: 4.8,
    reviewCount: 134
  },

  // NANTICOKE PRODUCTS
  {
    id: 'nanticoke-mints-2pack',
    name: 'Nanticoke Cannabis Mints 2-Pack',
    brand: 'Nanticoke',
    category: 'edibles',
    subcategory: 'mints',
    price: 5.00,
    inStock: true,
    stockQuantity: 200,
    packSize: 2,
    thcContent: 10,
    description: 'Discrete cannabis mints perfect for on-the-go dosing with refreshing mint flavor.',
    effects: ['Clear', 'Focused', 'Uplifted'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 567,
    purchases: 89,
    rating: 4.5,
    reviewCount: 67
  },

  {
    id: 'nanticoke-sleep-mints',
    name: 'Nanticoke Sleep Mints with CBN 10-Pack',
    brand: 'Nanticoke',
    category: 'edibles',
    subcategory: 'mints',
    price: 15.00,
    inStock: true,
    stockQuantity: 80,
    packSize: 10,
    thcContent: 50, // 5mg THC per mint
    cbdContent: 30, // 3mg CBD per mint
    description: 'Sleep-focused mints with THC, CBD, and CBN for restful nights.',
    effects: ['Sleepy', 'Relaxed', 'Calm'],
    images: ['https://images.pexels.com/photos/7667521/pexels-photo-7667521.jpeg'],
    hasLabReport: true,
    views: 445,
    purchases: 67,
    rating: 4.8,
    reviewCount: 45
  },

  // BEVERAGES
  {
    id: 'high-peaks-beverage',
    name: 'High Peaks Cannabis Beverage',
    brand: 'High Peaks',
    category: 'beverages',
    subcategory: 'seltzer',
    price: 5.00,
    inStock: true,
    stockQuantity: 150,
    size: '100ml',
    thcContent: 5,
    description: 'Refreshing cannabis-infused seltzer with natural flavors and fast-acting THC.',
    effects: ['Uplifted', 'Social', 'Relaxed'],
    images: ['https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg'],
    flavors: ['Lemon-Lime', 'Grapefruit'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Refrigerate after opening', 'Shake well before use'],
      dosage: ['Start with half can (2.5mg)', 'Wait 30 minutes before more'],
      onset: '15-30 minutes',
      duration: '2-4 hours',
      tips: ['Drink on empty stomach for faster onset', 'Stay hydrated']
    },
    views: 890,
    purchases: 134,
    rating: 4.6,
    reviewCount: 89
  },

  {
    id: 'aryloom-beverage',
    name: 'Aryloom Craft Cannabis Drink',
    brand: 'Aryloom',
    category: 'beverages',
    subcategory: 'juice',
    price: 7.00,
    inStock: true,
    stockQuantity: 120,
    size: '100ml',
    thcContent: 10,
    description: 'Craft cannabis beverage with premium ingredients and unique flavor profiles.',
    effects: ['Creative', 'Happy', 'Focused'],
    images: ['https://images.pexels.com/photos/7439073/pexels-photo-7439073.jpeg'],
    flavors: ['Pomegranate', 'Elderberry'],
    hasLabReport: true,
    views: 567,
    purchases: 78,
    rating: 4.7,
    reviewCount: 56
  },

  // TINCTURES
  {
    id: 'mfny-tincture',
    name: 'MFNY Premium Cannabis Tincture',
    brand: 'MFNY',
    category: 'tinctures',
    subcategory: 'cbd-blend',
    price: 25.00,
    inStock: true,
    stockQuantity: 60,
    size: '50ml',
    thcContent: 250, // 5mg per ml
    cbdContent: 500, // 10mg per ml
    description: 'Made For New York premium tincture with balanced THC and CBD for therapeutic effects.',
    effects: ['Balanced', 'Calm', 'Focused'],
    images: ['https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg'],
    flavors: ['Natural', 'Mint'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in cool, dark place', 'Keep bottle tightly closed'],
      dosage: ['Start with 0.5ml', 'Hold under tongue for 60 seconds'],
      onset: '15-45 minutes',
      duration: '4-6 hours',
      tips: ['Shake well before use', 'Use graduated dropper for accuracy'],
      recipes: [
        {
          title: 'Cannabis Tea Blend',
          description: 'Add tincture to your favorite herbal tea',
          ingredients: ['Herbal tea', 'MFNY tincture', 'Honey', 'Lemon'],
          instructions: [
            'Brew tea as normal',
            'Let cool slightly',
            'Add desired amount of tincture',
            'Stir in honey and lemon',
            'Enjoy responsibly'
          ]
        }
      ]
    },
    views: 445,
    purchases: 67,
    rating: 4.8,
    reviewCount: 45
  },

  // CONCENTRATES
  {
    id: 'snooby-dankins-kief',
    name: 'Snooby Dankins Premium Kief 1g',
    brand: 'Snooby Dankins',
    category: 'concentrates',
    subcategory: 'kief',
    price: 30.00,
    inStock: true,
    stockQuantity: 40,
    size: '1g',
    thcContent: 65.5,
    extractionMethod: 'dry-sift',
    description: 'Premium dry-sift kief collected from top-shelf cannabis flower.',
    effects: ['Potent', 'Euphoric', 'Relaxed'],
    images: ['https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in freezer for best quality', 'Use airtight container'],
      dosage: ['Start with rice grain amount', 'Sprinkle on flower or use in vaporizer'],
      onset: 'Immediate when vaporized',
      duration: '2-4 hours',
      tips: ['Use clean tools', 'Let warm to room temp before handling']
    },
    views: 567,
    purchases: 45,
    rating: 4.7,
    reviewCount: 34
  },

  {
    id: 'shine-cured-rosin',
    name: 'Shine Cured Rosin 1g',
    brand: 'Shine',
    category: 'concentrates',
    subcategory: 'rosin',
    price: 30.00,
    inStock: true,
    stockQuantity: 35,
    size: '1g',
    thcContent: 78.2,
    extractionMethod: 'solventless',
    description: 'Premium cured rosin extracted using heat and pressure with no solvents.',
    effects: ['Potent', 'Full-spectrum', 'Euphoric'],
    images: ['https://images.pexels.com/photos/7667740/pexels-photo-7667740.jpeg'],
    hasLabReport: true,
    views: 445,
    purchases: 34,
    rating: 4.9,
    reviewCount: 28
  },

  // PRE-ROLLS
  {
    id: 'nx-green-giant',
    name: 'NX Green Giant 1g Pre-Roll',
    brand: 'NX',
    category: 'pre-rolls',
    subcategory: 'uninfused',
    price: 7.00,
    inStock: true,
    stockQuantity: 100,
    weight: '1g',
    packSize: 1,
    thcContent: 21.5,
    strainType: 'sativa',
    infusionType: 'non-infused',
    tipMaterial: 'paper',
    growingProcess: 'sun-grown',
    description: 'Sun-grown sativa pre-roll with energizing effects and smooth burn.',
    effects: ['Energetic', 'Creative', 'Uplifted'],
    images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
    hasLabReport: true,
    views: 678,
    purchases: 89,
    rating: 4.5,
    reviewCount: 67
  },

  {
    id: 'dogwalkers-preroll',
    name: 'Dogwalkers Premium Pre-Roll 0.75g',
    brand: 'Dogwalkers',
    category: 'pre-rolls',
    subcategory: 'uninfused',
    price: 10.00,
    inStock: true,
    stockQuantity: 80,
    weight: '0.75g',
    packSize: 1,
    thcContent: 24.2,
    strainType: 'hybrid',
    infusionType: 'non-infused',
    tipMaterial: 'wood',
    growingProcess: 'indoor',
    indoor: true,
    description: 'Premium indoor-grown hybrid pre-roll perfect for daily adventures.',
    effects: ['Balanced', 'Happy', 'Relaxed'],
    images: ['https://images.pexels.com/photos/8751558/pexels-photo-8751558.jpeg'],
    hasLabReport: true,
    views: 890,
    purchases: 123,
    rating: 4.7,
    reviewCount: 89
  },

  // FLOWERS
  {
    id: 'rec-roots-flower',
    name: 'Rec Roots Premium Flower 3.5g',
    brand: 'Rec Roots',
    category: 'flower',
    subcategory: 'buds',
    price: 25.00,
    inStock: true,
    stockQuantity: 50,
    weight: '3.5g',
    thcContent: 22.8,
    strainType: 'hybrid',
    growingProcess: 'greenhouse',
    form: 'buds',
    description: 'Greenhouse-grown cannabis flower with balanced effects and rich terpene profile.',
    effects: ['Balanced', 'Creative', 'Relaxed'],
    images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
    hasLabReport: true,
    views: 1234,
    purchases: 156,
    rating: 4.6,
    reviewCount: 123
  },

  {
    id: 'good-greenz-flower',
    name: 'Good Greenz Indoor Flower 3.5g',
    brand: 'Good Greenz',
    category: 'flower',
    subcategory: 'buds',
    price: 25.00,
    inStock: true,
    stockQuantity: 75,
    weight: '3.5g',
    thcContent: 25.4,
    strainType: 'indica',
    growingProcess: 'indoor',
    form: 'buds',
    indoor: true,
    description: 'Premium indoor-grown indica flower with potent effects and smooth smoke.',
    effects: ['Relaxed', 'Sleepy', 'Happy'],
    images: ['https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg'],
    hasLabReport: true,
    views: 890,
    purchases: 134,
    rating: 4.7,
    reviewCount: 98
  },

  // COOKING INGREDIENTS
  {
    id: 'chef-for-higher-coconut-oil',
    name: 'Chef for Higher Cannabis Coconut Oil',
    brand: 'Chef for Higher',
    category: 'edibles',
    subcategory: 'cooking-ingredients',
    price: 20.00,
    inStock: true,
    stockQuantity: 40,
    size: '240ml',
    thcContent: 240, // 10mg per teaspoon
    description: 'Premium cannabis-infused coconut oil perfect for cooking and baking. 240mg total THC with 10mg per teaspoon.',
    effects: ['Varies by dose', 'Long-lasting', 'Full-body'],
    images: ['https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg'],
    ingredients: ['Organic Coconut Oil', 'Cannabis Extract'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store at room temperature', 'Stir before use if separated'],
      dosage: ['Start with 1 teaspoon (10mg)', 'Wait 2 hours before taking more'],
      onset: '30-90 minutes when consumed',
      duration: '4-8 hours',
      tips: ['Great for baking and cooking', 'Can be used topically'],
      recipes: [
        {
          title: 'Cannabis Chocolate Chip Cookies',
          description: 'Classic cookies with a cannabis twist',
          ingredients: ['2 cups flour', '1/2 cup cannabis coconut oil', '1/2 cup sugar', '1/2 cup brown sugar', '2 eggs', '1 tsp vanilla', '1 cup chocolate chips'],
          instructions: [
            'Preheat oven to 375°F',
            'Mix dry ingredients in one bowl',
            'Cream cannabis coconut oil with sugars',
            'Add eggs and vanilla to oil mixture',
            'Combine wet and dry ingredients',
            'Fold in chocolate chips',
            'Bake for 9-11 minutes'
          ],
          videoUrl: 'https://youtube.com/watch?v=cannabis-cookies'
        },
        {
          title: 'Cannabis Salad Dressing',
          description: 'Elevated salad dressing for dinner parties',
          ingredients: ['1/4 cup cannabis coconut oil (melted)', '2 tbsp balsamic vinegar', '1 tbsp honey', '1 tsp Dijon mustard', 'Salt and pepper'],
          instructions: [
            'Melt cannabis coconut oil gently',
            'Whisk together vinegar, honey, and mustard',
            'Slowly add melted oil while whisking',
            'Season with salt and pepper',
            'Drizzle over salad and enjoy responsibly'
          ]
        }
      ]
    },
    views: 567,
    purchases: 45,
    rating: 4.8,
    reviewCount: 34
  },

  {
    id: 'nanticoke-hi-stix',
    name: 'Nanticoke Hi Stix Unsweetened Mix',
    brand: 'Nanticoke',
    category: 'edibles',
    subcategory: 'cooking-ingredients',
    price: 20.00,
    inStock: true,
    stockQuantity: 60,
    size: '100g',
    thcContent: 500, // 5mg per gram
    description: 'Unsweetened cannabis powder mix perfect for adding to beverages, smoothies, or recipes.',
    effects: ['Customizable', 'Versatile', 'Precise dosing'],
    images: ['https://images.pexels.com/photos/7667543/pexels-photo-7667543.jpeg'],
    hasLabReport: true,
    usageInstructions: {
      storage: ['Store in cool, dry place', 'Keep sealed when not in use'],
      dosage: ['Start with 1g (5mg THC)', 'Mix thoroughly into food or drink'],
      onset: '30-90 minutes',
      duration: '4-8 hours',
      tips: ['Mixes well with liquids', 'Great for smoothies and protein shakes'],
      recipes: [
        {
          title: 'Cannabis Protein Smoothie',
          description: 'Post-workout smoothie with cannabis',
          ingredients: ['1 banana', '1 cup almond milk', '1 scoop protein powder', '1-2g Hi Stix powder', '1 tbsp almond butter', 'Ice'],
          instructions: [
            'Add all ingredients to blender',
            'Blend until smooth',
            'Adjust consistency with more milk if needed',
            'Enjoy responsibly after workouts'
          ]
        }
      ]
    },
    views: 445,
    purchases: 34,
    rating: 4.6,
    reviewCount: 28
  }
];

export const getSaleProducts = () => {
  return nyLicensedProducts.filter(product => 
    product.salePrice && product.salePrice < product.price
  );
};

export const getProductsByBrand = (brandName: string) => {
  return nyLicensedProducts.filter(product => 
    product.brand.toLowerCase() === brandName.toLowerCase()
  );
};

export const getProductsByCategory = (category: string) => {
  return nyLicensedProducts.filter(product => 
    product.category === category
  );
};
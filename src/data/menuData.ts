export interface SubCategory {
  name: string;
  slug: string;
}

export interface MenuItem {
  name: string;
  path: string;
  subCategories?: SubCategory[];
}

export const menuData: MenuItem[] = [
  {
    name: 'Shop',
    path: '/shop',
    subCategories: [
      // Shop by Type
      { name: 'Sativa', slug: 'sativa' },
      { name: 'Indica', slug: 'indica' },
      { name: 'Hybrid', slug: 'hybrid' },
      { name: 'Mixed', slug: 'mixed' },
      // Shop by Categories
      { name: 'Flowers', slug: 'flowers' },
      { name: 'Pre-Rolls', slug: 'pre-rolls' },
      { name: 'Edibles', slug: 'edibles' },
      { name: 'Vapes', slug: 'vapes' },
      { name: 'Concentrates', slug: 'concentrates' },
      { name: 'Tinctures', slug: 'tinctures' },
      { name: 'Topicals', slug: 'topicals' },
      { name: 'Beverages', slug: 'beverages' },
      { name: 'Accessories', slug: 'accessories' },
      { name: 'Apparel', slug: 'apparel' },
      { name: 'CBD', slug: 'cbd' },
    ],
  },
  {
    name: 'SALE',
    path: '/sale',
  },
  {
    name: 'Brands',
    path: '/brands',
  },
  {
    name: 'Delivery',
    path: '/delivery',
  },
  {
    name: 'Memberships',
    path: '/memberships',
  },
  {
    name: 'Subscriptions',
    path: '/subscriptions',
  },
  {
    name: 'Cafe',
    path: '/cafe',
  },
];

// Enhanced subcategories for specific product types
export const productSubCategories = {
  flowers: [
    { name: 'Ground', slug: 'ground' },
    { name: 'Regular Buds', slug: 'regular-buds' },
    { name: 'Infused', slug: 'infused' },
  ],
  'pre-rolls': [
    { name: 'Uninfused', slug: 'uninfused' },
    { name: 'Infused', slug: 'infused' },
    { name: 'Blunt', slug: 'blunt' },
    { name: 'Papers', slug: 'papers' },
    { name: 'Premium Pre-Rolls', slug: 'premium-pre-rolls' },
  ],
  edibles: [
    { name: 'Gummies', slug: 'gummies' },
    { name: 'Chocolates', slug: 'chocolates' },
    { name: 'Hard Candy', slug: 'hard-candy' },
    { name: 'Baked Goods', slug: 'baked-goods' },
    { name: 'Mints', slug: 'mints' },
    { name: 'Capsules', slug: 'capsules' },
    { name: 'Cooking Ingredients', slug: 'cooking-ingredients' },
  ],
  vapes: [
    { name: 'Liquid Diamonds', slug: 'liquid-diamonds' },
    { name: 'Distillate', slug: 'distillate' },
    { name: 'Rosin', slug: 'rosin' },
    { name: 'Resin', slug: 'resin' },
    { name: 'RSO', slug: 'rso' },
    { name: 'Badder', slug: 'badder' },
    { name: 'Wax', slug: 'wax' },
  ],
  concentrates: [
    { name: 'Rosin', slug: 'rosin' },
    { name: 'Resin', slug: 'resin' },
    { name: 'Badder', slug: 'badder' },
    { name: 'Shatter', slug: 'shatter' },
    { name: 'Kief', slug: 'kief' },
    { name: 'Temple Ball', slug: 'temple-ball' },
    { name: 'Hash', slug: 'hash' },
  ],
  tinctures: [
    { name: 'CBN Blend', slug: 'cbn-blend' },
    { name: 'CBG Blend', slug: 'cbg-blend' },
    { name: 'CBD Blend', slug: 'cbd-blend' },
  ],
  topicals: [
    { name: 'Balm', slug: 'balm' },
    { name: 'Lotion', slug: 'lotion' },
    { name: 'Lip Balm', slug: 'lip-balm' },
  ],
  beverages: [
    { name: 'Drink Shots', slug: 'drink-shots' },
    { name: 'Iced Tea', slug: 'iced-tea' },
    { name: 'Lemonade', slug: 'lemonade' },
    { name: 'Seltzer', slug: 'seltzer' },
    { name: 'Cold Brew', slug: 'cold-brew' },
    { name: 'Juice', slug: 'juice' },
    { name: 'Soda', slug: 'soda' },
  ],
  accessories: [
    { name: 'Smoking', slug: 'smoking' },
    { name: 'Vaporizers', slug: 'vaporizers' },
    { name: 'Storage', slug: 'storage' },
    { name: 'Grinders', slug: 'grinders' },
  ],
  apparel: [
    { name: 'T-Shirts', slug: 't-shirts' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Hats', slug: 'hats' },
    { name: 'Accessories', slug: 'accessories' },
  ],
  cbd: [
    { name: 'Flowers', slug: 'flowers' },
    { name: 'Pre-Rolls', slug: 'pre-rolls' },
    { name: 'Edibles', slug: 'edibles' },
    { name: 'Vapes', slug: 'vapes' },
    { name: 'Concentrates', slug: 'concentrates' },
    { name: 'Tinctures', slug: 'tinctures' },
    { name: 'Topicals', slug: 'topicals' },
    { name: 'Beverages', slug: 'beverages' },
    { name: 'Pets', slug: 'pets' },
  ],
  'pre-order': [
    { name: 'Coming Soon', slug: 'coming-soon' },
    { name: 'Limited Edition', slug: 'limited-edition' },
    { name: 'Seasonal', slug: 'seasonal' },
    { name: 'Exclusive', slug: 'exclusive' },
  ],
};

// Terpene profiles and data
export const terpeneProfiles = {
  myrcene: {
    name: 'Myrcene',
    aroma: 'Earthy, musky, clove-like',
    effects: ['Sedative', 'Relaxing', 'Anti-inflammatory'],
    alsoFoundIn: ['Mango', 'Thyme', 'Lemongrass'],
    color: 'bg-amber-100 text-amber-800'
  },
  limonene: {
    name: 'Limonene',
    aroma: 'Citrus, lemon, orange',
    effects: ['Uplifting', 'Mood-enhancing', 'Anti-anxiety'],
    alsoFoundIn: ['Citrus fruits'],
    color: 'bg-yellow-100 text-yellow-800'
  },
  pinene: {
    name: 'Pinene',
    aroma: 'Pine, fresh forest',
    effects: ['Alertness', 'Memory retention', 'Anti-asthmatic'],
    alsoFoundIn: ['Pine needles', 'Rosemary'],
    color: 'bg-green-100 text-green-800'
  },
  linalool: {
    name: 'Linalool',
    aroma: 'Floral, lavender',
    effects: ['Calming', 'Anti-anxiety', 'Sleep aid'],
    alsoFoundIn: ['Lavender', 'Mint'],
    color: 'bg-purple-100 text-purple-800'
  },
  caryophyllene: {
    name: 'Caryophyllene',
    aroma: 'Spicy, peppery, woody',
    effects: ['Anti-inflammatory', 'Pain relief'],
    alsoFoundIn: ['Black pepper', 'Cloves', 'Cinnamon'],
    color: 'bg-red-100 text-red-800'
  },
  humulene: {
    name: 'Humulene',
    aroma: 'Woody, earthy, hops-like',
    effects: ['Appetite suppressant', 'Anti-inflammatory'],
    alsoFoundIn: ['Hops', 'Coriander'],
    color: 'bg-orange-100 text-orange-800'
  },
  terpinolene: {
    name: 'Terpinolene',
    aroma: 'Fruity, herbal, floral',
    effects: ['Uplifting', 'Antioxidant', 'Sedative'],
    alsoFoundIn: ['Apples', 'Nutmeg', 'Tea tree'],
    color: 'bg-pink-100 text-pink-800'
  },
  ocimene: {
    name: 'Ocimene',
    aroma: 'Sweet, herbal, woody',
    effects: ['Anti-fungal', 'Decongestant', 'Energizing'],
    alsoFoundIn: ['Mint', 'Basil', 'Orchids'],
    color: 'bg-teal-100 text-teal-800'
  },
  bisabolol: {
    name: 'Bisabolol',
    aroma: 'Floral, sweet, chamomile',
    effects: ['Skin-soothing', 'Anti-irritant'],
    alsoFoundIn: ['Chamomile', 'Candeia tree'],
    color: 'bg-blue-100 text-blue-800'
  },
  eucalyptol: {
    name: 'Eucalyptol',
    aroma: 'Cool, minty, eucalyptus',
    effects: ['Focus-enhancing', 'Decongestant'],
    alsoFoundIn: ['Eucalyptus', 'Rosemary'],
    color: 'bg-cyan-100 text-cyan-800'
  },
  nerolidol: {
    name: 'Nerolidol',
    aroma: 'Woody, floral, citrus',
    effects: ['Sedative', 'Anti-fungal'],
    alsoFoundIn: ['Jasmine', 'Tea tree'],
    color: 'bg-indigo-100 text-indigo-800'
  }
};

// Common terpene profile combinations
export const terpeneProfileTypes = {
  citrus: {
    name: 'Citrus Profile',
    dominant: 'Limonene',
    description: 'Uplifting and mood-boosting',
    terpenes: ['limonene', 'pinene', 'ocimene']
  },
  earthy: {
    name: 'Earthy/Skunky Profile',
    dominant: 'Myrcene + Caryophyllene',
    description: 'Calming and pain-relieving',
    terpenes: ['myrcene', 'caryophyllene', 'humulene']
  },
  piney: {
    name: 'Piney Profile',
    dominant: 'Pinene',
    description: 'Clear-headed and alert',
    terpenes: ['pinene', 'eucalyptol', 'limonene']
  },
  floral: {
    name: 'Floral Profile',
    dominant: 'Linalool',
    description: 'Calming and anti-anxiety',
    terpenes: ['linalool', 'bisabolol', 'nerolidol']
  },
  fruity: {
    name: 'Fruity Profile',
    dominant: 'Terpinolene or Ocimene',
    description: 'Energetic and vibrant',
    terpenes: ['terpinolene', 'ocimene', 'limonene']
  }
};

// Pack sizes for pre-rolls
export const preRollPackSizes = [
  { name: 'Single', value: 1 },
  { name: '2-Pack', value: 2 },
  { name: '5-Pack', value: 5 },
  { name: '6-Pack', value: 6 },
  { name: '7-Pack', value: 7 },
  { name: '10-Pack', value: 10 },
  { name: '12-Pack', value: 12 },
  { name: '20-Pack', value: 20 },
  { name: '40-Pack', value: 40 },
];

// Infusion types
export const infusionTypes = [
  'Liquid Diamond',
  'Kief',
  'Distillate',
  'Rosin',
  'Resin',
  'Hash',
  'Isolate',
  'Badder',
  'Wax',
  'RSO'
];

// Extraction methods
export const extractionMethods = [
  'Full Spectrum',
  'Solventless',
  'CO2',
  'Butane',
  'Propane',
  'Ethanol',
  'Ice Water'
];

// Desired effects with associated cannabinoids
export const desiredEffects = {
  sleep: ['CBN', 'CBD', 'THC'],
  focus: ['CBG', 'CBD', 'THCV'],
  pain: ['CBD', 'CBC', 'THC'],
  mood: ['CBD', 'CBG', 'THC'],
  energy: ['THCV', 'CBG', 'Sativa Terpenes'],
  relaxation: ['CBD', 'CBN', 'Myrcene'],
  creativity: ['THC', 'Limonene', 'Pinene'],
  appetite: ['THC', 'CBG', 'Humulene'],
};

// Cannabinoid combinations and their entourage effects
export const entourageEffects = {
  'CBD + CBG': ['Mood boost', 'Relaxation', 'Overall relief', 'Anti-inflammatory'],
  'CBD + CBC': ['Pain relief', 'Anti-inflammatory', 'Neuroprotective'],
  'CBN + CBD': ['Sleep enhancement', 'Sedation', 'Muscle relaxation'],
  'THC + CBD': ['Balanced high', 'Reduced anxiety', 'Pain relief'],
  'CBG + CBC': ['Focus enhancement', 'Antibacterial', 'Neuroprotective'],
  'THCV + CBD': ['Appetite suppression', 'Energy boost', 'Focus'],
};
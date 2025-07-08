export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  featured?: boolean;
  categories?: string[];
  website?: string;
  founded?: string;
  location?: string;
}

export const brands: Brand[] = [
  // EDIBLES BRANDS
  {
    id: "incredibles",
    name: "Incredibles",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Premium chocolate edibles crafted with the finest ingredients. Known for consistent dosing and exceptional flavor profiles.",
    featured: true,
    categories: ["edibles"],
    founded: "2010",
    location: "Colorado"
  },
  {
    id: "calamity-jane",
    name: "Calamity Jane",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Artisanal cannabis confections with a focus on quality and potency. Each product is carefully crafted for the discerning consumer.",
    featured: true,
    categories: ["edibles"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "soft-power-sweets",
    name: "Soft Power Sweets",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Innovative cannabis sweets that combine traditional confectionery techniques with modern cannabis science.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "zonk",
    name: "Zonk",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Bold flavors and consistent effects. Zonk delivers premium cannabis edibles for the modern consumer.",
    categories: ["edibles"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "ohho",
    name: "OHHO",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Organic, health-focused cannabis edibles made with natural ingredients and sustainable practices.",
    categories: ["edibles"],
    founded: "2021",
    location: "New York"
  },
  {
    id: "nanticoke",
    name: "Nanticoke",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Traditional cannabis products with a modern twist. Specializing in mints, gummies, and wellness products.",
    featured: true,
    categories: ["edibles", "topicals"],
    founded: "2017",
    location: "New York"
  },
  {
    id: "cannibals",
    name: "Cannibals",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Playful and potent cannabis edibles with unique flavors and creative presentations.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "jaunty",
    name: "Jaunty",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Premium cannabis gummies and edibles with precise dosing and exceptional taste.",
    featured: true,
    categories: ["edibles", "tinctures"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "foy",
    name: "Foy",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Small-batch cannabis gummies made with natural fruit flavors and high-quality cannabis extracts.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "geezont",
    name: "Geezont",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Diverse cannabis product line including gummies, cookies, caramels, and pop rocks candy.",
    featured: true,
    categories: ["edibles"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "1906",
    name: "1906",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Precisely formulated cannabis products designed for specific experiences and effects.",
    featured: true,
    categories: ["edibles"],
    founded: "2016",
    location: "Colorado"
  },
  {
    id: "blox",
    name: "Blox",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Building blocks of cannabis wellness with consistent, reliable products.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "high-falls-canna",
    name: "High Falls Canna",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "New York-based cannabis company offering a full range of premium products from flower to edibles.",
    featured: true,
    categories: ["edibles", "flowers", "pre-rolls", "tinctures"],
    founded: "2021",
    location: "New York"
  },
  {
    id: "green-spectrum",
    name: "Green Spectrum",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Full-spectrum cannabis products focusing on the entourage effect and therapeutic benefits.",
    featured: true,
    categories: ["edibles", "tinctures", "topicals"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "hashtag-honey",
    name: "Hashtag Honey",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Cannabis-infused honey and sweet treats made with locally sourced ingredients.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "yetti-farms",
    name: "Yetti Farms",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Mountain-grown cannabis with a focus on quality cultivation and artisanal products.",
    categories: ["edibles", "flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "generic-af",
    name: "Generic AF",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "No-nonsense cannabis products with straightforward branding and consistent quality.",
    featured: true,
    categories: ["edibles", "flowers", "pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "senior-moments",
    name: "Senior Moments",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Cannabis products designed with older adults in mind, focusing on wellness and therapeutic benefits.",
    categories: ["edibles"],
    founded: "2021",
    location: "New York"
  },
  {
    id: "love-ouid",
    name: "Love Ouid",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Cannabis products designed to enhance intimacy and connection.",
    categories: ["edibles"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "snooby-dankins",
    name: "Snooby Dankins",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Premium cannabis concentrates and edibles with a focus on potency and purity.",
    featured: true,
    categories: ["edibles", "concentrates"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "omo-labs",
    name: "Omo Labs",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Scientific approach to cannabis with lab-tested products and innovative formulations.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "flav",
    name: "Flav",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Flavor-forward cannabis edibles including candy belts and gourmet treats.",
    categories: ["edibles"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "cheeba-chews",
    name: "Cheeba Chews",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Original cannabis taffy with decades of experience in consistent, potent edibles.",
    featured: true,
    categories: ["edibles"],
    founded: "2009",
    location: "Colorado"
  },
  {
    id: "naturae",
    name: "Naturae",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Natural cannabis products made with organic ingredients and sustainable practices.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "smokies",
    name: "Smokies",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Cannabis edibles inspired by classic American treats and flavors.",
    categories: ["edibles"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "torwood",
    name: "Torwood",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Premium cannabis flower and edibles with a focus on craft cultivation.",
    featured: true,
    categories: ["edibles", "flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "no-wave",
    name: "No Wave",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Avant-garde cannabis products with unique formulations and artistic packaging.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "sundrift",
    name: "Sundrift",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Hard candy specialists creating premium cannabis confections with natural flavors.",
    categories: ["edibles"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "camino",
    name: "Camino",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Journey-inspired cannabis gummies designed for specific experiences and adventures.",
    featured: true,
    categories: ["edibles"],
    founded: "2018",
    location: "California"
  },
  {
    id: "hi-color",
    name: "Hi Color",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "RSO-infused gummies with full-spectrum cannabis oil for maximum therapeutic benefit.",
    categories: ["edibles"],
    founded: "2020",
    location: "New York"
  },

  // BEVERAGE BRANDS
  {
    id: "green-revolution",
    name: "Green Revolution",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Revolutionary cannabis beverages and tinctures leading the industry in innovation.",
    featured: true,
    categories: ["beverages", "tinctures"],
    founded: "2017",
    location: "New York"
  },
  {
    id: "canna-cantina",
    name: "Canna Cantina",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Mexican-inspired cannabis beverages with authentic flavors and premium ingredients.",
    categories: ["beverages"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "moon-shot",
    name: "Moon Shot",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "High-potency cannabis drink shots for experienced consumers seeking powerful effects.",
    categories: ["beverages"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "high-peaks",
    name: "High Peaks",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Mountain-inspired cannabis beverages and flower with pure, clean ingredients.",
    featured: true,
    categories: ["beverages", "flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "aryloom",
    name: "Aryloom",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Craft cannabis beverages with unique flavor profiles and consistent dosing.",
    categories: ["beverages"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "weed-water",
    name: "Weed Water",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Simple, clean cannabis-infused water for hydration and wellness.",
    categories: ["beverages"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "ulta",
    name: "Ulta",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Ultra-premium cannabis beverages with sophisticated flavor profiles.",
    categories: ["beverages"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "dirty-lemonade",
    name: "Dirty Lemonade",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Cannabis-infused lemonades with a rebellious twist and bold flavors.",
    categories: ["beverages"],
    founded: "2019",
    location: "New York"
  },

  // TINCTURE BRANDS
  {
    id: "mfny",
    name: "MFNY",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Made For New York - premium cannabis tinctures and concentrates crafted for the NY market.",
    featured: true,
    categories: ["tinctures", "concentrates"],
    founded: "2021",
    location: "New York"
  },

  // TOPICAL BRANDS
  {
    id: "vireo",
    name: "Vireo",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Medical cannabis company specializing in therapeutic topicals and wellness products.",
    featured: true,
    categories: ["topicals"],
    founded: "2015",
    location: "New York"
  },

  // COOKING/INFUSION BRANDS
  {
    id: "chef-for-higher",
    name: "Chef for Higher",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Cannabis cooking oils and ingredients for culinary enthusiasts and professional chefs.",
    featured: true,
    categories: ["cooking"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "honey-pot",
    name: "Honey Pot",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Premium cannabis-infused honey sourced from local apiaries.",
    categories: ["cooking"],
    founded: "2020",
    location: "New York"
  },

  // CONCENTRATE BRANDS
  {
    id: "shine",
    name: "Shine",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Premium cannabis concentrates with exceptional clarity and potency.",
    featured: true,
    categories: ["concentrates"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "ithaca-organics",
    name: "Ithaca Organics",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Organic cannabis concentrates and flower from the Finger Lakes region.",
    featured: true,
    categories: ["concentrates"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "rhythm",
    name: "Rhythm",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Consistent, high-quality cannabis products with a focus on live concentrates and flower.",
    featured: true,
    categories: ["concentrates", "flowers"],
    founded: "2017",
    location: "Pennsylvania"
  },
  {
    id: "american-hash-makers",
    name: "American Hash Makers",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Traditional hash-making techniques combined with modern quality standards.",
    categories: ["concentrates"],
    founded: "2016",
    location: "New York"
  },
  {
    id: "house-of-sacci",
    name: "House of Sacci",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Artisanal cannabis products including premium hash, flower, and pre-rolls.",
    featured: true,
    categories: ["concentrates", "flowers", "pre-rolls"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "alchemy-pure",
    name: "Alchemy Pure",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Pure cannabis extracts and infused products using advanced extraction techniques.",
    featured: true,
    categories: ["concentrates", "pre-rolls"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "adonis",
    name: "Adonis",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Premium cannabis concentrates and hash with a focus on traditional methods.",
    categories: ["concentrates"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "jett",
    name: "Jett",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Innovative cannabis concentrate delivery systems including dablicators.",
    categories: ["concentrates"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "hudson-cannabis",
    name: "Hudson Cannabis",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Hudson Valley cannabis company specializing in premium concentrates and flower.",
    featured: true,
    categories: ["concentrates"],
    founded: "2021",
    location: "New York"
  },

  // PRE-ROLL BRANDS
  {
    id: "nx",
    name: "NX",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Next-generation cannabis pre-rolls with innovative strains and quality construction.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "dogwalkers",
    name: "Dogwalkers",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Premium pre-rolls perfect for your daily walks and outdoor adventures.",
    featured: true,
    categories: ["pre-rolls"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "flamer",
    name: "Flamer",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "High-quality indoor-grown cannabis pre-rolls with consistent burn and potency.",
    categories: ["pre-rolls"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "akron-bloom",
    name: "Akron Bloom",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Craft cannabis pre-rolls with a focus on terpene preservation and flavor.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "corcopia",
    name: "Corcopia",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Greenhouse-grown cannabis pre-rolls with sustainable cultivation practices.",
    categories: ["pre-rolls"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "cannacure",
    name: "Cannacure",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Medical-focused cannabis products including therapeutic pre-rolls and flower.",
    featured: true,
    categories: ["pre-rolls", "flowers"],
    founded: "2017",
    location: "New York"
  },
  {
    id: "nar",
    name: "Nar",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Artisanal cannabis pre-rolls with unique strain selections and quality craftsmanship.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "1937",
    name: "1937",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Classic cannabis products with a nod to prohibition-era quality and craftsmanship.",
    featured: true,
    categories: ["pre-rolls", "flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "hepworth",
    name: "Hepworth",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Sun-grown cannabis with sustainable farming practices and premium pre-rolls.",
    categories: ["pre-rolls", "flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "eaton-botanical",
    name: "Eaton Botanical",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Botanical approach to cannabis cultivation with premium pre-roll offerings.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "flo",
    name: "Flo",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Smooth-flowing cannabis pre-rolls with consistent quality and potency.",
    categories: ["pre-rolls"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "flower-house",
    name: "Flower House",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Premium cannabis flower and infused pre-rolls with artisanal quality.",
    featured: true,
    categories: ["pre-rolls", "flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "platinum-reserve",
    name: "Platinum Reserve",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Ultra-premium cannabis products including top-shelf flower and pre-rolls.",
    featured: true,
    categories: ["pre-rolls", "flowers"],
    founded: "2017",
    location: "New York"
  },
  {
    id: "hat-trick",
    name: "Hat Trick",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Triple-threat cannabis products with kief-infused pre-rolls and premium flower.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "honest-farms",
    name: "Honest Farms",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Honest, transparent cannabis cultivation with premium pre-rolls and flower.",
    categories: ["pre-rolls"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "puff",
    name: "Puff",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Distillate-infused pre-rolls for enhanced potency and consistent effects.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "packs",
    name: "Packs",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Liquid diamond-infused pre-rolls with burst flavor technology.",
    categories: ["pre-rolls"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "her-highness",
    name: "Her Highness",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Cannabis products designed by women, for women, including infused pre-rolls and ground flower.",
    featured: true,
    categories: ["pre-rolls", "flowers"],
    founded: "2019",
    location: "New York"
  },

  // FLOWER BRANDS
  {
    id: "rec-roots",
    name: "Rec Roots",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Recreational cannabis with deep roots in quality cultivation and community.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "byg-farms",
    name: "BYG Farms",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Indoor cannabis cultivation with a focus on yield and quality.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "good-greenz",
    name: "Good Greenz",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Good quality cannabis flower at accessible prices with indoor cultivation.",
    featured: true,
    categories: ["flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "dealer",
    name: "Dealer",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Sun-grown cannabis with old-school quality and modern standards.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "city-scrapers",
    name: "City Scrapers",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Urban cannabis cultivation with indoor-grown premium flower.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "matter",
    name: "Matter",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "What matters most - quality cannabis flower with consistent genetics.",
    categories: ["flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "botanist",
    name: "Botanist",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Scientific approach to cannabis cultivation with premium indoor flower.",
    featured: true,
    categories: ["flowers"],
    founded: "2017",
    location: "New York"
  },
  {
    id: "pines",
    name: "Pines",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Pine-fresh cannabis flower with terpene-rich indoor cultivation.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "toke-folks",
    name: "Toke Folks",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Community-focused cannabis with greenhouse-grown flower.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "golden-garden",
    name: "Golden Garden",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Golden standard cannabis flower with indoor cultivation excellence.",
    categories: ["flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "dank",
    name: "Dank",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Dank, potent cannabis flower with indoor growing expertise.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "tyson-20",
    name: "Tyson 2.0",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Mike Tyson's cannabis brand featuring knockout indoor-grown flower.",
    featured: true,
    categories: ["flowers"],
    founded: "2021",
    location: "California"
  },
  {
    id: "40-tons",
    name: "40 Tons",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Heavy-hitting cannabis flower with indoor cultivation and premium genetics.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "peaks",
    name: "Peaks",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Peak quality cannabis flower with indoor growing perfection.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "country-cannabis",
    name: "Country Cannabis",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Country-style cannabis with indoor cultivation and traditional values.",
    categories: ["flowers"],
    founded: "2018",
    location: "New York"
  },
  {
    id: "stay-melo",
    name: "Stay Melo",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Mellow cannabis flower with indoor growing and relaxing effects.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "tsa-approved",
    name: "TSA Approved",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Travel-friendly cannabis flower with indoor cultivation and premium quality.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "tarot-tokes",
    name: "Tarot Tokes",
    logo: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg",
    description: "Mystical cannabis flower with indoor growing and spiritual vibes.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "tical",
    name: "Tical",
    logo: "https://images.pexels.com/photos/7333889/pexels-photo-7333889.jpeg",
    description: "Method Man's cannabis brand with indoor-grown premium flower.",
    featured: true,
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },
  {
    id: "mary-jane-22",
    name: "Mary Jane 22",
    logo: "https://images.pexels.com/photos/7421182/pexels-photo-7421182.jpeg",
    description: "Classic cannabis flower with sun-grown cultivation and traditional methods.",
    categories: ["flowers"],
    founded: "2022",
    location: "New York"
  },
  {
    id: "stone-road",
    name: "Stone Road",
    logo: "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg",
    description: "Ground cannabis flower infused with kief, complete with rolling papers.",
    categories: ["flowers"],
    founded: "2019",
    location: "New York"
  },
  {
    id: "lobo",
    name: "Lobo",
    logo: "https://images.pexels.com/photos/5016007/pexels-photo-5016007.jpeg",
    description: "Wild cannabis flower with sun-grown cultivation and natural growing methods.",
    categories: ["flowers"],
    founded: "2020",
    location: "New York"
  },

  // CAPSULE BRANDS
  {
    id: "level",
    name: "Level",
    logo: "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg",
    description: "Precise cannabis capsules with consistent dosing and therapeutic effects.",
    categories: ["edibles"],
    founded: "2018",
    location: "California"
  }
];

export const getFeaturedBrands = (limit = 4) => {
  return brands
    .filter(brand => brand.featured)
    .slice(0, limit);
};

export const getBrandsByCategory = (category: string) => {
  return brands.filter(brand => 
    brand.categories?.includes(category)
  );
};

export const getBrandById = (id: string) => {
  return brands.find(brand => brand.id === id);
};
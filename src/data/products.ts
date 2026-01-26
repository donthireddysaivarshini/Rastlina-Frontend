// Product images
import monsteraImg from "@/assets/products/monstera.jpg";
import snakePlantImg from "@/assets/products/snake-plant.jpg";
import peaceLilyImg from "@/assets/products/peace-lily.jpg";
import pothosImg from "@/assets/products/pothos.jpg";
import zzPlantImg from "@/assets/products/zz-plant.jpg";
import arecaPalmImg from "@/assets/products/areca-palm.jpg";

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  careLevel: 'Very Easy' | 'Easy' | 'Moderate' | 'Expert';
  waterFrequency: string;
  light: string;
  petSafe: boolean;
  sizes: ProductSize[];
  colors: string[];
  image: string;
  description: string;
  inStock: boolean;
  featured: boolean;
  selfWatering?: boolean;
  onOffer?: boolean;
  type: 'plant' | 'pot' | 'seed' | 'care' | 'combo';
}

export const products: Product[] = [
  // --- EXISTING PLANTS ---
  {
    id: 'MON-001',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    category: ['living-room', 'clean-air', 'indoor'],
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.8,
    reviewCount: 89,
    careLevel: 'Easy',
    waterFrequency: 'Weekly',
    light: 'Bright Indirect',
    petSafe: false,
    sizes: [
      { label: 'Small (8-12")', price: 999 },
      { label: 'Medium (12-18")', price: 1999 },
      { label: 'Large (18-24")', price: 2999 },
      { label: 'XL (24"+)', price: 3999 },
    ],
    colors: ['Terracotta', 'White', 'Black', 'Sage', 'Gold'],
    image: monsteraImg,
    description: 'Large, glossy leaves perfect for modern spaces. Air-purifying and easy to care for.',
    inStock: true,
    featured: true,
    selfWatering: true,
    type: 'plant',
    onOffer: true,
  },
  {
    id: 'SNK-002',
    name: 'Snake Plant',
    slug: 'snake-plant',
    category: ['bedroom', 'office', 'clean-air', 'indoor'],
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    reviewCount: 156,
    careLevel: 'Very Easy',
    waterFrequency: 'Bi-weekly',
    light: 'Low to Bright',
    petSafe: false,
    sizes: [
      { label: 'Small (6-10")', price: 599 },
      { label: 'Medium (10-16")', price: 999 },
      { label: 'Large (16-24")', price: 1799 },
    ],
    colors: ['Terracotta', 'White', 'Black'],
    image: snakePlantImg,
    description: 'The ultimate beginner plant. Thrives on neglect and purifies air while you sleep.',
    inStock: true,
    featured: true,
    selfWatering: true,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'PCL-003',
    name: 'Peace Lily',
    slug: 'peace-lily',
    category: ['bedroom', 'living-room', 'clean-air', 'indoor', 'flowering'],
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.7,
    reviewCount: 203,
    careLevel: 'Easy',
    waterFrequency: 'Weekly',
    light: 'Low to Medium',
    petSafe: false,
    sizes: [
      { label: 'Small (8-12")', price: 799 },
      { label: 'Medium (12-18")', price: 1299 },
      { label: 'Large (18-24")', price: 1999 },
    ],
    colors: ['Terracotta', 'White', 'Black', 'Sage'],
    image: peaceLilyImg,
    description: 'Elegant white blooms and excellent air-purifying qualities. Perfect for bedrooms.',
    inStock: true,
    featured: true,
    selfWatering: true,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'PTH-004',
    name: 'Golden Pothos',
    slug: 'golden-pothos',
    category: ['office', 'living-room', 'clean-air', 'good-luck', 'indoor'],
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.8,
    reviewCount: 312,
    careLevel: 'Very Easy',
    waterFrequency: 'Weekly',
    light: 'Low to Bright',
    petSafe: false,
    sizes: [
      { label: 'Small (6-10")', price: 399 },
      { label: 'Medium (10-16")', price: 699 },
      { label: 'Large (16-24")', price: 1199 },
    ],
    colors: ['White', 'Terracotta', 'Black'],
    image: pothosImg,
    description: 'The money plant that brings prosperity. Nearly impossible to kill!',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: true,
  },
  {
    id: 'ZZ-005',
    name: 'ZZ Plant',
    slug: 'zz-plant',
    category: ['office', 'bedroom', 'clean-air', 'indoor'],
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.9,
    reviewCount: 178,
    careLevel: 'Very Easy',
    waterFrequency: 'Bi-weekly',
    light: 'Low to Medium',
    petSafe: false,
    sizes: [
      { label: 'Small (8-12")', price: 899 },
      { label: 'Medium (12-18")', price: 1499 },
      { label: 'Large (18-24")', price: 2299 },
    ],
    colors: ['Black', 'White', 'Sage'],
    image: zzPlantImg,
    description: 'Glossy, modern leaves that thrive in low light. Perfect for offices.',
    inStock: true,
    featured: true,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'ARC-006',
    name: 'Areca Palm',
    slug: 'areca-palm',
    category: ['living-room', 'balcony', 'clean-air', 'pet-friendly'],
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.6,
    reviewCount: 94,
    careLevel: 'Moderate',
    waterFrequency: 'Twice Weekly',
    light: 'Bright Indirect',
    petSafe: true,
    sizes: [
      { label: 'Medium (2-3 ft)', price: 2499 },
      { label: 'Large (3-4 ft)', price: 3499 },
      { label: 'XL (4-5 ft)', price: 4999 },
    ],
    colors: ['Terracotta', 'White', 'Rattan'],
    image: arecaPalmImg,
    description: 'Tropical vibes and excellent air humidifying. Pet-friendly!',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'RBR-007',
    name: 'Rubber Plant',
    slug: 'rubber-plant',
    category: ['living-room', 'office', 'indoor'],
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.7,
    reviewCount: 127,
    careLevel: 'Easy',
    waterFrequency: 'Weekly',
    light: 'Medium to Bright',
    petSafe: false,
    sizes: [
      { label: 'Small (10-14")', price: 999 },
      { label: 'Medium (14-20")', price: 1799 },
      { label: 'Large (20-30")', price: 2799 },
    ],
    colors: ['Terracotta', 'White', 'Black'],
    image: monsteraImg, // Placeholder
    description: 'Bold, glossy leaves that make a statement. Great for corners.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'JDE-008',
    name: 'Jade Plant',
    slug: 'jade-plant',
    category: ['office', 'balcony', 'good-luck', 'succulent'],
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.8,
    reviewCount: 245,
    careLevel: 'Easy',
    waterFrequency: 'Bi-weekly',
    light: 'Bright',
    petSafe: false,
    sizes: [
      { label: 'Small (4-6")', price: 499 },
      { label: 'Medium (6-10")', price: 899 },
      { label: 'Large (10-14")', price: 1499 },
    ],
    colors: ['Terracotta', 'White', 'Gold'],
    image: zzPlantImg, // Placeholder
    description: 'Symbol of prosperity and good fortune. Easy succulent care.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: true,
  },
  {
    id: 'LKB-009',
    name: 'Lucky Bamboo',
    slug: 'lucky-bamboo',
    category: ['office', 'good-luck', 'indoor', 'pet-friendly'],
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.6,
    reviewCount: 189,
    careLevel: 'Very Easy',
    waterFrequency: 'Weekly (water only)',
    light: 'Low to Medium',
    petSafe: true,
    sizes: [
      { label: '2 Stalks', price: 399 },
      { label: '3 Stalks (Happiness)', price: 599 },
      { label: '5 Stalks (Wealth)', price: 899 },
      { label: '7 Stalks (Health)', price: 1299 },
    ],
    colors: ['Glass', 'Ceramic White', 'Gold'],
    image: pothosImg, // Placeholder
    description: 'Feng shui favorite for luck and positive energy. Just add water!',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'ALV-010',
    name: 'Aloe Vera',
    slug: 'aloe-vera',
    category: ['balcony', 'office', 'succulent', 'indoor'],
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.7,
    reviewCount: 367,
    careLevel: 'Very Easy',
    waterFrequency: 'Bi-weekly',
    light: 'Bright',
    petSafe: false,
    sizes: [
      { label: 'Small (4-6")', price: 299 },
      { label: 'Medium (6-10")', price: 499 },
      { label: 'Large (10-14")', price: 799 },
    ],
    colors: ['Terracotta', 'White'],
    image: snakePlantImg, // Placeholder
    description: 'Medicinal succulent for burns and skincare. Hardy and beautiful.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: true,
  },
  {
    id: 'SPD-011',
    name: 'Spider Plant',
    slug: 'spider-plant',
    category: ['bedroom', 'living-room', 'clean-air', 'pet-friendly'],
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.8,
    reviewCount: 276,
    careLevel: 'Very Easy',
    waterFrequency: 'Weekly',
    light: 'Low to Bright',
    petSafe: true,
    sizes: [
      { label: 'Small (6-8")', price: 399 },
      { label: 'Medium (8-12")', price: 599 },
      { label: 'Large (12-16")', price: 899 },
    ],
    colors: ['White', 'Terracotta', 'Sage'],
    image: peaceLilyImg, // Placeholder
    description: 'Air-purifying champion that produces adorable baby plants!',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'FCS-012',
    name: 'Ficus Bonsai',
    slug: 'ficus-bonsai',
    category: ['office', 'living-room', 'indoor'],
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.5,
    reviewCount: 68,
    careLevel: 'Moderate',
    waterFrequency: 'Twice Weekly',
    light: 'Bright Indirect',
    petSafe: false,
    sizes: [
      { label: 'Small (6-8")', price: 1999 },
      { label: 'Medium (8-12")', price: 2999 },
      { label: 'Large (12-16")', price: 4999 },
    ],
    colors: ['Ceramic White', 'Black', 'Terracotta'],
    image: arecaPalmImg, // Placeholder
    description: 'Elegant miniature tree that brings zen to any space.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },

  // --- NEW PLANTS ---
  {
    id: 'BOP-013',
    name: 'Bird of Paradise',
    slug: 'bird-of-paradise',
    category: ['living-room', 'indoor', 'statement'],
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewCount: 45,
    careLevel: 'Moderate',
    waterFrequency: 'Weekly',
    light: 'Bright Direct',
    petSafe: false,
    sizes: [
      { label: 'Large (3-4 ft)', price: 3499 },
      { label: 'XL (5-6 ft)', price: 5499 },
    ],
    colors: ['White', 'Rattan'],
    image: arecaPalmImg, // Placeholder
    description: 'The queen of indoor plants. Bring the tropics to your home.',
    inStock: true,
    featured: true,
    type: 'plant',
    onOffer: false,
  },
  {
    id: 'CAL-014',
    name: 'Calathea Prayer',
    slug: 'calathea-prayer',
    category: ['bedroom', 'pet-friendly', 'indoor'],
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.4,
    reviewCount: 112,
    careLevel: 'Moderate',
    waterFrequency: 'Twice Weekly',
    light: 'Medium Indirect',
    petSafe: true,
    sizes: [
      { label: 'Medium (8-12")', price: 1199 },
    ],
    colors: ['Terracotta', 'Sage'],
    image: peaceLilyImg, // Placeholder
    description: 'Beautiful patterned leaves that fold up at night like prayer hands.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: true,
  },
  {
    id: 'SOP-015',
    name: 'String of Pearls',
    slug: 'string-of-pearls',
    category: ['living-room', 'hanging', 'succulent'],
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.7,
    reviewCount: 88,
    careLevel: 'Moderate',
    waterFrequency: 'Bi-weekly',
    light: 'Bright',
    petSafe: false,
    sizes: [
      { label: 'Hanging Pot (6")', price: 799 },
    ],
    colors: ['White Hanging', 'Terracotta'],
    image: pothosImg, // Placeholder
    description: 'Cascading succulent that looks like beads on a string. Unique and beautiful.',
    inStock: true,
    featured: false,
    type: 'plant',
    onOffer: false,
  },

  // --- POTS & PLANTERS ---
  {
    id: 'POT-001',
    name: 'Minimalist Ceramic Pot',
    slug: 'minimalist-ceramic-pot',
    category: ['pots', 'accessories'],
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.9,
    reviewCount: 150,
    careLevel: 'Very Easy',
    waterFrequency: 'N/A',
    light: 'N/A',
    petSafe: true,
    sizes: [
      { label: 'Small (6")', price: 499 },
      { label: 'Medium (8")', price: 799 },
      { label: 'Large (10")', price: 1199 },
    ],
    colors: ['White', 'Black', 'Sage', 'Terracotta'],
    image: snakePlantImg, // Placeholder
    description: 'Premium matte finish ceramic pot with drainage hole and saucer.',
    inStock: true,
    featured: false,
    type: 'pot',
    onOffer: true,
  },
  {
    id: 'POT-002',
    name: 'Terracotta Trio Set',
    slug: 'terracotta-trio',
    category: ['pots', 'accessories', 'bundles'],
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.8,
    reviewCount: 76,
    careLevel: 'Very Easy',
    waterFrequency: 'N/A',
    light: 'N/A',
    petSafe: true,
    sizes: [
      { label: 'Set of 3 (4", 6", 8")', price: 899 },
    ],
    colors: ['Terracotta'],
    image: monsteraImg, // Placeholder
    description: 'Classic breathable terracotta pots perfect for all plants. Set of 3.',
    inStock: true,
    featured: false,
    type: 'pot',
    onOffer: false,
  },

  // --- SEEDS ---
  {
    id: 'SED-001',
    name: 'Italian Basil Seeds',
    slug: 'basil-seeds',
    category: ['seeds', 'herbs', 'kitchen'],
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.9,
    reviewCount: 42,
    careLevel: 'Easy',
    waterFrequency: 'Daily',
    light: 'Bright',
    petSafe: true,
    sizes: [
      { label: 'Packet (50 seeds)', price: 149 },
    ],
    colors: ['Green'],
    image: monsteraImg, // Placeholder
    description: 'Grow your own aromatic basil for fresh pesto and garnish.',
    inStock: true,
    featured: false,
    type: 'seed',
    onOffer: false,
  },
  {
    id: 'SED-002',
    name: 'Cherry Tomato Seeds',
    slug: 'tomato-seeds',
    category: ['seeds', 'vegetables', 'kitchen'],
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.8,
    reviewCount: 35,
    careLevel: 'Moderate',
    waterFrequency: 'Daily',
    light: 'Bright Direct',
    petSafe: true,
    sizes: [
      { label: 'Packet (30 seeds)', price: 149 },
    ],
    colors: ['Red'],
    image: arecaPalmImg, // Placeholder
    description: 'Sweet and juicy cherry tomatoes you can grow on your balcony.',
    inStock: true,
    featured: false,
    type: 'seed',
    onOffer: true,
  },

  // --- PLANT CARE ---
  {
    id: 'CAR-001',
    name: 'Organic Liquid Fertilizer',
    slug: 'liquid-fertilizer',
    category: ['care', 'fertilizer'],
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.9,
    reviewCount: 210,
    careLevel: 'Very Easy',
    waterFrequency: 'N/A',
    light: 'N/A',
    petSafe: true,
    sizes: [
      { label: '250ml', price: 399 },
      { label: '500ml', price: 699 },
    ],
    colors: ['N/A'],
    image: snakePlantImg, // Placeholder
    description: 'Seaweed based organic nutrition boost for all indoor plants.',
    inStock: true,
    featured: true,
    type: 'care',
    onOffer: false,
  },
  {
    id: 'CAR-002',
    name: 'Premium Pruning Shears',
    slug: 'pruning-shears',
    category: ['care', 'tools'],
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.8,
    reviewCount: 98,
    careLevel: 'Very Easy',
    waterFrequency: 'N/A',
    light: 'N/A',
    petSafe: true,
    sizes: [
      { label: 'Standard', price: 599 },
    ],
    colors: ['Black'],
    image: zzPlantImg, // Placeholder
    description: 'Sharp, stainless steel shears for trimming and maintenance.',
    inStock: true,
    featured: false,
    type: 'care',
    onOffer: true,
  },

  // --- COMBOS ---
  {
    id: 'BND-001',
    name: 'The "Unkillable" Duo',
    slug: 'unkillable-duo',
    category: ['bundles', 'beginner', 'clean-air'],
    price: 1499,
    originalPrice: 2000,
    discount: 25,
    rating: 5.0,
    reviewCount: 42,
    careLevel: 'Very Easy',
    waterFrequency: 'Bi-weekly',
    light: 'Low',
    petSafe: false,
    sizes: [{ label: 'Standard', price: 1499 }],
    colors: ['Terracotta'],
    image: snakePlantImg,
    description: 'Snake Plant + ZZ Plant. The perfect starter pack for busy people.',
    inStock: true,
    featured: true,
    selfWatering: true,
    type: 'combo',
    onOffer: true,
  },
  {
    id: 'BND-002',
    name: 'Pet Friendly Pair',
    slug: 'pet-friendly-pair',
    category: ['bundles', 'pet-safe', 'indoor'],
    price: 1299,
    originalPrice: 1899,
    discount: 31,
    rating: 4.9,
    reviewCount: 28,
    careLevel: 'Easy',
    waterFrequency: 'Weekly',
    light: 'Medium',
    petSafe: true,
    sizes: [{ label: 'Standard', price: 1299 }],
    colors: ['White'],
    image: monsteraImg, 
    description: 'Spider Plant + Areca Palm. Safe for cats and dogs.',
    inStock: true,
    featured: true,
    selfWatering: true,
    type: 'combo',
    onOffer: true,
  },
];

// Helper Functions
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.includes(category));
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getSelfWateringProducts = (): Product[] => {
  return products.filter(product => product.selfWatering);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getBundles = (): Product[] => {
  return products.filter(product => product.type === 'combo');
};

export const getOfferProducts = (): Product[] => {
  return products.filter(product => product.onOffer);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
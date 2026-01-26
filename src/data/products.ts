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
}

export const products: Product[] = [
  {
    id: 'MON-001',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    category: ['bedroom', 'living-room', 'clean-air'],
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
  },
  {
    id: 'SNK-002',
    name: 'Snake Plant',
    slug: 'snake-plant',
    category: ['bedroom', 'office', 'clean-air'],
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
  },
  {
    id: 'PCL-003',
    name: 'Peace Lily',
    slug: 'peace-lily',
    category: ['bedroom', 'living-room', 'clean-air'],
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
  },
  {
    id: 'PTH-004',
    name: 'Golden Pothos',
    slug: 'golden-pothos',
    category: ['office', 'living-room', 'clean-air', 'good-luck'],
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
  },
  {
    id: 'ZZ-005',
    name: 'ZZ Plant',
    slug: 'zz-plant',
    category: ['office', 'bedroom', 'clean-air'],
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
  },
  {
    id: 'ARC-006',
    name: 'Areca Palm',
    slug: 'areca-palm',
    category: ['living-room', 'balcony', 'clean-air'],
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
  },
  {
    id: 'RBR-007',
    name: 'Rubber Plant',
    slug: 'rubber-plant',
    category: ['living-room', 'office'],
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
    image: monsteraImg,
    description: 'Bold, glossy leaves that make a statement. Great for corners.',
    inStock: true,
    featured: false,
  },
  {
    id: 'JDE-008',
    name: 'Jade Plant',
    slug: 'jade-plant',
    category: ['office', 'balcony', 'good-luck'],
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
    image: zzPlantImg,
    description: 'Symbol of prosperity and good fortune. Easy succulent care.',
    inStock: true,
    featured: false,
  },
  {
    id: 'LKB-009',
    name: 'Lucky Bamboo',
    slug: 'lucky-bamboo',
    category: ['office', 'good-luck'],
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
    image: pothosImg,
    description: 'Feng shui favorite for luck and positive energy. Just add water!',
    inStock: true,
    featured: false,
  },
  {
    id: 'ALV-010',
    name: 'Aloe Vera',
    slug: 'aloe-vera',
    category: ['balcony', 'office'],
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
    image: snakePlantImg,
    description: 'Medicinal succulent for burns and skincare. Hardy and beautiful.',
    inStock: true,
    featured: false,
  },
  {
    id: 'SPD-011',
    name: 'Spider Plant',
    slug: 'spider-plant',
    category: ['bedroom', 'living-room', 'clean-air'],
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
    image: peaceLilyImg,
    description: 'Air-purifying champion that produces adorable baby plants!',
    inStock: true,
    featured: false,
  },
  {
    id: 'FCS-012',
    name: 'Ficus Bonsai',
    slug: 'ficus-bonsai',
    category: ['office', 'living-room'],
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
    image: arecaPalmImg,
    description: 'Elegant miniature tree that brings zen to any space.',
    inStock: true,
    featured: false,
  },
];

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

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

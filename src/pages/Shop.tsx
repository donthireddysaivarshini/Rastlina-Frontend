import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/products/ProductCard';
import { products, getProductsByCategory } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import bedroomImg from '@/assets/category-bedroom.jpg';
import officeImg from '@/assets/category-office.jpg';
import livingImg from '@/assets/category-living.jpg';
import balconyImg from '@/assets/category-balcony.jpg';

const categoryData: Record<string, { title: string; description: string; image: string }> = {
  'bedroom-plants': {
    title: 'Plants That Help You Sleep Better',
    description: 'These air-purifying plants create a calming atmosphere perfect for restful sleep',
    image: bedroomImg,
  },
  'office-plants': {
    title: 'Plants That Boost Your Focus',
    description: 'Low-maintenance plants perfect for your workspace, proven to increase productivity',
    image: officeImg,
  },
  'clean-air-plants': {
    title: 'Plants That Help You Breathe Easy',
    description: 'NASA-recommended air-purifying plants for a healthier home environment',
    image: livingImg,
  },
  'good-luck-plants': {
    title: 'Plants That Attract Prosperity',
    description: 'Feng shui favorites and traditional good luck plants for positive energy',
    image: balconyImg,
  },
};

const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [careFilter, setCareFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categoryInfo = category ? categoryData[category] : null;

  const filteredProducts = useMemo(() => {
    let result = category 
      ? getProductsByCategory(category.replace('-plants', '')) 
      : products;

    // Apply care level filter
    if (careFilter !== 'all') {
      result = result.filter(p => p.careLevel === careFilter);
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-1000':
          result = result.filter(p => p.price < 1000);
          break;
        case '1000-2000':
          result = result.filter(p => p.price >= 1000 && p.price < 2000);
          break;
        case '2000-plus':
          result = result.filter(p => p.price >= 2000);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [category, sortBy, careFilter, priceFilter]);

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section (for category pages) */}
      {categoryInfo && (
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={categoryInfo.image} 
            alt={categoryInfo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="text-primary-foreground max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4"
              >
                {categoryInfo.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg opacity-90"
              >
                {categoryInfo.description}
              </motion.p>
            </div>
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <p className="text-sm text-muted-foreground">
          Home / Shop {category && `/ ${categoryInfo?.title || category}`}
        </p>
      </div>

      {/* Page Title (for main shop) */}
      {!categoryInfo && (
        <div className="container-custom pb-8">
          <h1 className="text-3xl md:text-4xl font-serif">All Plants</h1>
          <p className="text-muted-foreground mt-2">
            Browse our curated collection of {products.length} plants
          </p>
        </div>
      )}

      {/* Filter Bar */}
      <div className="container-custom pb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-muted rounded-xl p-4">
          <div className="flex flex-wrap gap-3">
            <Select value={careFilter} onValueChange={setCareFilter}>
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Care Level" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Very Easy">Very Easy</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                <SelectItem value="2000-plus">₹2,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-card">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container-custom pb-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No plants match your filters. Try adjusting them!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;

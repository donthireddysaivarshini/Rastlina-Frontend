import { Link } from 'react-router-dom';
import { Star, Droplets, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize.label, defaultColor, defaultSize.price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 discount-badge">
              {product.discount}% OFF
            </span>
          )}
          
          {/* Wishlist Button */}
          <button 
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button 
              variant="quickAdd" 
              className="w-full"
              onClick={handleQuickAdd}
            >
              Quick Add
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="rating">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Care Icons */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="care-icon">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              {product.careLevel}
            </span>
            <span className="care-icon">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              {product.waterFrequency}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="price-sale text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

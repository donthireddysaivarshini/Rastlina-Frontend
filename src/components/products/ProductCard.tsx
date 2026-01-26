import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
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
    // Safe check for sizes/colors to prevent crashes
    const defaultSize = product.sizes?.[0] || { label: 'Standard', price: product.price };
    const defaultColor = product.colors?.[0] || 'Standard';
    addToCart(product, defaultSize.label, defaultColor, defaultSize.price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      // PREMIUM CARD STYLE: White bg, subtle border, shadow on hover
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/product/${product.slug}`} className="block flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.onOffer && (
              <span className="bg-accent-gold text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide shadow-sm">
                Sale
              </span>
            )}
            {product.discount > 0 && !product.onOffer && (
              <span className="bg-accent-earth text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide shadow-sm">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button 
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-primary shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-serif text-lg text-foreground truncate group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="h-3.5 w-3.5 fill-accent-gold text-accent-gold" />
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button (Always Visible & Sturdy) */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button 
              onClick={handleQuickAdd}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-none h-10 rounded-lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
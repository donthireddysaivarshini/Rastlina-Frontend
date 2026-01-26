import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Droplets, Sun, Thermometer, Ruler, PawPrint, Check, Heart, Truck, ShieldCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductBySlug, formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [activeTab, setActiveTab] = useState<'care' | 'included' | 'reviews'>('care');

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-serif">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize.label, selectedColor, selectedSize.price);
    }
  };

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <p className="text-sm text-muted-foreground">
          Home / Shop / {product.name}
        </p>
      </div>

      {/* Product Section */}
      <section className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail strip would go here */}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-accent-gold">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-primary">
                {formatPrice(selectedSize?.price || product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="discount-badge">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedSize?.label === size.label
                        ? 'border-primary bg-sage-light'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="block text-sm font-medium">{size.label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {formatPrice(size.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Select Pot Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-sage-light'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button variant="cart" onClick={handleAddToCart}>
                Add to Cart - {formatPrice(selectedSize?.price || product.price)}
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Heart className="h-4 w-4" />
                Save for Later
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>30-day survival guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Detailed care guide included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-muted">
        <div className="container-custom py-12">
          {/* Tab Headers */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {[
              { id: 'care', label: 'Care Guide' },
              { id: 'included', label: "What's Included" },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-4 px-2 font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'care' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: Droplets, label: 'Watering', value: product.waterFrequency },
                { icon: Sun, label: 'Light', value: product.light },
                { icon: Thermometer, label: 'Temperature', value: '18-25°C' },
                { icon: Ruler, label: 'Growth', value: 'Moderate' },
                { icon: PawPrint, label: 'Pet Safe', value: product.petSafe ? 'Yes' : 'No' },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl p-4 text-center">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'included' && (
            <div className="max-w-md">
              <ul className="space-y-3">
                {[
                  `${product.name} plant`,
                  'Self-watering ceramic pot',
                  'Premium potting mix',
                  'Care instruction card',
                  '30-day survival guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-accent-gold">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">Priya S.</span>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="text-muted-foreground">
                    Absolutely love my new {product.name}! It arrived in perfect condition and the self-watering pot is a game changer. Already seeing new growth!
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
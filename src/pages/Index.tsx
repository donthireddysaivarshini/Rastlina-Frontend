import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Package, Truck, Star, Sprout, Droplets, Gift, Camera } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import bedroomImg from '@/assets/category-bedroom.jpg';
import officeImg from '@/assets/category-office.jpg';
import livingImg from '@/assets/category-living.jpg';
import balconyImg from '@/assets/category-balcony.jpg';
import { ProductCard } from '@/components/products/ProductCard';
import { getSelfWateringProducts, getFeaturedProducts } from '@/data/products';

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img 
        src={heroImage} 
        alt="Living room with Monstera plant" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/40 to-transparent" />
    </div>
    
    {/* Content */}
    <div className="relative z-10 container-custom text-center md:text-left md:max-w-2xl md:mr-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-accent-earth/85 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-primary-foreground"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
          Find Your Perfect<br />Plant Match
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
          Not sure where to start? Our 2-minute quiz finds plants that thrive in your space and lifestyle
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button variant="hero" asChild>
            <Link to="/quiz">Take the Quiz</Link>
          </Button>
          <Button variant="heroOutline" asChild>
            <Link to="/shop">Browse Plants</Link>
          </Button>
        </div>
      </motion.div>
    </div>
    
    {/* Scroll Indicator */}
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ArrowDown className="h-6 w-6" />
    </motion.div>
  </section>
);

// Social Proof Bar
const SocialProofBar = () => (
  <section className="bg-muted py-8 md:py-10">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: Sprout, label: '10,000+ Happy Homes' },
          { icon: Truck, label: 'Safe Delivery Guaranteed' },
          { icon: Star, label: '4.8★ from 2,000+ reviews' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-center gap-3 text-foreground"
          >
            <item.icon className="h-6 w-6 text-primary" />
            <span className="font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorks = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif text-center mb-12 md:mb-16"
      >
        Growing Together is Simple
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
        {[
          { 
            step: '01', 
            icon: '🔍', 
            title: 'Discover Your Match',
            desc: 'Take our quiz or browse by your space'
          },
          { 
            step: '02', 
            icon: '📦', 
            title: 'Delivered with Care',
            desc: 'Self-watering pots included. Free shipping'
          },
          { 
            step: '03', 
            icon: '🌱', 
            title: 'Thrive Together',
            desc: 'Follow simple care reminders & tips'
          },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center text-4xl mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-serif mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Shop by Outcome Section
const ShopByOutcome = () => {
  const categories = [
    { label: 'Sleep Better', image: bedroomImg, href: '/shop/bedroom-plants' },
    { label: 'Focus More', image: officeImg, href: '/shop/office-plants' },
    { label: 'Breathe Easy', image: livingImg, href: '/shop/clean-air-plants' },
    { label: 'Attract Luck', image: balconyImg, href: '/shop/good-luck-plants' },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-center mb-12"
        >
          What Do You Want to Feel?
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={cat.href}
                className="category-card group block relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img 
                  src={cat.image} 
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="category-card-overlay" />
                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-serif text-primary-foreground">
                    {cat.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section
const FeaturedProducts = () => {
  const products = getSelfWateringProducts().slice(0, 4);
  
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-sage-light rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-serif">Self-Watering Collection</h3>
              <p className="text-muted-foreground">Water once a week, thrives daily</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/shop">View All 12 Plants →</Link>
          </Button>
        </motion.div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Gifting Section
const GiftingSection = () => (
  <section className="section-padding bg-muted">
    <div className="container-custom">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif text-center mb-12"
      >
        Send Growth, Not Just Gifts
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 text-center shadow-soft"
        >
          <Gift className="h-12 w-12 text-accent-gold mx-auto mb-4" />
          <h3 className="text-xl font-serif mb-2">Personal Gifting</h3>
          <p className="text-muted-foreground mb-4">Beautiful plant gifts from ₹999</p>
          <Button asChild>
            <Link to="/gift">Shop Gifts</Link>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 text-center shadow-soft"
        >
          <Package className="h-12 w-12 text-accent-gold mx-auto mb-4" />
          <h3 className="text-xl font-serif mb-2">Corporate Bulk</h3>
          <p className="text-muted-foreground mb-4">Green up your office space</p>
          <Button variant="outline" asChild>
            <Link to="/contact">Get Quote</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

// Instagram Section
const InstagramSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-2">
          <Camera className="inline-block h-8 w-8 mr-2" />
          Share Your Plant Journey
        </h2>
        <p className="text-muted-foreground">#RasilinaGrows</p>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[bedroomImg, officeImg, livingImg, balconyImg, heroImage, bedroomImg].map((img, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/rasilina"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="aspect-square overflow-hidden rounded-lg group"
          >
            <img 
              src={img} 
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.a>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <a href="https://instagram.com/rasilina" target="_blank" rel="noopener noreferrer">
            Follow @rasilina →
          </a>
        </Button>
      </div>
    </div>
  </section>
);

// Main Index Page
const Index = () => {
  return (
    <main>
      <HeroSection />
      <SocialProofBar />
      <HowItWorks />
      <ShopByOutcome />
      <FeaturedProducts />
      <GiftingSection />
      <InstagramSection />
    </main>
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Star, Sprout, Truck, Smile, ChevronRight, HeartHandshake, Play, MessageCircle, 
  Droplets, Palette, ShieldCheck, Heart, BookOpen, Quote, Leaf
} from 'lucide-react';

// Images
import heroImage from '@/assets/hero-living-room.jpg';
import bedroomImg from '@/assets/category-bedroom.jpg';
import officeImg from '@/assets/category-office.jpg';
import livingImg from '@/assets/category-living.jpg';
import balconyImg from '@/assets/category-balcony.jpg';

// Mock Blog Images
import blog1 from '@/assets/category-living.jpg'; 
import blog2 from '@/assets/category-office.jpg';
import blog3 from '@/assets/category-balcony.jpg';

import { ProductCard } from '@/components/products/ProductCard';
import { getBundles, getOfferProducts, products, getSelfWateringProducts } from '@/data/products';

// --- 1. HERO SECTION ---
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: heroImage, link: "/shop" },
    { id: 2, image: balconyImg, link: "/shop?cat=outdoor" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden bg-white">
      <Link to={slides[currentSlide].link} className="block w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt="Hero Offer" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </AnimatePresence>
      </Link>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-300 rounded-full shadow-md ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// --- 2. SOCIAL PROOF ---
const SocialProof = () => (
  <div className="bg-white border-b border-gray-100 py-4">
    <div className="container-custom">
      <div className="grid grid-cols-3 divide-x divide-gray-100 md:divide-x-0 md:flex md:justify-center md:gap-16 items-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-center md:text-left px-1">
          <Smile className="h-5 w-5 md:h-6 md:w-6 text-primary mb-1 md:mb-0" />
          <div className="flex flex-col md:block">
            <span className="font-bold text-xs md:text-sm text-gray-900 block md:inline">10k+</span>
            <span className="text-[10px] md:text-sm text-gray-500 md:text-gray-800 md:ml-1">Happy Homes</span>
          </div>
        </div>
        <div className="hidden md:block w-px h-8 bg-gray-200" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-center md:text-left px-1">
          <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary mb-1 md:mb-0" />
          <div className="flex flex-col md:block">
            <span className="font-bold text-xs md:text-sm text-gray-900 block md:inline">Fast</span>
            <span className="text-[10px] md:text-sm text-gray-500 md:text-gray-800 md:ml-1">Safe Delivery</span>
          </div>
        </div>
        <div className="hidden md:block w-px h-8 bg-gray-200" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-center md:text-left px-1">
          <div className="flex justify-center mb-1 md:mb-0">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-accent-gold text-accent-gold" />)}
          </div>
          <div className="flex flex-col md:block">
            <span className="font-bold text-xs md:text-sm text-gray-900 block md:inline">4.8/5</span>
            <span className="text-[10px] md:text-sm text-gray-500 md:text-gray-800 md:ml-1">Reviews</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- 3. CATEGORIES ---
const CreativeCategories = () => {
  const categories = [
    { label: 'Indoor', image: bedroomImg, href: '/shop?cat=indoor' },
    { label: 'Air Purifying', image: livingImg, href: '/shop?cat=air-purifying' },
    { label: 'Flowering', image: balconyImg, href: '/shop?cat=flowering' },
    { label: 'Pet Safe', image: officeImg, href: '/shop?cat=pet-friendly' },
    { label: 'Low Light', image: heroImage, href: '/shop?cat=low-light' },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6 px-2">
           <h2 className="text-xl md:text-2xl font-serif text-primary">Explore by Category</h2>
           <Link to="/shop" className="text-sm font-medium text-accent-earth hover:text-primary flex items-center gap-1">
             View All <ChevronRight className="h-4 w-4" />
           </Link>
        </div>
        <div className="flex flex-nowrap justify-start md:justify-center overflow-x-auto gap-4 md:gap-12 pb-4 no-scrollbar px-4 snap-x">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.href} className="group flex flex-col items-center gap-2 flex-shrink-0 snap-start">
              <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-100 group-hover:border-accent-gold transition-all duration-300 p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                   <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <span className="text-[10px] md:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors text-center w-16 md:w-auto leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. FEELINGS ---
const ShopByFeeling = () => {
  const collections = [
    { label: 'Sleep Better', desc: 'Elevate your rest', image: bedroomImg, href: '/shop?collection=sleep' },
    { label: 'Focus More', desc: 'Boost productivity', image: officeImg, href: '/shop?collection=work' },
    { label: 'Breathe Easy', desc: 'Pure air plants', image: livingImg, href: '/shop?collection=air' },
    { label: 'Attract Luck', desc: 'Vastu vibes', image: balconyImg, href: '/shop?collection=vastu' },
  ];

  return (
    <section className="py-12 bg-secondary-custom">
      <div className="container-custom">
        <h2 className="text-3xl font-serif text-center text-accent-earth mb-3">Curate Your Atmosphere</h2>
        <p className="text-center text-gray-500 mb-8">Plants selected for specific moods</p>
        <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:pb-0 no-scrollbar snap-x px-4 md:px-0 -mx-4 md:mx-0">
          {collections.map((col, i) => (
            <Link key={i} to={col.href} className="min-w-[260px] md:min-w-0 snap-center group relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 shadow-md">
              <img src={col.image} alt={col.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 w-full p-5 text-white">
                <h3 className="text-xl font-serif mb-1">{col.label}</h3>
                <p className="text-xs text-white/80 mb-3">{col.desc}</p>
                <span className="text-xs uppercase tracking-widest font-bold border-b border-white pb-1">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 5. BEST SELLERS ---
const BestSellers = () => {
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-foreground">Best Sellers</h2>
            <Link to="/shop?sort=rating" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. SELF WATERING BANNER ---
const SelfWateringSection = () => {
  return (
    <section className="py-16 bg-secondary-custom">
      <div className="container-custom px-4 md:px-0">
        <Link to="/shop?collection=self-watering" className="block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <img 
            src="/self-watering-banner.png" 
            alt="Rastlina Self-Watering Planters - How it works" 
            className="w-full h-auto object-cover"
          />
        </Link>
      </div>
    </section>
  );
};

// --- 7. ESSENTIALS ---
const GardenEssentials = () => (
  <section className="py-16 bg-white border-t border-gray-100">
    <div className="container-custom">
      <h2 className="text-3xl md:text-4xl font-serif text-center text-accent-earth mb-12 uppercase tracking-wide">
        Complete Your Garden
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Premium Planters', desc: 'Ceramic, Terracotta & Stands', image: balconyImg, link: '/shop?type=pots' },
            { title: 'Organic Seeds', desc: 'Vegetables, Flowers & Herbs', image: livingImg, link: '/shop?type=seeds' },
            { title: 'Plant Care', desc: 'Soils, Fertilizers & Tools', image: officeImg, link: '/shop?type=care' }
          ].map((item, i) => (
            <Link key={i} to={item.link} className="group relative h-[300px] overflow-hidden rounded-xl shadow-md block">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
                    <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                    <p className="text-white/90 mb-6 font-light text-sm">{item.desc}</p>
                    <Button className="bg-white text-black hover:bg-gray-200 border-none px-6 py-2 rounded-full text-sm font-medium">
                      Shop Now
                    </Button>
                </div>
            </Link>
          ))}
      </div>
    </div>
  </section>
);

// --- 8. NEW ARRIVALS ---
const NewArrivals = () => {
  const newProducts = products.slice(0, 4);
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-serif text-foreground">Fresh Arrivals</h2>
            <Link to="/shop?sort=new" className="text-primary font-medium hover:underline flex items-center gap-1">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {newProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
};

// --- 8.1 NEW: WHY CHOOSE US (Positioned here as requested) ---
const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-primary">Why Choose Rastlina?</h2>
        </div>

        {/* Video Container - Rectangular Aspect Ratio (21:9) on All Screens */}
        <div className="w-full max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl aspect-[21/9] relative bg-black/5">
           <video 
             src="/rastlina-animation.mp4" 
             className="w-full h-full object-cover"
             autoPlay
             muted
             loop
             playsInline
             poster={livingImg} 
           />
        </div>

        {/* Features Grid - 2 per row on Mobile, 4 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
               <div className="w-12 h-12 md:w-16 md:h-16 mb-3 text-accent-earth">
                  <Droplets className="w-full h-full stroke-1" />
               </div>
               <h3 className="text-sm md:text-lg font-bold text-primary mb-1">Self Watering</h3>
               <p className="text-xs md:text-sm text-gray-600 hidden md:block">Designed for ease and elegance.</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
               <div className="w-12 h-12 md:w-16 md:h-16 mb-3 text-accent-earth">
                  <Palette className="w-full h-full stroke-1" />
               </div>
               <h3 className="text-sm md:text-lg font-bold text-primary mb-1">Aesthetic Designs</h3>
               <p className="text-xs md:text-sm text-gray-600 hidden md:block">Stylish planters to match interiors.</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
               <div className="w-12 h-12 md:w-16 md:h-16 mb-3 text-accent-earth">
                  <ShieldCheck className="w-full h-full stroke-1" />
               </div>
               <h3 className="text-sm md:text-lg font-bold text-primary mb-1">Innovative Care</h3>
               <p className="text-xs md:text-sm text-gray-600 hidden md:block">Expert tips and growing support.</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
               <div className="w-12 h-12 md:w-16 md:h-16 mb-3 text-accent-earth">
                  <Leaf className="w-full h-full stroke-1" />
               </div>
               <h3 className="text-sm md:text-lg font-bold text-primary mb-1">Healthy Plants</h3>
               <p className="text-xs md:text-sm text-gray-600 hidden md:block">Handpicked and nurtured.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

// --- 9. OFFERS SECTION ---
const OffersSection = () => {
  const offerProducts = getOfferProducts().slice(0, 4);
  if (offerProducts.length === 0) return null;

  return (
    <section className="py-16 bg-secondary-custom">
      <div className="container-custom">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Golden Deals</h2>
            <p className="text-gray-600">Exclusive offers just for you</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {offerProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
        <div className="text-center mt-12">
             <Link to="/shop?onOffer=true">
                <Button className="bg-accent-gold hover:opacity-90 text-white font-bold px-10 py-6 text-lg rounded-none shadow-md">
                  SHOP ALL DEALS
                </Button>
             </Link>
        </div>
      </div>
    </section>
  );
};

// --- 10. COMBOS (Updated: 2 per row Mobile) ---
const CombosSection = () => {
    const combos = getBundles().slice(0, 4);
    
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-serif text-foreground">Combos & Bundles</h2>
                    <Link to="/shop?type=combo" className="text-primary font-medium hover:underline flex items-center gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Updated Grid: grid-cols-2 on mobile */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12">
                    {combos.map((combo, i) => (
                        <div key={i} className="relative group cursor-pointer h-full">
                            <div className="absolute top-3 -right-3 w-full h-full border-2 border-primary/20 rounded-xl -z-10 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 hidden md:block" />
                            
                            <Link to={`/product/${combo.slug}`} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full">
                                <div className="w-full sm:w-1/2 relative aspect-square sm:aspect-auto">
                                    <img src={combo.image} className="w-full h-full object-cover" alt={combo.name} />
                                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full shadow-sm">
                                      BUNDLE SAVE
                                    </div>
                                </div>
                                
                                <div className="w-full sm:w-1/2 p-4 md:p-6 flex flex-col justify-center">
                                    <h3 className="text-sm md:text-xl font-serif mb-1 md:mb-2 text-accent-earth group-hover:text-primary transition-colors">{combo.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">{combo.description}</p>
                                    <div className="mt-auto">
                                      <div className="flex items-baseline gap-2 mb-2 md:mb-4">
                                        <span className="text-sm md:text-xl font-bold text-primary">₹{combo.price}</span>
                                        <span className="text-xs md:text-sm line-through text-gray-400">₹{combo.originalPrice}</span>
                                      </div>
                                      <Button className="w-full bg-primary hover:opacity-90 text-white h-8 md:h-10 text-xs md:text-sm">View Bundle</Button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- 11. OUR STORY ---
const OurStorySection = () => {
  return (
    <section className="py-20 bg-accent-earth/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent-gold rounded-2xl" />
              <img 
                src={officeImg} 
                alt="Our Story" 
                className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6 text-accent-earth">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-accent-earth mb-6">From Our Garden to Yours</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Rasilina wasn't built in a boardroom; it grew from a small balcony in Hyderabad. We started with a simple belief: 
                <span className="font-medium text-primary"> nature is not a luxury, it's a necessity.</span>
              </p>
              <p>
                Every plant you receive has been nurtured by hand, packed with care, and sent with a wish for your growth. We don't just sell plants; we help you build a sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 12. WATCH & BUY ---
const WatchAndBuy = () => (
  <section className="py-16 bg-primary text-white">
    <div className="container-custom">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h2 className="text-3xl md:text-4xl font-serif flex items-center gap-2">
                <Play className="fill-white h-6 w-6" /> Watch & Shop
            </h2>
            <p className="text-white/80 text-sm mt-2">See them in action. Click to buy.</p>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-4 md:pb-0 no-scrollbar snap-x px-4 md:px-0 -mx-4 md:mx-0">
        {[livingImg, officeImg, balconyImg, heroImage].map((img, i) => (
            <div key={i} className="min-w-[200px] md:min-w-0 snap-center aspect-[9/16] relative bg-black/20 rounded-xl overflow-hidden group cursor-pointer border border-white/10">
                <img src={img} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Video thumb" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="fill-white text-white h-5 w-5 ml-1" />
                    </div>
                </div>
                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">Featured</p>
                    <p className="text-[10px] text-white/90">Tap to Shop</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  </section>
);

// --- 13. TESTIMONIALS (Horizontal Scroll on Mobile) ---
const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Samriddhi G.",
      role: "Home Gardener",
      rating: 5,
      text: "Absolutely love the plant! It arrived healthy and brightens up my entire home.",
      image: "SG" 
    },
    {
      id: 2,
      name: "Rajiv D.",
      role: "Interior Designer",
      rating: 5,
      text: "Received a vibrant and well-packaged plant. It looks stunning in my living room.",
      image: "RD"
    },
    {
      id: 3,
      name: "Shridhar H.",
      role: "Plant Parent",
      rating: 5,
      text: "Amazing service! The plant arrived healthy and adds a lovely touch to my space.",
      image: "SH"
    }
  ];

  return (
    <section className="py-20 bg-secondary-custom/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-primary mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full" />
        </div>

        {/* Mobile: Horizontal Flex with Scroll. Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x gap-6 md:grid md:grid-cols-3 pb-6 md:pb-0 no-scrollbar px-4 md:px-0 -mx-4 md:mx-0">
          {reviews.map((review) => (
            <div key={review.id} className="min-w-[85%] md:min-w-0 snap-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:-translate-y-1 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-gray-100 fill-current" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-earth/10 text-accent-earth rounded-full flex items-center justify-center font-bold text-lg">
                  {review.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 14. BLOGS ---
const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "10 Best Indoor Vastu Plants for New Homes",
      excerpt: "Invite prosperity and positive energy with these specifically curated plants for your sanctuary.",
      image: blog1,
      date: "Oct 12, 2025",
      tag: "Vastu"
    },
    {
      id: 2,
      title: "Why Your Peace Lily Might Be Drooping",
      excerpt: "Understanding the signs of thirst vs. root rot. A comprehensive guide to keeping your lily happy.",
      image: blog2,
      date: "Sep 28, 2025",
      tag: "Plant Care"
    },
    {
      id: 3,
      title: "Styling Your Balcony with Vertical Gardens",
      excerpt: "Short on space? Here is how to create a lush green wall in small urban apartments.",
      image: blog3,
      date: "Sep 15, 2025",
      tag: "Decor"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex justify-center mb-12">
          <h2 className="text-3xl font-serif text-gray-900">Blogs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            // NOTE: Create a BlogDetail.tsx page and add route /blog/:id for these to work
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group cursor-pointer">
              <div className="relative aspect-[3/2] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                  {blog.tag}
                </div>
              </div>
              
              <div className="pr-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <BookOpen className="h-3 w-3" />
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                <span className="text-sm font-bold text-accent-earth underline decoration-transparent group-hover:decoration-accent-earth transition-all">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 15. GROWING SIMPLE ---
const GrowingSimple = () => (
    <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-custom">
            <h2 className="text-2xl font-serif text-center mb-8 text-primary">Growing Together is Simple</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="font-bold text-sm text-accent-earth">Pick</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[120px]">Choose your perfect plant match</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm text-accent-earth">Receive</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[120px]">Safe delivery to your doorstep</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Sprout className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm text-accent-earth">Grow</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[120px]">Watch it thrive with our tips</p>
                </div>
            </div>
        </div>
    </section>
);

// --- WHATSAPP BUTTON ---
const WhatsAppButton = () => {
  const phoneNumber = "919915473575"; 
  const message = "Hi Rastlina! I'm interested in your plants.";
  
  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#556B2F] hover:bg-[#3d4d21] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <SocialProof />
      <CreativeCategories />
      <ShopByFeeling />
      <BestSellers />
      <SelfWateringSection />
      
      <GardenEssentials />
      <NewArrivals />
      
      {/* 1. WHY CHOOSE US (Moved Between Fresh Arrivals and Offers) */}
      <WhyChooseUs />

      <OffersSection />
      <CombosSection />
      {/* <OurStorySection /> (Replaced by Why Choose Us) */}
      <WatchAndBuy />
      
      {/* 2. TESTIMONIALS */}
      <Testimonials />

      {/* 3. BLOGS */}
      <Blogs />

      <GrowingSimple />

      <WhatsAppButton />
    </main>
  );
};

export default Home;
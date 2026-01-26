import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA STRUCTURE ---
const navItems = [
  {
    label: 'Plants',
    type: 'dropdown', 
    href: '/shop',
    items: [
      { label: 'All Plants', href: '/shop' },
      { label: 'Indoor Plants', href: '/shop?cat=indoor' },
      { label: 'Air Purifying', href: '/shop?cat=air-purifying' },
      { label: 'Flowering', href: '/shop?cat=flowering' },
      { label: 'Pet Friendly', href: '/shop?cat=pet-friendly' },
    ]
  },
  {
    label: 'Planters',
    type: 'dropdown', 
    href: '/shop?type=pots',
    items: [
      { label: 'Ceramic Pots', href: '/shop?type=pots&mat=ceramic' },
      { label: 'Terracotta', href: '/shop?type=pots&mat=terracotta' },
      { label: 'Metal Stands', href: '/shop?type=pots&mat=metal' },
    ]
  },
  {
    label: 'Seeds',
    type: 'dropdown', 
    href: '/shop?type=seeds',
    items: [
      { label: 'Vegetable Seeds', href: '/shop?type=seeds&cat=veg' },
      { label: 'Flower Seeds', href: '/shop?type=seeds&cat=flower' },
      { label: 'Herb Seeds', href: '/shop?type=seeds&cat=herb' },
    ]
  },
  {
    label: 'Care',
    type: 'dropdown',
    href: '/shop?type=care',
    items: [
      { label: 'Fertilizers', href: '/shop?type=care&cat=food' },
      { label: 'Tools', href: '/shop?type=care&cat=tools' },
      { label: 'Soil Mix', href: '/shop?type=care&cat=soil' },
    ]
  },
  {
    label: 'Combos',
    type: 'link',
    href: '/shop?type=combo',
    highlight: 'text-accent-earth font-medium'
  },
  {
    label: 'Offers',
    type: 'link',
    href: '/shop?onOffer=true',
    highlight: 'text-accent-gold font-bold tracking-wide',
  },
  {
    label: 'Bulk',
    type: 'link',
    href: '/contact',
    icon: <Briefcase className="h-4 w-4 mr-1" />
  }
];

// --- ANNOUNCEMENT BAR COMPONENT ---
const TopBar = () => {
  const offers = [
    "🌿 Free Shipping on orders above ₹1999",
    "✨ Buy 2 Plants @ ₹699 - Use Code: GREEN2",
    "🏺 Flat 20% OFF on Ceramic Planters"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-accent-earth text-white py-2.5 overflow-hidden relative z-50">
      <div className="container-custom flex justify-center items-center">
        <p className="text-xs md:text-sm font-medium tracking-wide text-white text-center">
            {offers[index]}
        </p>
      </div>
    </div>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null); 
  const { openCart, totalItems } = useCart();

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 -ml-2 text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>

            {/* Logo - FROM PUBLIC FOLDER */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Rasilina" 
                className="h-16 md:h-24 w-auto object-contain" 
                onError={(e) => {
                    // Fallback in case logo.png is missing in public
                    e.currentTarget.style.display = 'none';
                    // You could add a text fallback here if needed
                }}
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => item.type === 'dropdown' && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 text-base transition-colors py-8 ${
                      item.highlight ? item.highlight : 'text-foreground hover:text-primary font-medium'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {item.type === 'dropdown' && (
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    )}
                  </Link>
                  
                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === item.label && item.items && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 pt-0 w-56 z-50"
                      >
                        <div className="bg-white shadow-xl border border-gray-100 p-2 rounded-b-lg">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-gray-50 transition-colors rounded-md"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={openCart} className="hover:bg-transparent">
                <div className="relative text-primary">
                  {/* Increased Cart Icon Size */}
                  <ShoppingBag className="h-8 w-8" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="md:hidden bg-white absolute top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 border-t border-gray-200 overflow-y-auto pb-32"
            >
              <nav className="container-custom py-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-gray-100 last:border-0">
                    <div 
                      className="flex items-center justify-between py-4"
                      onClick={() => {
                        if (item.type === 'dropdown') {
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <Link 
                        to={item.href}
                        className={`text-lg font-serif font-medium flex items-center gap-2 ${item.highlight || 'text-foreground'}`}
                      >
                        {item.icon} {item.label}
                      </Link>
                      {item.type === 'dropdown' && (
                        <ChevronDown className={`h-5 w-5 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </div>

                    {/* Mobile Accordion */}
                    <AnimatePresence>
                      {item.type === 'dropdown' && mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-gray-50 -mx-4 px-8"
                        >
                          <div className="py-2 flex flex-col gap-3 pb-6">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="text-base text-accent-earth hover:text-primary py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
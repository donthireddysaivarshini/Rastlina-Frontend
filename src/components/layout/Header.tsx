import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown, Briefcase, Search, User, LogIn } from 'lucide-react';
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
    highlight: 'text-accent-earth font-bold'
  },
  {
    label: 'Offers',
    type: 'link',
    href: '/shop?onOffer=true',
    highlight: 'text-accent-earth font-bold tracking-wide',
  },
  {
    label: 'Bulk',
    type: 'link',
    href: '/contact',
    icon: <Briefcase className="h-4 w-4 mr-1" />
  }
];

// --- ANNOUNCEMENT BAR ---
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
    <div className="bg-dark-olive text-white py-2.5 overflow-hidden relative z-50">
      <div className="container-custom flex justify-center items-center">
        <p className="text-xs md:text-sm font-medium tracking-wide text-white text-center truncate px-4">
            {offers[index]}
        </p>
      </div>
    </div>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { openCart, totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMobileSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 w-full">
        <div className="container-custom">
          
          {/* =========================================
              MOBILE HEADER (Compact)
             ========================================= */}
          <div className="lg:hidden h-20 relative flex items-center justify-between px-2">
            
            {/* Left: Menu Button */}
            <div className="flex items-center w-1/4">
              <button 
                className="p-2 -ml-2 text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-2/4">
                <img 
                  src="/logo.png" 
                  alt="Rasilina" 
                  className="h-10 w-auto object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </Link>

            {/* Right: Icons (REMOVED PROFILE, Tightened Spacing) */}
            <div className="flex items-center justify-end gap-0.5 w-1/4">
              {/* Search Icon */}
              <button 
                className="p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="h-6 w-6" />
              </button>
              
              {/* Cart Icon (Profile removed) */}
              <Button variant="ghost" size="icon" onClick={openCart} className="hover:bg-transparent p-0 relative h-10 w-10">
                <div className="relative text-primary">
                  <ShoppingBag className="!h-6 !w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* =========================================
              DESKTOP HEADER (Full)
             ========================================= */}
          <div className="hidden lg:flex items-center justify-between h-20 gap-4">
            <Link to="/" className="flex items-center flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Rasilina" 
                  className="h-16 w-auto object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </Link>

            <nav className="flex items-center gap-6 xl:gap-8 justify-center flex-1 px-4">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => item.type === 'dropdown' && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 text-sm xl:text-base transition-colors py-8 ${
                      item.highlight 
                        ? item.highlight 
                        : 'text-foreground hover:text-primary font-medium'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {item.type === 'dropdown' && (
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    )}
                  </Link>
                  
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

            <div className="flex items-center gap-4 flex-shrink-0">
              <form onSubmit={handleSearch} className="relative w-48 xl:w-64">
                <input 
                  type="text" 
                  placeholder="Search plants..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50/50"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </form>

              <Link to="/profile" className="text-foreground hover:text-primary transition-colors p-1">
                <User className="h-7 w-7" />
              </Link>

              <Button variant="ghost" size="icon" onClick={openCart} className="hover:bg-transparent p-0 relative h-12 w-12">
                <div className="relative text-primary">
                  <ShoppingBag className="!h-6 !w-6" />
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

        {/* MOBILE SEARCH BAR */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="container-custom py-4">
                <form onSubmit={handleSearch} className="relative">
                  <input 
                    type="text" 
                    placeholder="Search plants, seeds, pots..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU DRAWER (Updated with Profile Section) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="lg:hidden bg-white absolute top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 border-t border-gray-200 overflow-y-auto pb-32"
            >
              <div className="container-custom py-4">
                
                {/* --- NEW: PROFILE SECTION IN MENU --- */}
                <div 
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-primary/5 rounded-xl p-4 mb-6 flex items-center gap-4 cursor-pointer active:bg-primary/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-base">My Account</h3>
                    <p className="text-xs text-gray-500">Login / Sign Up</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 -rotate-90" />
                </div>
                {/* ------------------------------------ */}

                <nav className="flex flex-col gap-2">
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
                          className={`text-lg font-serif font-medium flex items-center gap-2 ${
                              item.highlight ? 'text-accent-earth font-bold' : 'text-foreground'
                          }`}
                        >
                          {item.icon} {item.label}
                        </Link>
                        {item.type === 'dropdown' && (
                          <ChevronDown className={`h-5 w-5 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                        )}
                      </div>

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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
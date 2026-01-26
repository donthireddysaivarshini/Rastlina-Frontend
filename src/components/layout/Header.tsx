import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    label: 'Find Your Match',
    href: '/quiz',
    dropdown: [
      { label: 'Quick Quiz', href: '/quiz' },
      { label: 'By Your Space', href: '/shop/living-room-plants' },
      { label: 'By Benefit', href: '/shop/clean-air-plants' },
      { label: 'By Time You Have', href: '/shop' },
    ],
  },
  {
    label: 'Shop',
    href: '/shop',
    dropdown: [
      { label: 'All Plants', href: '/shop' },
      { label: 'Best Sellers', href: '/shop' },
      { label: 'Self-Watering Sets', href: '/shop' },
      { label: 'Care Essentials', href: '/shop' },
      { label: 'Offers', href: '/shop' },
    ],
  },
  {
    label: 'Learn',
    href: '/learn',
    dropdown: [
      { label: 'Plant Care 101', href: '/learn' },
      { label: 'Video Library', href: '/learn' },
      { label: 'Common Issues', href: '/learn' },
      { label: 'Blog', href: '/learn' },
    ],
  },
  {
    label: 'Gift',
    href: '/gift',
    dropdown: [
      { label: 'For Home', href: '/gift' },
      { label: 'For Office', href: '/gift' },
      { label: 'Corporate Bulk', href: '/contact' },
    ],
  },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { openCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Rasilina" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" 
                    style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </Link>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2 z-50"
                    >
                      <div className="bg-card rounded-lg shadow-medium border border-border py-2 min-w-[200px]">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.label}
                            to={dropItem.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <nav className="container-custom py-4">
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  <Link
                    to={item.href}
                    className="block py-2 text-base font-medium text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <div className="pl-4 border-l-2 border-border">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.label}
                        to={dropItem.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

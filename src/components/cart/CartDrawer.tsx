import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { isOpen, closeCart, items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-serif font-semibold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Cart
                {totalItems > 0 && (
                  <span className="text-sm font-sans font-normal text-muted-foreground">
                    ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
              <button 
                onClick={closeCart} 
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-sage-light flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Start adding some plants to brighten your space!
                  </p>
                  <Button onClick={closeCart} asChild>
                    <Link to="/shop">Browse Plants</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedSize} • {item.selectedColor}
                        </p>
                        <p className="font-semibold text-primary mt-1">
                          {formatPrice(item.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.selectedSize, 
                                item.selectedColor, 
                                item.quantity - 1
                              )}
                              className="p-1 hover:bg-card rounded transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.selectedSize, 
                                item.selectedColor, 
                                item.quantity + 1
                              )}
                              className="p-1 hover:bg-card rounded transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(
                              item.product.id, 
                              item.selectedSize, 
                              item.selectedColor
                            )}
                            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-primary">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
                  </div>
                </div>
                
                <Button variant="cart" asChild className="mb-3">
                  <Link to="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <button 
                  onClick={closeCart}
                  className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
                
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" />
                  Secure Checkout • SSL Encrypted
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

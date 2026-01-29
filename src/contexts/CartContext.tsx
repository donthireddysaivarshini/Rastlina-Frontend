import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, size: string, color: string, price: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: string, color: string, price: number) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color, price }];
    });
    // REMOVED: setIsOpen(true); -> Now it won't auto-open
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    
    setItems(prev => prev.map(item => 
      item.product.id === productId && item.selectedSize === size && item.selectedColor === color
        ? { ...item, quantity }
        : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      totalItems,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  name: string;
  option: string;
  price: number;
  quantity: number;
  sabor?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (option: string) => void;
  updateQuantity: (option: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const key = item.sabor ? `${item.option}::${item.sabor}` : item.option;
    setItems((prev) => {
      const existing = prev.find((i) => {
        const iKey = i.sabor ? `${i.option}::${i.sabor}` : i.option;
        return iKey === key;
      });
      if (existing) {
        return prev.map((i) => {
          const iKey = i.sabor ? `${i.option}::${i.sabor}` : i.option;
          return iKey === key ? { ...i, quantity: i.quantity + 1 } : i;
        });
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const getKey = (i: CartItem) => (i.sabor ? `${i.option}::${i.sabor}` : i.option);

  const removeItem = useCallback((option: string) => {
    setItems((prev) => prev.filter((i) => getKey(i) !== option));
  }, []);

  const updateQuantity = useCallback((option: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => getKey(i) !== option));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (getKey(i) === option ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

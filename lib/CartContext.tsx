"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { usePersistentState } from "./usePersistentState";

const CART_STORAGE_KEY = "coffeebliss-cart";

/** Stable reference so the persisted-state hook is not handed a new array each render. */
const EMPTY_CART: CartItem[] = [];

export interface CartItem {
  cartId: string; // unique per cart line (itemId + options combo)
  itemId: string;
  size: string;
  milk: string;
  sugar: string;
  extras: string[];
  quantity: number;
  /** Price for one unit, in paise. See lib/currency.ts. */
  unitPricePaise: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId" | "quantity">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPricePaise: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function buildCartId(item: Omit<CartItem, "cartId" | "quantity">): string {
  return `${item.itemId}-${item.size}-${item.milk}-${item.sugar}-${item.extras.sort().join(",")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Persisted so a refresh or an accidental tab close does not empty the cart.
  //
  // Note that each line stores the price it was added at. That is correct for
  // display, but it means a stale cart can disagree with the current menu — the
  // server must reprice every line at checkout rather than trusting these values.
  const [items, setItems] = usePersistentState<CartItem[]>(CART_STORAGE_KEY, EMPTY_CART);

  // Deliberately not persisted: reopening the drawer on every page load is noise.
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((newItem: Omit<CartItem, "cartId" | "quantity">) => {
    const cartId = buildCartId(newItem);
    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, cartId, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, [setItems]);

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, [setItems]);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
      );
    }
  }, [setItems]);

  const clearCart = useCallback(() => setItems(EMPTY_CART), [setItems]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  // Integer paise throughout — no rounding step, because nothing is ever fractional.
  const totalPricePaise = items.reduce((sum, i) => sum + i.unitPricePaise * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPricePaise, isCartOpen, setIsCartOpen }}
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

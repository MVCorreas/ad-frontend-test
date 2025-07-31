"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Game } from "@/services/gamesService";

interface CartContextType {
  items: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Game[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    Promise.resolve()
      .then(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
          return JSON.parse(savedCart);
        }
        return [];
      })
      .then((parsedCart) => {
        setItems(parsedCart);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error parsing cart from localStorage:", error);
        setItems([]);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    // Only run on client side and after initial load
    if (typeof window === 'undefined' || !isLoaded) return;

    Promise.resolve()
      .then(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
      })
      .catch((error) => {
        console.error("Error saving cart to localStorage:", error);
      });
  }, [items, isLoaded]);

  const addToCart = (game: Game) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === game.id);

      if (!existingItem) {
        return [...prevItems, game];
      }
      return prevItems; // Don't add duplicates
    });
  };

  const removeFromCart = (gameId: string) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== gameId);
    });
  };

  const getTotalItems = () => {
    return items.length;
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

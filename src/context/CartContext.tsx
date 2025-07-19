"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Game } from "@/utils/endpoint";

interface CartItem {
  game: Game;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!isLoaded) return;

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
      const existingItem = prevItems.find((item) => item.game.id === game.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (gameId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.game.id !== gameId)
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.game.price * item.quantity,
      0
    );
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

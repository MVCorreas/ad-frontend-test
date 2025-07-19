"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Game } from "@/utils/endpoint";

interface CartItem {
  game: Game;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (game: Game, quantity?: number) => void;
  removeFromCart: (gameId: string, removeAll?: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
    if (!isLoaded) return;

    Promise.resolve()
      .then(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
      })
      .catch((error) => {
        console.error("Error saving cart to localStorage:", error);
      });
  }, [items, isLoaded]);

  const addToCart = (game: Game, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.game.id === game.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { game, quantity }];
      }
    });
  };

  const removeFromCart = (gameId: string, removeAll: boolean = false) => {
    setItems((prevItems) => {
      if (removeAll) {
        return prevItems.filter((item) => item.game.id !== gameId);
      } else {
        return prevItems
          .map((item) => {
            if (item.game.id === gameId) {
              const newQuantity = item.quantity - 1;
              return newQuantity > 0
                ? { ...item, quantity: newQuantity }
                : null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);
      }
    });
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

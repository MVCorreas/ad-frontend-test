"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function CartHeader() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = (): Promise<any[]> => {
      return Promise.resolve().then(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          return JSON.parse(cartItems);
        } else {
          return [];
        }
      });
    };

    fetchCartItems()
      .then((items) => {
        setCartItemCount(items.length);
      })
      .catch((error) => {
        console.error("Error parsing cart items:", error);
        setCartItemCount(0);
      });
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/">
        <h3 className="flex items-center text-sm font-medium text-gray-900">
          <FiArrowLeft className="mr-2 h-5 w-5 text-colour-primary" />
          Back to Catalog
        </h3>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-colour-primary">Your Cart</h1>
          <h2 className="text-lg text-colour-primary mt-2">
            {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
          </h2>
        </div>
      </div>
    </div>
  );
}

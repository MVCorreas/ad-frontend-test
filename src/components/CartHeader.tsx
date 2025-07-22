"use client";

import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartHeader() {
  const { getTotalItems } = useCart();
  const totalCartItems = getTotalItems();
  
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
            {totalCartItems} {totalCartItems === 1 ? "item" : "items"}
          </h2>
        </div>
      </div>
    </div>
  );
}

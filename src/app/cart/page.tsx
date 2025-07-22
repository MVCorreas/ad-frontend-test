"use client";

import CartHeader from "../../components/CartHeader";
import CartGrid from "../../components/CartGrid";
import OrderSummary from "../../components/OrderSummary";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items: cartItems } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <CartHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500">Add some games to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <CartGrid />
            </div>
            <div className="lg:col-span-2">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

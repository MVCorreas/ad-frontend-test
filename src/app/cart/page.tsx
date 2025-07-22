"use client";

import CartHeader from "../../components/CartHeader";
import CartGrid from "../../components/CartGrid";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <div className="min-h-screen bg-white">
      <CartHeader />
      <CartGrid />
    </div>
  );
}

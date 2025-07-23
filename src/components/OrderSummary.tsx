"use client";

import { useCart } from "@/context/CartContext";
import Button from "./Button";

export default function OrderSummary() {
  const { items: cartItems, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
        <p className="text-sm text-gray-600 mb-6">{getTotalItems()} items</p>

        <div className="space-y-3 mb-6">
          {cartItems.map((game) => (
            <div key={game.id} className="flex justify-between text-sm">
              <span className="text-gray-600" data-test="cart-game-name">{game.name}</span>
              <span className="text-gray-900" data-test="cart-game-price">${game.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4" data-test="order-total">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900" >
              Order Total
            </span>
            <span className="text-base font-semibold text-gray-900">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button
          text="Checkout"
          onClick={() => console.log("Checkout in process...")}
          variant="secondary"
          size="big"
        />
      </div>
    </div>
  );
}

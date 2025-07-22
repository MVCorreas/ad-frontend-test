"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartGridProps {
  onCartUpdate?: () => void;
}

export default function CartGrid({ onCartUpdate }: CartGridProps) {
  const { items: cartItems, removeFromCart: removeFromCartContext } = useCart();

  const handleRemoveFromCart = (gameId: string) => {
    removeFromCartContext(gameId);
    onCartUpdate?.();
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500">Add some games to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 bg-white p-6">
          {cartItems.map((game, index) => (
            <div key={game.id}>
              <div className="flex items-start space-x-4 py-6">
                <div className="flex-shrink-0">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        {game.genre}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {game.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {game.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(game.id)}
                      className="text-gray-400 hover:text-gray-500 text-xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <p className="text-lg font-semibold text-gray-900">
                      ${game.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              {index < cartItems.length - 1 && (
                <div className="border-t border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

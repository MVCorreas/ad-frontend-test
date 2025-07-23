"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartGrid() {
  const { items: cartItems, removeFromCart } = useCart();

  const handleRemoveGame = (gameId: string) => {
    removeFromCart(gameId);
  };

  return (
    <div className="bg-white p-6">
      {cartItems.map((game, index) => (
        <div key={game.id} className="mb-8 sm:mb-4 lg:mb-0 relative">
          <button
            onClick={() => handleRemoveGame(game.id)}
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-800 text-xl w-6 h-6 rounded-full items-center justify-center shadow-sm z-10 hidden sm:flex"
          >
            ×
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 py-6">
            <div className="flex-shrink-0 mb-4 sm:mb-0 relative">
              <Image
                src={game.image}
                alt={game.name}
                width={200}
                height={120}
                className="object-fit w-full sm:w-[200px] h-[180px]"
              />
              <button
                onClick={() => handleRemoveGame(game.id)}
                className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-800 text-xl w-6 h-6 rounded-full flex items-center justify-center shadow-sm sm:hidden"
              >
                ×
              </button>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between sm:h-[120px]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-colour-tertiary font-bold uppercase tracking-wide mb-1">
                    {game.genre}
                  </p>
                  <h3 className="text-lg font-semibold text-colour-primary mb-2">
                    {game.name}
                  </h3>
                  <p className="text-sm text-colour-tertiary mb-4">
                    {game.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <p className="text-lg font-semibold text-colour-primary">
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
  );
}

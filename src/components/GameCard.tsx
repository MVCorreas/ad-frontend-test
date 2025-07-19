"use client";

import Image from "next/image";
import { Game } from "@/utils/endpoint";
import { useCart } from "@/context/CartContext";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart } = useCart();
  const { removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(game);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(game.id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      <div className="relative">
        <Image
          src={game.image}
          alt={game.name}
          width={280}
          height={160}
          className="w-full h-40 object-cover"
        />
        {game.isNew && (
          <span className="absolute top-3 left-3 bg-stone-100 text-colour-primary px-2 py-1 text-xs font-sm rounded">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-colour-tertiary text-xs mb-3 uppercase tracking-wide">
          {game.genre}
        </p>

        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-base text-colour-primary flex-1 mr-2">
            {game.name}
          </h3>
          <span className="text-lg font-bold text-colour-primary whitespace-nowrap">
            ${game.price}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

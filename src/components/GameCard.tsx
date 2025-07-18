'use client';

import Image from 'next/image';
import { Game } from '@/utils/endpoint';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', game.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={game.image}
          alt={game.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {game.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            New
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{game.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{game.description}</p>
        <p className="text-gray-500 text-sm mb-3 font-medium">{game.genre}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">
            ${game.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

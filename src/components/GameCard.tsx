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
          <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
            New
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide">{game.genre}</p>
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-base text-gray-900 flex-1 mr-2">{game.name}</h3>
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
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

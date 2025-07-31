"use client";

import Image from "next/image";
import { Game } from "@/services/gamesService";
import { useCart } from "@/context/CartContext";
import Button from "./Button";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart, removeFromCart, items: cartItems } = useCart();

  const isGameInCart = cartItems.some((cartItem) => cartItem.id === game.id);

  const toggleCartItem = () => {
    if (isGameInCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  const buttonText = isGameInCart ? "REMOVE" : "ADD TO CART";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300 p-2 flex flex-col h-full" data-test="game-card">
      <div className="relative p-3">
        <Image
          src={game.image}
          alt={game.name}
          width={332}
          height={240}
          className="w-full h-60 object-cover rounded-t-2xl rounded-b-none"
        />
        {game.isNew && (
          <span className="absolute top-5 left-5 bg-stone-100 text-colour-primary w-14 h-8 flex items-center justify-center text-base font-normal leading-4 tracking-wider text-center rounded-md py-2 px-3 font-archivo" data-test="new-label">
            NEW
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-colour-tertiary text-xs font-bold mb-3 uppercase tracking-wide" data-test="game-genre">
          {game.genre}
        </p>

        <div className="flex justify-between items-start mb-4 flex-1 gap-8">
          <h3 className="font-semibold text-sm text-colour-primary flex-1 mr-2" data-test="game-name">
            {game.name}
          </h3>
          <span className="font-semibold text-sm text-colour-primary whitespace-nowrap" data-test="game-price" >
            ${game.price}
          </span>
        </div>

        <Button
          text={buttonText}
          onClick={toggleCartItem}
          variant="primary"
          size="big"
        />
      </div>
    </div>
  );
}

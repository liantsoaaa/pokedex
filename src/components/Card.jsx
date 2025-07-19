import React from 'react';

const Card = ({ pokemon }) => {
  if (!pokemon) return null;

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  return (
    <div className="p-4 h-full flex flex-col justify-between bg-white/10 rounded-xl relative">
      <div className="flex justify-center items-center h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-full max-w-[160px] h-auto object-contain"
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-white/20 rounded-full">
            <span className="text-white text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="absolute top-3 left-0 right-0">
        <div className="bg-black/40 rounded-r-full py-1 px-4 inline-block max-w-[80%]">
          <h2 className="text-lg font-bold text-white capitalize truncate">
            {pokemon.name}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-3 right-0">
        <div className="bg-black/40 rounded-l-full py-1 px-4 inline-block">
          <span className="text-white font-medium text-sm">
            {formattedId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
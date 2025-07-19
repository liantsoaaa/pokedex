import React from 'react';
import Card from './Card';

const PokemonList = ({ pokemonList, onClose }) => {
  if (!pokemonList || pokemonList.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tous les Pokémon</h2>
            <button
              onClick={onClose}
              className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => (
              <div key={pokemon.id} className="bg-gray-100 rounded-xl p-4 h-64 relative">
                <Card pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
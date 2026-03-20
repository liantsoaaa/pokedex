const typeColors = {
  normal: "bg-gradient-to-br from-gray-300 to-gray-400",
  fire: "bg-gradient-to-br from-red-400 to-red-600",
  water: "bg-gradient-to-br from-blue-400 to-blue-600",
  electric: "bg-gradient-to-br from-yellow-300 to-yellow-500",
  grass: "bg-gradient-to-br from-green-400 to-emerald-600",
  ice: "bg-gradient-to-br from-blue-200 to-cyan-400",
  fighting: "bg-gradient-to-br from-red-600 to-red-800",
  poison: "bg-gradient-to-br from-purple-500 to-purple-700",
  ground: "bg-gradient-to-br from-yellow-600 to-amber-800",
  flying: "bg-gradient-to-br from-indigo-300 to-indigo-500",
  psychic: "bg-gradient-to-br from-pink-400 to-pink-600",
  bug: "bg-gradient-to-br from-lime-400 to-lime-600",
  rock: "bg-gradient-to-br from-yellow-700 to-yellow-900",
  ghost: "bg-gradient-to-br from-indigo-700 to-indigo-900",
  dragon: "bg-gradient-to-br from-purple-700 to-blue-900",
  dark: "bg-gradient-to-br from-gray-700 to-gray-900",
  steel: "bg-gradient-to-br from-gray-400 to-gray-600",
  fairy: "bg-gradient-to-br from-pink-300 to-pink-500",
};

export function CustomPokemonCard({ pokemon, onDelete }) {
  const primaryType = pokemon.types[0] || "normal";
  const bgColor = typeColors[primaryType] || typeColors.normal;

  return (
    <div className={`${bgColor} rounded-xl overflow-hidden shadow-lg w-full max-w-[200px] h-72 relative`}>

      <span className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
        Custom
      </span>

      <button
        onClick={() => onDelete(pokemon.id)}
        className="absolute top-1 right-2 text-white/70 hover:text-white text-lg z-10"
        title="Supprimer"
      >
        Delete
      </button>

      <div className="p-4 h-full flex flex-col justify-between bg-white/10 rounded-xl">

        <div className="flex justify-center items-center h-full mt-4">
          {pokemon.imageUrl ? (
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="w-full max-w-[120px] h-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full">
              <span className="text-4xl">❓</span>
            </div>
          )}
        </div>

        <div className="absolute top-8 left-0 right-0">
          <div className="bg-black/40 rounded-r-full py-1 px-4 inline-block max-w-[80%]">
            <h2 className="text-lg font-bold text-white capitalize truncate">
              {pokemon.name}
            </h2>
          </div>
        </div>

        <div className="absolute bottom-3 right-0">
          <div className="bg-black/40 rounded-l-full py-1 px-4 inline-block">
            <span className="text-white font-medium text-sm">PV: {pokemon.hp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaExchangeAlt } from "react-icons/fa";
import Card from "./Card";
import PokemonList from "./PokemonList.jsx"; 
import { fetchPokemonList, fetchPokemonData } from "../utils/function.js";

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

function Home() {
    const [originalPokemonData, setOriginalPokemonData] = useState([]);
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showListModal, setShowListModal] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const list = await fetchPokemonList("https://pokeapi.co/api/v2/pokemon?limit=50");
                const dataPromises = list.map(pokemon => fetchPokemonData(pokemon.url));
                const allData = await Promise.all(dataPromises);
                setOriginalPokemonData(allData);
                setFilteredPokemonData(allData);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setFilteredPokemonData(originalPokemonData);
            return;
        }

        const filtered = originalPokemonData.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemonData(filtered);
    };

    const resetSearch = () => {
        setSearchQuery("");
        setFilteredPokemonData(originalPokemonData);
    };

    const handleCardClick = (id) => {
        navigate(`/pokemon/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokédex</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Découvrez et collectionnez tous les Pokémon dans votre Pokédex numérique
                    </p>
                </header>

                <div className="flex items-center mb-8">
                    <form onSubmit={handleSearch} className="flex-grow">
                        <div className="flex items-center bg-gray-200 rounded-full shadow-md overflow-hidden">
                            <div className="pl-4 pr-2 text-gray-600">
                                <FaSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un Pokémon..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3 px-2 focus:outline-none bg-transparent text-gray-700"
                            />
                        </div>
                    </form>

                    <button
                        type="button"
                        onClick={resetSearch}
                        className="ml-1 bg-gray-700 hover:bg-gray-800 p-3 flex items-center justify-center transition-colors w-12 h-12 rounded-lg"
                    >
                        <FaExchangeAlt className="text-white text-xl" />
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto border-t-4 border-emerald-500 border-solid rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Chargement des Pokémon...</p>
                    </div>
                ) : filteredPokemonData.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">Aucun Pokémon trouvé</p>
                        <button
                            onClick={resetSearch}
                            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                        {filteredPokemonData.map((pokemon) => {
                            const primaryType = pokemon.types[0]?.type?.name || 'normal';
                            const bgColor = typeColors[primaryType] || typeColors.normal;
                            return (
                                <div
                                    key={pokemon.id}
                                    className={`${bgColor} rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-[200px] h-72 relative`}
                                    onClick={() => handleCardClick(pokemon.id)}
                                >
                                    <Card pokemon={pokemon} />
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button
                        onClick={() => setShowListModal(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    >
                        Voir tous les Pokémon
                    </button>
                </div>

                {showListModal && (
                    <PokemonList
                        pokemonList={originalPokemonData}
                        onClose={() => setShowListModal(false)}
                    />
                )}

                <div className="mt-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl p-6 text-white shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-3">À propos de ce Pokédex</h2>
                    <p className="mb-4 max-w-2xl mx-auto">
                        Ce Pokédex numérique vous permet de découvrir et de suivre tous les Pokémon existants.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <h3 className="font-bold">Nombre de Pokémon</h3>
                            <p>{originalPokemonData.length} au total</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-lg">
                            <h3 className="font-bold">Affichés</h3>
                            <p>{filteredPokemonData.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
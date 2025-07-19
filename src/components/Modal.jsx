import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { fetchPokemonById } from "../utils/function.js";

const Modal = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const data = await fetchPokemonById(id);
                setPokemon(data);
            } catch (error) {
                console.error("Error loading Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <div className="w-16 h-16 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
                <p className="text-xl">Pokémon non trouvé</p>
            </div>
        );
    }

    const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default ||
        pokemon.sprites.front_default;

    const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

    const stats = pokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }));

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 flex items-center justify-center">
            <div className="max-w-4xl w-full">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white">
                        <div className="bg-gray-700 hover:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center mr-2">
                            <FaArrowLeft className="text-white text-xl" />
                        </div>
                    </Link>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                            <div className="bg-gray-900/50 rounded-full p-4 w-48 h-48 flex items-center justify-center">
                                <img
                                    src={imageUrl}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <h1 className="text-3xl font-bold mt-4 capitalize text-center">
                                {pokemon.name}
                            </h1>
                            <span className="text-xl text-gray-400">{formattedId}</span>

                            <div className="mt-4 flex gap-2 justify-center">
                                {pokemon.types.map((typeInfo, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        {typeInfo.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-2/3 md:pl-8">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-900/50 p-4 rounded-xl">
                                    <h3 className="text-gray-400 text-sm mb-1">Taille</h3>
                                    <p className="text-xl font-bold">{pokemon.height / 10} m</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-xl">
                                    <h3 className="text-gray-400 text-sm mb-1">Poids</h3>
                                    <p className="text-xl font-bold">{pokemon.weight / 10} kg</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-xl">
                                    <h3 className="text-gray-400 text-sm mb-1">Expérience</h3>
                                    <p className="text-xl font-bold">{pokemon.base_experience}</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-xl">
                                    <h3 className="text-gray-400 text-sm mb-1">Ordre</h3>
                                    <p className="text-xl font-bold">{pokemon.order}</p>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 p-4 rounded-xl">
                                <h3 className="text-lg font-bold mb-3 text-center md:text-left">
                                    Statistiques
                                </h3>
                                <div className="space-y-3">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="flex flex-col">
                                            <div className="flex justify-between mb-1">
                                                <span className="capitalize">
                                                    {stat.name}
                                                </span>
                                                <span>
                                                    {stat.value}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-emerald-500 h-2 rounded-full"
                                                    style={{ width: `${(stat.value / 150) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
import { useState, useEffect } from "react";

const STORAGE_KEY = "custom_pokemons";

export function useCustomPokemon() {
  const [customPokemons, setCustomPokemons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customPokemons));
  }, [customPokemons]);

  const addCustomPokemon = (newPokemon) => {
    const pokemonWithId = {
      ...newPokemon,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    setCustomPokemons((prev) => [...prev, pokemonWithId]);
    return true;
  };

  const deleteCustomPokemon = (id) => {
    setCustomPokemons((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    customPokemons,
    addCustomPokemon,
    deleteCustomPokemon,
    count: customPokemons.length,
  };
}
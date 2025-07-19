import axios from "axios";

export const fetchPokemonList = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchPokemonData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
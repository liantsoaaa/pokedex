import axios from "axios";

export const fetchPokemonList = async (url, setPokemonList) => {
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    setPokemonList(results);
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchPokemonData = async (url, index, setPokemonData) => {
  try {
    const URL = url + "/" + index;
    const response = await axios.get(URL);
    const results = await response.data;
    setPokemonData(results);
  } catch (error) {
    throw new Error(error);
  }
}

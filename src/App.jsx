import { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonData } from "./utils/function.js";

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemonList("https://pokeapi.co/api/v2/pokemon", setPokemonList);
      await fetchPokemonData("https://pokeapi.co/api/v2/pokemon", 1, setPokemonData);
    }
    fetchData()
  }, [])

  if (pokemonList.length == 0 && pokemonData == null) {
    return <div>Chargement</div>
  }
  if (pokemonList.length != 0 && pokemonData != null) {
    //Pour voir la list des pokemon.
    console.log(pokemonList)

    // Pour voir le nom d'un pokemon.
    console.log(pokemonList[0]?.name)

    // Pour voir les donnes d'un pokemon
    console.log(pokemonData)

    // Pour voir quelque chose, exemple le lien de l'Image
    console.log(pokemonData?.sprites?.front_default)
  }

  // UTILISER DES PROPS POUR POUVOIR UTILISER pokemonData et pokemonList DANS VOS COMPONENTS.

  return (
    <div>

      <img src={pokemonData?.sprites?.front_default} />

      <Card pokemonList={pokemonList} pokemonData={pokemonData} />
      <Modal pokemonList={pokemonList} pokemonData={pokemonData} />
    </div>
  )
}

export default App

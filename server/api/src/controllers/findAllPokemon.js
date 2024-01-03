const axios = require("axios");
const { Pokemon } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon";

const findAllPokemon = async (req, res) => {
  try {
    const pokemonsFromDB = await Pokemon.findAll();

    // Verificar cuántos Pokémon necesitas para no exceder los 50
    const remainingPokemonCount = 50 - pokemonsFromDB.length;

    if (remainingPokemonCount > 0) {
      // Obtener Pokémon de la API
      const response = await axios(`${URL}?limit=${remainingPokemonCount}`);
      const apiPokemons = response.data.results;

      // Mapear los resultados de la API para obtener las propiedades necesarias
      const apiPokemonDetails = await Promise.all(
        apiPokemons.map(async (apiPokemon) => {
          const {data} = await axios(apiPokemon.url);
          const {
            id,
            name,
            sprites,
            stats,
            height,
            weight,
            types
           
            
          } = data;
          const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
          const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
          const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
          const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
          const type = types.find((type) => type.slot === 1).type.name;

          return {
            id,
            name,
            image: sprites.front_default,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type
          };
        })
      );

      // Combinar los Pokémon de la BD y de la API
      const allPokemons = [...pokemonsFromDB, ...apiPokemonDetails];

      return res.status(200).json(allPokemons);
    } else {
      // Si ya tenemos suficientes Pokémon en la BD, devolver solo esos
      return res.status(200).json(pokemonsFromDB);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = findAllPokemon;





// const {Pokemon, Type} = require("../db");

    // const URL = "https://pokeapi.co/api/v2/pokemon";

    // const findAllPokemnon = async() => {
    //     try {
    //         //traer los pokemon de la BD
    //         const pokemons = await Pokemon.findAll();
    //         return res.status(200).json(pokemons);

            
    //     } catch (error) {
            
    //         res.status(500).json({error: error.message})
            
    //     }
    // }

    // module.exports = findAllPokemnon;
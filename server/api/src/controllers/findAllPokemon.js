const axios = require("axios");
const { Pokemon, Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon";

const findAllPokemon = async (req, res) => {
  try {
    const pokemonsFromDB = await Pokemon.findAll({
      include: [{ model: Type, through: "type_pokemon" }],
    });
    console.log("Pokemons from DB:", pokemonsFromDB);
    const remainingPokemonCount = 50 - pokemonsFromDB.length;

    if (remainingPokemonCount > 0) {
      const response = await axios(`${URL}?limit=${remainingPokemonCount}`);
      const apiPokemons = response.data.results;

      const apiPokemonDetails = await Promise.all(
        apiPokemons.map(async (apiPokemon) => {
          const { data } = await axios(apiPokemon.url);
          const { id, name, sprites, stats, height, weight, types } = data;
          const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
          const attack = stats.find(
            (stat) => stat.stat.name === "attack"
          ).base_stat;
          const defense = stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat;
          const speed = stats.find(
            (stat) => stat.stat.name === "speed"
          ).base_stat;
          const pokemonTypes = types.map((type) => type.type.name);
          const image = sprites.other.dream_world.front_default;
          // console.log("API Pokemon Details:", pokemonTypes);
          return {
            id,
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type: pokemonTypes,
            api: true,
          };
        })
      );

      const allPokemons = [...pokemonsFromDB, ...apiPokemonDetails];

      return res.status(200).json(allPokemons);
    } else {
      const allPokemons = pokemonsFromDB.map((pokemon) => ({
        ...pokemon.toJSON(),
        type: [Type.name],
        api: false,
      }));
      return res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = findAllPokemon;

// const axios = require("axios");
// const { Pokemon, Type } = require("../db");

// const URL = "https://pokeapi.co/api/v2/pokemon";

// const findAllPokemon = async (req, res) => {
//   try {
//     const pokemonsFromDB = await Pokemon.findAll({
//       include: [{ model: Type, through: "type_pokemon" }],
//     });

//     // Verificar cuántos Pokémon necesitas para no exceder los 50
//     const remainingPokemonCount = 50 - pokemonsFromDB.length;

//     if (remainingPokemonCount > 0) {
//       // Obtener Pokémon de la API
//       const response = await axios(`${URL}?limit=${remainingPokemonCount}`);
//       const apiPokemons = response.data.results;

//       // Mapear los resultados de la API para obtener las propiedades necesarias
//       const apiPokemonDetails = await Promise.all(
//         apiPokemons.map(async (apiPokemon) => {
//           const {data} = await axios(apiPokemon.url);
//           const {
//             id,
//             name,
//             sprites,
//             stats,
//             height,
//             weight,
//             types

//           } = data;
//           const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
//           const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
//           const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
//           const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
//           const pokemonTypes = types.map((type) => type.type.name);
//           const image = sprites.other.dream_world.front_default;

//           return {
//             id,
//             name,
//             image,
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//             type: pokemonTypes,
//             api:true
//           };
//         })
//       );

//       // Combinar los Pokémon de la BD y de la API
//       const allPokemons = [...pokemonsFromDB, ...apiPokemonDetails];

//       return res.status(200).json(allPokemons);
//     } else {
//       // Si ya tenemos suficientes Pokémon en la BD, devolver solo esos
//       const allPokemons = pokemonsFromDB.map((pokemon) => ({
//         ...pokemon.toJSON(),
//         type: [pokemon.type],
//         api:false // Agrega el campo 'origin' con el valor 'DB'
//       }));
//       return res.status(200).json(allPokemons);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = findAllPokemon;

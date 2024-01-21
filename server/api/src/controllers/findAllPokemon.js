  const axios = require("axios");
  const { Pokemon, Type } = require("../db");

  const URL = "https://pokeapi.co/api/v2/pokemon";

  const findAllPokemon = async (req, res) => {
    try {
      const pokemonsFromDB = await Pokemon.findAll({
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const formattedPokemonsFromDB = pokemonsFromDB.map((pokemon) => ({
        ...pokemon.toJSON(),
        type: pokemon.types.map((type) => type.name),
      }));
      console.log("Pokemons from DB:", formattedPokemonsFromDB);
      const remainingPokemonCount = 50 - formattedPokemonsFromDB.length;

      if (remainingPokemonCount > 0) {
        const {data} = await axios(`${URL}?limit=${remainingPokemonCount}`);
        const apiPokemons = data.results;

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

        const allPokemons = [...formattedPokemonsFromDB, ...apiPokemonDetails];
        return res.status(200).json(allPokemons);
      } else {
        return res.status(200).json(formattedPokemonsFromDB);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = findAllPokemon;


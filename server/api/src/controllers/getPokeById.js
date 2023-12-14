const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeById = async (id, res) => {
  try {
    const { data } = await axios(`${URL}${id}`);
    const { name } = data;
    const pokemon = { name };
    console.log(data);
    return pokemon.name
      ? res.status(200).json(pokemon)
      : res.status(404).send("Personaje no encontrado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokeById;

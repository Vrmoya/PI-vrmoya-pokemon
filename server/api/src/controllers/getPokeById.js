const axios = require("axios");
const { Pokemon } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    // Intentar buscar en la BD
    
    const pokemonDB = await Pokemon.findByPk(id);
    
    // Si se encuentra en la BD, devolverlo
    if (pokemonDB) {
      return res.status(200).json(pokemonDB);
    }
    
    // Si no se encuentra en la BD, hacer la solicitud a la API
    const { data } = await axios(`${URL}${id}`);
    const { name, sprites, stats, height, weight, types } = data;
    const pokemonAPI = { 
      name, 
      image: sprites?.other.dream_world.front_default || null,
      hp: stats.find(stat => stat.stat.name === 'hp')?.base_stat || null,
      attack: stats.find(stat => stat.stat.name === 'attack')?.base_stat || null,
      defense: stats.find(stat => stat.stat.name === 'defense')?.base_stat || null,
      speed: stats.find(stat => stat.stat.name === 'speed')?.base_stat || null,
      height,
      weight, 
      type: types.find((type) => type.slot === 1).type.name
     };
    
    return pokemonAPI.name
      ? res.status(200).json(pokemonAPI)
      : res.status(404).send("Personaje no encontrado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokeById;



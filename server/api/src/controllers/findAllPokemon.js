const {Pokemon, Type} = require("../db");

const findAllPokemnon = async() => {
    try {
        const pokemons = await Pokemon.findAll();
        return res.status(200).json(pokemons);
        
    } catch (error) {
        
        res.status(500).json({error: error.message})
        
    }
}

module.exports = findAllPokemnon;
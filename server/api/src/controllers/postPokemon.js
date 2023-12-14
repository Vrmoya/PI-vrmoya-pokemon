const { Pokemon} = require("../db");

const postPokemon = async (req, res) => {
    const {name, image, hp, attack, defense} = req.body;
    if( !name === "" || !image === "" || !hp === "" || !attack === "" || !defense === "") res.status(400).send("Faltan datos");
    try {
        const [character, created] = await Pokemon.findOrCreated({
            where: {name}
        })
        if(!created) {
            return res.status(400).json({message: "El personaje ya existe"})
        }
        return res.status(200).json({character})
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}

module.exports = postPokemon;
const { Op } = require("sequelize")
const {Pokemon, Type} = require("../db")

const getPokeByName = async(req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "El parámetro 'name' es obligatorio." });
        }

        const pokeName = await Pokemon.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`,
                }
            }
        })
        if (pokeName.length === 0) {
            return res.status(404).json({ message: "No se encontraron Pokémon con el nombre proporcionado." });
        }

        return res.status(200).json(pokeName)



    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

module.exports = getPokeByName;
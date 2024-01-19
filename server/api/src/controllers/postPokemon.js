  const { Pokemon, Type } = require("../db");

  const postPokemon = async (req, res) => {
    const { name, image, hp, attack, defense, speed, weight, height, type } = req.body;

    if (!name || !hp || !attack || !defense || !weight || !height || !type) {
      return res.status(400).send("Faltan datos");
    }
    
    try {
      const [poke, created] = await Pokemon.findOrCreate({
        where: { name },
        defaults: {
          image,
          hp,
          attack,
          defense,
          speed,
          weight,
          height,
          type,
          },
      });

      console.log('After findOrCreate');

      if (!created) {
        return res.status(400).json({ message: 'El personaje ya existe' });
      }

      // Asociar el tipo al Pokémon
      const typeInstance = await Type.findOne({ where: { name: type } });
      if (typeInstance) {
        await poke.addType(typeInstance);
      } else {
        return res.status(400).json({ message: 'El tipo especificado no existe' });
      }

      return res.status(200).json({ poke });
    } catch (error) {
      console.error('Error during findOrCreate:', error);
      console.error('Error details:', error.errors); // Agregado para imprimir más detalles
      return res.status(500).json({ error: 'Error during findOrCreate' });
    }
  };

  module.exports = postPokemon;


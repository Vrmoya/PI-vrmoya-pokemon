// Importa los modelos necesarios
const { Pokemon, Type } = require("../db");

// Controlador para la ruta POST /pokemons
const postPokemon = async (req, res) => {
  try {
    // Extrae los datos necesarios del cuerpo de la solicitud
    const { name, image, hp, attack, defense, speed, weight, height, type } = req.body;
    console.log('Datos recibidos del frontend:', { name, image, hp, attack, defense, speed, weight, height, type });
    // Valida que los campos requeridos estén presentes
    if (!name || !hp || !attack || !defense || !weight || !height || !type) {
      return res.status(400).json({ success: false, message: 'Faltan datos' });
    }

    // Crea el Pokémon en la base de datos
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
      },
    });

    // Verifica si el Pokémon ya existía
    if (!created) {
      return res.status(400).json({ success: false, message: 'El Pokémon ya existe' });
    }

    // Asocia los tipos al Pokémon
    const typeInstances = await Type.findAll({
      where: { name: type },
    });

    if (typeInstances.length !== type.length) {
      return res.status(400).json({ success: false, message: 'Al menos uno de los tipos especificados no existe' });
    }

    await poke.addTypes(typeInstances);

    // Devuelve una respuesta exitosa
    return res.status(201).json({ success: true, data: poke });
  } catch (error) {
    console.error('Error during creating Pokemon:', error);
    console.error('Error details:', error.stack || error);
    return res.status(500).json({ success: false, error: 'Error during creating Pokemon' });
  }
};

// Exporta el controlador
module.exports = postPokemon;


// const { Pokemon, Type } = require("../db");

  // const postPokemon = async (req, res) => {
  //   const { name, image, hp, attack, defense, speed, weight, height, type } = req.body;

  //   if (!name || !hp || !attack || !defense || !weight || !height || !type) {
  //     return res.status(400).send("Faltan datos");
  //   }
    
  //   try {
  //     const [poke, created] = await Pokemon.findOrCreate({
  //       where: { name },
  //       defaults: {
  //         image,
  //         hp,
  //         attack,
  //         defense,
  //         speed,
  //         weight,
  //         height,
  //         type,
  //         },
  //     });

  //     console.log('After findOrCreate');

  //     if (!created) {
  //       return res.status(400).json({ message: 'El personaje ya existe' });
  //     }

  //     // Asociar el tipo al Pokémon
  //     const typeInstance = await Type.findAll({ where: { name: type } });
  //     if (typeInstance) {
  //       await poke.addType(typeInstance);
  //     } else {
  //       return res.status(400).json({ message: 'El tipo especificado no existe' });
  //     }

  //     return res.status(200).json({ poke });
  //   } catch (error) {
  //     console.error('Error during findOrCreate:', error);
  //     console.error('Error details:', error.errors); // Agregado para imprimir más detalles
  //     return res.status(500).json({ error: 'Error during findOrCreate' });
  //   }
  // };

  // module.exports = postPokemon;


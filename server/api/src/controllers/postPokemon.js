const { Pokemon } = require("../db");

const postPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, weight, height, type } = req.body;

  if (!name || !hp || !attack || !defense || !weight || !height || !type) {
    return res.status(400).send("Faltan datos");
  }

  try {
    // Verifica si type es un array y toma el primer elemento, o simplemente toma el valor de type
    const typeValue = Array.isArray(type) ? type : [type];
    console.log('Before findOrCreate');
    
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
        type: typeValue,
      },
    });
    console.log('After findOrCreate');

    if (!created) {
      return res.status(400).json({ message: 'El personaje ya existe' });
    }

    return res.status(200).json({ poke });
  } catch (error) {
    console.error('Error during findOrCreate:', error);
    console.error('Error details:', error.errors); // Agregado para imprimir más detalles
    return res.status(500).json({ error: 'Error during findOrCreate' });
  }
};

module.exports = postPokemon;



// const { Pokemon } = require("../db");

// const postPokemon = async (req, res) => {
//   const { name, image, hp, attack, defense, speed, weight, height, type } = req.body;

//   if (name === "" || hp === "" || attack === "" || defense === "" || weight === "" || height === "" || type === "") {
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
//         type: type[0],
//       },
//     });

//     if (!created) {
//       // Si ya existe, devuelve un código 400 indicando que el personaje ya existe
//       return res.status(400).json({ message: 'El personaje ya existe' });
//     }

//     // Si se creó correctamente, devuelve un código 200 con el objeto del Pokemon
//     return res.status(200).json({ poke });
//   } catch (error) {
//     // Si ocurre un error interno del servidor, devuelve un código 500 con el mensaje de error
//     console.error(error);
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = postPokemon;





// const postPokemon = async (req,res) => {
//     const {name, image, hp, attack, defense, speed, weight, height} = req.body;
//     if(name === "" || image === "" || hp === "" || attack === "" || defense === "" || weight === "" || height === "" || type === "") res.status(400).send("Faltan datos");
// try {
//     const [poke, created] = await Pokemon.findOrCreate({
//       where: { name },
//       defaults: { 
        
//         hp,
//         attack,
//         defense,
//         speed,
//         weight,
//         height, 
        

//       }
//     });

//     if(!created) {
//       return res.status(400).json({message:'El personaje ya existe'});
//     }

//     return res.status(200).json({poke});

//   } catch (error) {

//     res.status(500).send(error.message); 
//   }
// }

// module.exports = postPokemon;



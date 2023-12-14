const axios = require("axios");
const { Type } = require("../db");
const URL_TYPE = "https://pokeapi.co/api/v2/type";

let cachedTypes = null; // Variable para almacenar temporalmente los tipos en memoria

const getAllTypes = async (req, res) => {
    try {
        console.log("Entrando en getAllTypes");

        // Si los tipos están en caché, responder con ellos
        if (cachedTypes) {
            console.log("Enviando tipos desde caché");
            return res.status(200).json(cachedTypes);
        }

        // Si no hay tipos en caché, intentar obtenerlos de la base de datos
        const typesFromDB = await Type.findAll();

        // Si hay tipos en la base de datos, almacenarlos en caché y responder
        if (typesFromDB.length > 0) {
            cachedTypes = typesFromDB;
            console.log("Enviando tipos desde la base de datos");
            return res.status(200).json(typesFromDB);
        }

        // Si no hay tipos en la base de datos, obtenerlos de la API
        const response = await axios.get(`${URL_TYPE}`);
        const typesFromAPI = response.data.results.map((type) => ({ name: type.name }));

        // Almacenar los tipos obtenidos de la API en la base de datos
        await Type.bulkCreate(typesFromAPI);

        // Almacenar los tipos en caché y responder
        cachedTypes = typesFromAPI;
        console.log("Enviando tipos desde la API");
        return res.status(200).json(typesFromAPI);
    } catch (error) {
        console.error("Error en getAllTypes:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllTypes;



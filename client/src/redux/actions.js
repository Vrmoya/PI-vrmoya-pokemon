import axios from "axios";
import {
  SET_POKEMONS,
  SET_TYPES,
  SORT_BY_ORDER,
  SET_POKEMONS_PER_PAGE,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON,
  SET_FILTER_TYPE,
} from "../redux/actionTypes";

const URL = "http://localhost:3001/pokemons";

export const filterPokemonsByType = (pokemons, type) => {
  if (!type) {
    return pokemons;
  }

  return pokemons.filter((pokemon) => {
    const pokemonTypes = pokemon.types || [];
    return pokemonTypes.includes(type);
  });
};



export const setPokemons = (pokemons) => ({
  type: SET_POKEMONS,
  payload: pokemons,
});

export const fetchPokemons = (searchTerm) => {
  return async (dispatch) => {
    try {
      let url = `${URL}`;

      if (searchTerm) {
        url = `${URL}/name?name=${searchTerm}`;
      }

      const { data } = await axios.get(url);
      const dbPokemons = data;

      let allPokemons = [];

      if (dbPokemons.length > 0) {
        allPokemons = dbPokemons;
      } else {
        const response = await axios.get(`${URL}`);
        allPokemons = response.data;
      }

      dispatch(setPokemons(allPokemons));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

const setTypes = (types) => ({
  type: SET_TYPES,
  payload: types,
});

export const fetchTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/types");
      const types = response.data;
      dispatch(setTypes(types));
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
};

export const setSelectedPokemon = (pokemon) => ({
  type: SET_SELECTED_POKEMON,
  payload: pokemon,
});

export const fetchPokemonById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const pokemon = response.data;
      dispatch(setSelectedPokemon(pokemon));
    } catch (error) {
      console.error("Error fetching Pokemon by ID:", error);
    }
  };
};

export const sortByOrder = (order) => ({
  type: SORT_BY_ORDER,
  payload: order,
});

export const setPokemonsPerPage = (page) => ({
  type: SET_POKEMONS_PER_PAGE,
  payload: page,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setFilterType = (type) => ({
  type: SET_FILTER_TYPE,
  payload: type,
});

export const setFilterTypeAndFilterPokemons = (type) => {
  return (dispatch) => {
    dispatch(setFilterType(type));
  };
};

// import axios from "axios";

// import{SET_POKEMONS,
//   SET_TYPES,
//   SORT_BY_ORDER,
//   SET_POKEMONS_PER_PAGE,
//   SET_CURRENT_PAGE,
//   SET_SELECTED_POKEMON,
//   SET_FILTER_TYPE
//  } from "../redux/actionTypes"

// const URL = "http://localhost:3001/pokemons";

// ;

// export const setPokemons = (pokemons) => ({
//   type: SET_POKEMONS,
//   payload: pokemons,
// });

// export const fetchPokemons = (searchTerm) => {
//   return async (dispatch) => {
//     try {
//       let url = `${URL}`;

//       if (searchTerm) {
//         url = `${URL}/name?name=${searchTerm}`;
//       }

//       const { data } = await axios.get(url);
//       const dbPokemons = data;

//       let allPokemons = [];

//       if (dbPokemons.length > 0) {
//         allPokemons = dbPokemons;
//       } else {
//         const response = await axios.get(`${URL}`);
//         allPokemons = response.data;
//       }

//       dispatch(setPokemons(allPokemons));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
// };

// const setTypes = (types) => ({
//   type: SET_TYPES,
//   payload: types,
// });

// export const fetchTypes = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get('http://localhost:3001/types');
//       const types = response.data;
//       dispatch(setTypes(types));
//     } catch (error) {
//       console.error('Error fetching types:', error);
//     }
//   };
// };

// export const setSelectedPokemon = (pokemon) => ({
//   type: SET_SELECTED_POKEMON,
//   payload: pokemon,
// });

// export const fetchPokemonById = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${URL}/${id}`);
//       const pokemon = response.data;
//       dispatch(setSelectedPokemon(pokemon));
//     } catch (error) {
//       console.error("Error fetching Pokemon by ID:", error);
//     }
//   };
// };

//   export const sortByOrder = (order) => ({
//     type: SORT_BY_ORDER,
//     payload: order,
//   });

//   export const setPokemonsPerPage = (page) => ({
//     type: SET_POKEMONS_PER_PAGE,
//     payload: page,
//   });
//   export const setCurrentPage = (page) => ({
//     type: SET_CURRENT_PAGE,
//     payload: page,
//   });

//   export const setFilterType = (type) => ({
//     type: SET_FILTER_TYPE,
//     payload: type,
//   });
//   export const setFilterTypeAndFilterPokemons = (type, pokemons) => {
//     return (dispatch) => {
//       dispatch(setFilterType(type));
//       dispatch({
//         type: SET_POKEMONS, // Asegúrate de tener una acción SET_POKEMONS en tus actionTypes
//         payload: filterPokemonsByType(pokemons, type),
//       });
//     };
//   };

// // Función de utilidad para filtrar Pokémon por tipo
// const filterPokemonsByType = (pokemons, type) => {
//   if (!type) {
//     return pokemons;
//   }

//   return pokemons.filter((pokemon) => {
//     const pokemonTypes = pokemon.types || []; // Asegúrate de que types sea un array
//     return pokemonTypes.includes(type);
//   });
// };

import axios from "axios";
import {
  SET_POKEMONS,
  SET_TYPES,
  SORT_BY_ORDER,
  SET_POKEMONS_PER_PAGE,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  EXTRACT_TYPES_FROM_POKEMONS
  
} from "../redux/actionTypes";

const URL = "http://localhost:3001/pokemons";

// export const filterPokemonsByType = (pokemons, type) => {
//   if (type === undefined || type.toLowerCase() === "all") {
//     return pokemons; // Return all Pokemon when type is 'all' or undefined
//   }
//   return pokemons.filter((pokemon) => {
//     // Check if the pokemon object and its types property exist
//     return (
//       pokemon &&
//       pokemon.types &&
//       Array.isArray(pokemon.types) && // Ensure types is an array
//       pokemon.types.includes(type)
//     );
//   });
// };

export const setPokemons = (pokemons) => {
  return {
    type: SET_POKEMONS,
    payload: pokemons,
  };
};

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


export const sortByOrder = (orderBy, order) => ({
  type: SORT_BY_ORDER,
  payload: { orderBy, order },
});




export const setPokemonsPerPage = (page) => ({
  type: SET_POKEMONS_PER_PAGE,
  payload: page,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const filterByType = (type)=>{
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  }
}

export const filterByOrigin = (origin)=>{
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  }
}


export const crearPokemon = (pokemon) => {
  return {
    type: 'CREAR_POKEMON',
    payload: pokemon,
  };
};
export const extractTypesFromPokemons = () => {
  return {
    type: EXTRACT_TYPES_FROM_POKEMONS,
  };
};

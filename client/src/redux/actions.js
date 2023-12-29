import axios from "axios";

import{SET_POKEMONS, SET_TYPES, SORT_BY_ORDER, SET_POKEMONS_PER_PAGE, SET_CURRENT_PAGE } from "../redux/actionTypes"

const URL = "http://localhost:3001/pokemons";

;

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
      console.error('Error fetching data:', error);
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
      const response = await axios.get('http://localhost:3001/types'); // Ajusta la URL según la configuración de tu backend
      const types = response.data;
      dispatch(setTypes(types));
    } catch (error) {
      console.error('Error fetching types:', error);
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
  
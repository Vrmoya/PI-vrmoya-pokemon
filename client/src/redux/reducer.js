import {
  SET_POKEMONS,
  SORT_BY_ORDER,
  SET_POKEMONS_PER_PAGE,
  SET_TYPES,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON
} from "./actionTypes";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  typesFilter: null,
  order: "asc",
  currentPage: 1,
  pokemonsPerPage: 12,
};

const pokemonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        filteredPokemons: payload,
      };
    case SET_TYPES:
      return {
        ...state,
        typesFilter: payload,
      };
    case SORT_BY_ORDER:
      return {
        ...state,
        order: payload,
      };
    case SET_POKEMONS_PER_PAGE:
      return {
        ...state,
        pokemonsPerPage: payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case SET_SELECTED_POKEMON:
      return {
        ...state,
        selectedPokemon: payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;

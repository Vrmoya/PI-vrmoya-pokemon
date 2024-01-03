// reducer.js
import {
  SET_POKEMONS,
  SORT_BY_ORDER,
  SET_POKEMONS_PER_PAGE,
  SET_TYPES,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON,
  SET_FILTER_TYPE,
} from "./actionTypes";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  typesFilter: null,
  order: "asc",
  currentPage: 1,
  pokemonsPerPage: 12,
  filterType: "",
};
import { filterPokemonsByType } from '../redux/actions';

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
    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: payload,
        filteredPokemons: filterPokemonsByType(state.pokemons, payload),
      };
    default:
      return state;
  }
};





export default pokemonReducer;


// // reducer.js
// import { SET_POKEMONS, SORT_BY_ORDER, SET_POKEMONS_PER_PAGE, SET_TYPES, SET_CURRENT_PAGE, SET_SELECTED_POKEMON, SET_FILTER_TYPE } from "./actionTypes";

// const initialState = {
//   pokemons: [],
//   filteredPokemons: [], // Nueva propiedad para almacenar los Pokémon filtrados por tipo
//   typesFilter: null,
//   order: "asc",
//   currentPage: 1,
//   pokemonsPerPage: 12,
//   filterType: "", // Nueva propiedad para almacenar el tipo de filtro seleccionado
// };

// const pokemonReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case SET_POKEMONS:
//       return {
//         ...state,
//         pokemons: payload,
//         filteredPokemons: payload, // Inicialmente, los Pokémon filtrados son los mismos que todos los Pokémon
//       };
//     case SET_TYPES:
//       return {
//         ...state,
//         typesFilter: payload,
//       };
//     case SORT_BY_ORDER:
//       return {
//         ...state,
//         order: payload,
//       };
//     case SET_POKEMONS_PER_PAGE:
//       return {
//         ...state,
//         pokemonsPerPage: payload,
//       };
//     case SET_CURRENT_PAGE:
//       return {
//         ...state,
//         currentPage: payload,
//       };
//     case SET_SELECTED_POKEMON:
//       return {
//         ...state,
//         selectedPokemon: payload,
//       };
//     case SET_FILTER_TYPE:
//       return {
//         ...state,
//         filterType: payload, // Establece el tipo de filtro seleccionado
//         filteredPokemons: filterPokemonsByType(state.pokemons, payload), // Filtra los Pokémon por el nuevo tipo seleccionado
//       };
//     default:
//       return state;
//   }
// };


// export default pokemonReducer;



// import {
//   SET_POKEMONS,
//   SORT_BY_ORDER,
//   SET_POKEMONS_PER_PAGE,
//   SET_TYPES,
//   SET_CURRENT_PAGE,
//   SET_SELECTED_POKEMON
// } from "./actionTypes";

// const initialState = {
//   pokemons: [],
//   filteredPokemons: [],
//   typesFilter: null,
//   order: "asc",
//   currentPage: 1,
//   pokemonsPerPage: 12,
// };

// const pokemonReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case SET_POKEMONS:
//       return {
//         ...state,
//         pokemons: payload,
//         filteredPokemons: payload,
//       };
//     case SET_TYPES:
//       return {
//         ...state,
//         typesFilter: payload,
//       };
//     case SORT_BY_ORDER:
//       return {
//         ...state,
//         order: payload,
//       };
//     case SET_POKEMONS_PER_PAGE:
//       return {
//         ...state,
//         pokemonsPerPage: payload,
//       };
//     case SET_CURRENT_PAGE:
//       return {
//         ...state,
//         currentPage: payload,
//       };
//     case SET_SELECTED_POKEMON:
//       return {
//         ...state,
//         selectedPokemon: payload,
//       };
//     default:
//       return state;
//   }
// };

// export default pokemonReducer;

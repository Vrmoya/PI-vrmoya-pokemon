// reducer.js
import {
  SET_POKEMONS,
  SORT_BY_ORDER,
  SET_POKEMONS_PER_PAGE,
  SET_TYPES,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN

 
} from "./actionTypes";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  order: "asc",
  currentPage: 1,
  pokemonsPerPage: 12,
  filterType: "",
  types: [],
  originPokemon:[]
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
        types: payload,
      };
      case FILTER_BY_TYPE:
  const filteredByType = payload === ""
    ? state.pokemons
    : state.pokemons.filter((pokemon) => pokemon.types.some(type => type === payload));

  return {
    ...state,
    filteredPokemons: filteredByType
  };

case FILTER_BY_ORIGIN:
  const filteredByOrigin = payload === 'All'
    ? state.pokemons
    : state.pokemons.filter((pokemon) => payload === 'API' ? pokemon.api : !pokemon.api);

  return {
    ...state,
    filteredPokemons: filteredByOrigin
  };

    case SORT_BY_ORDER:
      const sortedAllPokemons = [...state.pokemons];
      const { orderBy, order } = payload;

      if (orderBy === "name") {
        sortedAllPokemons.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (order === "asc") {
            return nameA.localeCompare(nameB);
          } else if (order === "desc") {
            return nameB.localeCompare(nameA);
          }

          return 0;
        });
      } else if (orderBy === "attack") {
        sortedAllPokemons.sort((a, b) => {
          if (order === "asc") {
            return a.attack - b.attack;
          } else if (order === "desc") {
            return b.attack - a.attack;
          }

          return 0;
        });
      }

      return {
        ...state,
        order,
        filteredPokemons: sortedAllPokemons,
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
      case 'CREAR_POKEMON':
        return {
          ...state,
          pokemones: [...state.pokemones, action.payload],
        };
    default:
      return state;
  }
};

export default pokemonReducer;

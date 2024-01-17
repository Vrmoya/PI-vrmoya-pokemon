
  const filteredByType =
    payload === "" || payload === "all"
      ? state.pokemons
      : state.pokemons.filter((pokemon) => {
          // Ensure that pokemon.types is an array
          const typesArray = pokemon.types || [];

          return typesArray.length > 0 && typesArray.includes(payload);
        });

  return {
    ...state,
    filterType: payload, // Update the filterType in the state
    filteredPokemons: filteredByType,
  };



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
 fetchPokemons,
 sortByOrder,
 setPokemonsPerPage,
 setCurrentPage,
 fetchTypes,
} from "../../redux/actions";

import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
 const dispatch = useDispatch();
 const filteredPokemons = useSelector((state) => state.filteredPokemons);
 const currentPage = useSelector((state) => state.currentPage);
 const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
 const [typeFilter, setTypeFilter] = useState("");
 const types = useSelector((state) => state.types);

 useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(setPokemonsPerPage(12));
    dispatch(fetchTypes());
 }, [dispatch]);

 const handleSort = (orderBy, order) => {
    dispatch(sortByOrder(orderBy, order));
 };

 const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
 };

 const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
 };

 const startIndex = (currentPage - 1) * pokemonsPerPage;
 const endIndex = startIndex + pokemonsPerPage;

 // Get the subset of pokemons to display
 let displayedPokemons = filteredPokemons.slice(startIndex, endIndex);

 // Filter the pokemons by type if the filter is not empty
 if (typeFilter) {
    displayedPokemons = displayedPokemons.filter((pokemon) =>
      pokemon.types.some((type) => type.type.name === typeFilter)
    );
 }

 return (
    <div>
      <select value={typeFilter} onChange={handleTypeFilterChange}>
        <option value="">Todos los tipos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleSort("name", e.target.value)}>
        <option value="asc">Ascendente (Nombre)</option>
        <option value="desc">Descendente (Nombre)</option>
      </select>
      <select onChange={(e) => handleSort("attack", e.target.value)}>
        <option value="asc">Ascendente (Ataque)</option>
        <option value="desc">Descendente (Ataque)</option>
      </select>
      <Cards pokemons={displayedPokemons} />
      <Pagination
        totalPages={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
 );
};

export default HomePage;




















// // HomePage.js

// // ... (imports)

// const HomePage = () => {
//     // ... (existing code)
  
//     const handleSort = (orderBy, order) => {
//       dispatch(sortByOrder(orderBy, order));
//     };
  
//     return (
//       <div>
//         <select onChange={(e) => handleSort('name', e.target.value)}>
//           <option value="asc">Ascendente (Nombre)</option>
//           <option value="desc">Descendente (Nombre)</option>
//         </select>
//         <select onChange={(e) => handleSort('attack', e.target.value)}>
//           <option value="asc">Ascendente (Ataque)</option>
//           <option value="desc">Descendente (Ataque)</option>
//         </select>
//         <Cards pokemons={displayedPokemons} />
//         <Pagination
//           totalPages={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
//           currentPage={currentPage}
//           handlePageChange={handlePageChange}
//         />
//       </div>
//     );
//   };
  
//   export default HomePage;
  
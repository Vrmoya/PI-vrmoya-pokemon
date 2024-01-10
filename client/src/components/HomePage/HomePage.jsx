import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByType, filterByOrigin, fetchPokemons, fetchTypes, sortByOrder, setPokemonsPerPage, setCurrentPage
} from "../../redux/actions";

import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const [typeFilter, setTypeFilter] = useState("");
  const [originFilter, setOriginFilter] = useState("");  // Nuevo estado para el filtro de origen
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
    dispatch(filterByType(e.target.value));
  };
  
  const handleOriginFilterChange = (e) => {
    setOriginFilter(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  };
  

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;

  // Get the subset of pokemons to display
  let displayedPokemons = filteredPokemons.slice(startIndex, endIndex);

  // Filter the pokemons by type if the filter is not empty
  if (typeFilter) {
    displayedPokemons = displayedPokemons
      .filter((pokemon) => pokemon.types && Array.isArray(pokemon.types))
      .filter((pokemon) =>
        pokemon.types.some((type) => type && type.type && type.type.name === typeFilter)
      );
  }

  // Filter the pokemons by origin if the filter is not empty
  if (originFilter) {
    displayedPokemons = displayedPokemons
      .filter((pokemon) => pokemon.api ? originFilter === 'API' : originFilter === 'DDBB');
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

      <select value={originFilter} onChange={handleOriginFilterChange}>
        <option value="">Todos los orígenes</option>
        <option value="API">API</option>
        <option value="DDBB">DDBB</option>
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



// const HomePage = () => {
//  const dispatch = useDispatch();
//  const filteredPokemons = useSelector((state) => state.filteredPokemons);
//  const currentPage = useSelector((state) => state.currentPage);
//  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
//  const [typeFilter, setTypeFilter] = useState("");
//  const types = useSelector((state) => state.types);

//  useEffect(() => {
//     dispatch(fetchPokemons());
//     dispatch(setPokemonsPerPage(12));
//     dispatch(fetchTypes());
//  }, [dispatch]);

 
 
//  const handleSort = (orderBy, order) => {
//     dispatch(sortByOrder(orderBy, order));
//  };

//  const handlePageChange = (page) => {
//     dispatch(setCurrentPage(page));
//  };

//  const handleTypeFilterChange = (e) => {

//     setTypeFilter(e.target.value);
//  };

//  const startIndex = (currentPage - 1) * pokemonsPerPage;
//  const endIndex = startIndex + pokemonsPerPage;

//  // Get the subset of pokemons to display
//  let displayedPokemons = filteredPokemons.slice(startIndex, endIndex);

//  // Filter the pokemons by type if the filter is not empty
//  if (typeFilter) {
//   displayedPokemons = filteredPokemons
//     .filter((pokemon) => pokemon.types && Array.isArray(pokemon.types))
//     .filter((pokemon) =>
//       pokemon.types.some((type) => type && type.type && type.type.name === typeFilter)
//     );
// }
  
//  return (
//     <div>
//       <select value={typeFilter} onChange={handleTypeFilterChange}>
       
//         <option value="">Todos los tipos</option>
//         {types.map((type) => (
//           <option key={type.name} value={type.name}>
//             {type.name}
//           </option>
//         ))}
//       </select>
      // <select onChange={(e) => handleSort("name", e.target.value)}>
      //   <option value="asc">Ascendente (Nombre)</option>
      //   <option value="desc">Descendente (Nombre)</option>
      // </select>
      // <select onChange={(e) => handleSort("attack", e.target.value)}>
      //   <option value="asc">Ascendente (Ataque)</option>
      //   <option value="desc">Descendente (Ataque)</option>
      // </select>
      // <Cards pokemons={displayedPokemons} />
      // <Pagination
      //   totalPages={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
      //   currentPage={currentPage}
      //   handlePageChange={handlePageChange}
      // />
//     </div>
//  );
// };

// export default HomePage;



// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchPokemons,
//   sortByOrder,
//   setPokemonsPerPage,
//   setCurrentPage,
  
// } from "../../redux/actions";

// import Cards from "../Cards/Cards";
// import Pagination from "../Pagination/Pagination";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const filteredPokemons = useSelector((state) => state.filteredPokemons);
//   const currentPage = useSelector((state) => state.currentPage);
//   const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

  
  
  
//   useEffect(() => {
//     dispatch(fetchPokemons());
//     dispatch(setPokemonsPerPage(12));
//   }, [dispatch]);

//   const handleSort = (orderBy, order) => {
//     dispatch(sortByOrder(orderBy, order));
//   };

//   const handlePageChange = (page) => {
//     dispatch(setCurrentPage(page));
//   };

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * pokemonsPerPage;
//   const endIndex = startIndex + pokemonsPerPage;

//   // Get the subset of pokemons to display
//   const displayedPokemons = filteredPokemons.slice(startIndex, endIndex);



//   return (
//     <div>
//       <select onChange={(e) => handleSort("name", e.target.value)}>
//         <option value="asc">Ascendente (Nombre)</option>
//         <option value="desc">Descendente (Nombre)</option>
//       </select>
//       <select onChange={(e) => handleSort("attack", e.target.value)}>
//         <option value="asc">Ascendente (Ataque)</option>
//         <option value="desc">Descendente (Ataque)</option>
//       </select>
//       <Cards pokemons={displayedPokemons} />
//       <Pagination
//         totalPages={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
//         currentPage={currentPage}
//         handlePageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default HomePage

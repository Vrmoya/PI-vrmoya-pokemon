import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPokemons,
  sortByOrder,
  setPokemonsPerPage,
  setCurrentPage,
  fetchTypes,
} from '../../redux/actions';

import Cards from '../Cards/Cards';
import Filtered from '../Filtered/Filtered';
import Pagination from '../Pagination/Pagination';

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(setPokemonsPerPage(12));
  }, [dispatch]);

  const handleFilter = (type) => {
    dispatch(setFilterType(type)); // Aquí deberías utilizar la acción setFilterType en lugar de fetchTypes
  };

  const handleSort = (order) => {
    dispatch(sortByOrder(order));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;

  // Get the subset of pokemons to display
  const displayedPokemons = filteredPokemons.slice(startIndex, endIndex);

  return (
    <div>
      <Filtered handleFilter={handleFilter} handleSort={handleSort} />
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

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchPokemons,
//   sortByOrder,
//   setPokemonsPerPage,
//   setCurrentPage,
// } from '../../redux/actions';

// import Cards from '../Cards/Cards';
// import Filtered from '../Filtered/Filtered';
// import Pagination from '../Pagination/Pagination';

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const filteredPokemons = useSelector((state) => state.filteredPokemons);
//   const currentPage = useSelector((state) => state.currentPage);
//   const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

//   useEffect(() => {
//     dispatch(fetchPokemons());
//     dispatch(setPokemonsPerPage(12));
//   }, [dispatch]);

//   const handleFilter = (type) => {
//     dispatch(fetchTypes(type));
//   };

//   const handleSort = (order) => {
//     dispatch(sortByOrder(order));
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
//       <Filtered handleFilter={handleFilter} handleSort={handleSort} />
//       <Cards pokemons={displayedPokemons} />
//       <Pagination
//         totalPages={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
//         currentPage={currentPage}
//         handlePageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default HomePage;



// containers/HomePage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons, fetchTypes, sortByOrder, setPokemonsPerPage, setCurrentPage } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import Filtered from '../Filtered/Filtered';
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.filteredPokemons);
  const typesFilter = useSelector((state) => state.typesFilter);
  const order = useSelector((state) => state.order);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

  useEffect(() => {
    dispatch(fetchTypes())
    dispatch(fetchPokemons())
    dispatch(setPokemonsPerPage(12));
  }, [dispatch]);

 

  const handleFilter = (type) => {
    dispatch(fetchTypes(type));
  };

  const handleSort = (order) => {
    dispatch(sortByOrder(order));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      
      <Filtered handleFilter={handleFilter} handleSort={handleSort} />
      {pokemons.slice((currentPage - 1) * pokemonsPerPage, currentPage * pokemonsPerPage).map((pokemon) => (
        <Cards key={pokemon.id} pokemon={pokemon} />
      ))}
      <Pagination
        totalPages={Math.ceil(pokemons.length / pokemonsPerPage)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;

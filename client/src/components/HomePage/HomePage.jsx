import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByType,
  filterByOrigin,
  fetchPokemons,
  fetchTypes,
  sortByOrder,
  setPokemonsPerPage,
  setCurrentPage,
  extractTypesFromPokemons,
} from "../../redux/actions";

import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const [typeFilter, setTypeFilter] = useState("");
  const [originFilter, setOriginFilter] = useState("");
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(extractTypesFromPokemons());
    dispatch(setPokemonsPerPage(12));
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    setTypeFilter("");
    setOriginFilter("");
  }, [filteredPokemons]);

  const handleSort = (orderBy, order) => {
    dispatch(sortByOrder(orderBy, order));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleTypeFilterChange = (e) => {
    const selectedType = e.target.value;
    dispatch(filterByType(selectedType));
  };

  const handleOriginFilterChange = (e) => {
    setOriginFilter(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  };

  let filteredDisplayPokemons = filteredPokemons;

  if (typeFilter) {
    filteredDisplayPokemons = filteredDisplayPokemons.filter(
      (pokemon) => pokemon.types && pokemon.types.includes(typeFilter)
    );
  }

  if (originFilter) {
    filteredDisplayPokemons = filteredDisplayPokemons.filter(
      (pokemon) =>
        originFilter === "API" ? !!pokemon.api : originFilter === "DDBB"
    );
  }

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;

  const displayedPokemons = filteredDisplayPokemons.slice(startIndex, endIndex);

  return (
    <div>
      <select onChange={handleTypeFilterChange}>
        <option value="all">Todos los tipos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      <select  onChange={handleOriginFilterChange}>
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
        totalPages={Math.ceil(filteredDisplayPokemons.length / pokemonsPerPage)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;



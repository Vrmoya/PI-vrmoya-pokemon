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
import Style from "../HomePage/HomePage.module.scss";

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
    if (order === "default") {
      // Reiniciar a la ordenación predeterminada
      dispatch(sortByOrder("default", "default"));
    } else {
      dispatch(sortByOrder(orderBy, order));
    }
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
    filteredDisplayPokemons = filteredDisplayPokemons.filter((pokemon) =>
      originFilter === "API" ? !!pokemon.api : originFilter === "DDBB"
    );
  }

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;

  const displayedPokemons = filteredDisplayPokemons.slice(startIndex, endIndex);

  return (
    <div>
      <div className={Style.container}>
        <select className={Style.content} onChange={handleTypeFilterChange}>
          <option value="all">Todos los tipos</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      
        <select className={Style.content} onChange={handleOriginFilterChange}>
          <option value="">Todos los orígenes</option>
          <option value="API">API</option>
          <option value="DDBB">DDBB</option>
        </select>
      
        <select className={Style.content} onChange={(e) => handleSort("name", e.target.value)}>
          <option value="default">Orden predeterminado</option>
          <option value="asc">Ascendente (Nombre)</option>
          <option value="desc">Descendente (Nombre)</option>
        </select>
      
        <select className={Style.content} onChange={(e) => handleSort("attack", e.target.value)}>
          <option value="default">Orden predeterminado</option>
          <option value="asc">Ascendente (Ataque)</option>
          <option value="desc">Descendente (Ataque)</option>
        </select>
      </div>
      <div>
        <Cards pokemons={displayedPokemons} />
      </div>

      <div>
        <Pagination
          totalPages={Math.ceil(
            filteredDisplayPokemons.length / pokemonsPerPage
          )}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;

// Filtered.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes, setFilterTypeAndFilterPokemons } from '../../redux/actions';

const Filtered = ({ handleSort }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const filterType = useSelector((state) => state.filterType);
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const handleTypeChange = (e) => {
    dispatch(setFilterTypeAndFilterPokemons(e.target.value, allPokemons));
  };

  return (
    <div>
      {/* Dropdown para filtrar por tipo */}
      <select value={filterType} onChange={handleTypeChange}>
        <option value="">Todos los tipos</option>
        {types && types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        {/* Agregar opciones para los tipos específicos */}
        <option value="Steel">Steel</option>
        <option value="Water">Water</option>
        <option value="Bug">Bug</option>
        <option value="Dragon">Dragon</option>
        <option value="Electric">Electric</option>
        <option value="Ghost">Ghost</option>
        <option value="Fire">Fire</option>
        <option value="Fairy">Fairy</option>
        {/* Agrega más opciones según sea necesario */}
      </select>

      <select onChange={(e) => handleSort(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default Filtered;




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTypes } from '../../redux/actions';

// const Filtered = ({ handleFilter, handleSort }) => {
//   const dispatch = useDispatch();
//   const types = useSelector((state) => state.types);

//   useEffect(() => {
//     dispatch(fetchTypes());
//   }, [dispatch]);
//tipos de Pokemon: Steel, Water, Bug, Dragon, Electric, Ghost, Fire, Fairy,
//Ice, Fighting, Normal, Grass, Psychic, Rock, Dark, Ground and Flying
//   return (
//     <div>
//       <button onClick={() => handleFilter('water')}>Fuego</button>
//       {/* Agrega más botones para otros tipos */}
//       <select onChange={(e) => handleSort(e.target.value)}>
//         <option value="asc">Ascendente</option>
//         <option value="desc">Descendente</option>
//       </select>
//     </div>
//   );
// };

// export default Filtered;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes, setFilterType, setFilterTypeAndFilterPokemons } from '../../redux/actions';

const Filtered = ({ handleSort }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(setFilterType());
  }, [dispatch]);

  const handleTypeChange = (type) => {
    dispatch(setFilterTypeAndFilterPokemons(type, allPokemons));
  };

  return (
    <div>
      <button onClick={() => handleTypeChange('all')}>Todos los tipos</button>
      <div>
        {types && types.length > 0 ? (
          types.map((type) => (
            <button key={type.id} onClick={() => handleTypeChange(type.name)}>
              {type.name}
            </button>
          ))
        ) : (
          <p>Loading or no types available</p>
        )}
      </div>
      {/* Display filtered Pokemon based on the selected type */}
      {/* {filteredPokemons.map((pokemon) => (
        <div key={pokemon.id}>
           <img src={image} alt={name} className={styles.img} />
      <h4>Name: {name}</h4>
      <p>Type: {type || 'Unknown'}</p>
        </div>
      ))} */}
      {/* <select onChange={(e) => handleSort(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select> */}
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

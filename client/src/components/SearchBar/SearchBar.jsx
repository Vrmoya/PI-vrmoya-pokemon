// SearchBar.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Llama a la acción fetchPokemons con el término de búsqueda
    dispatch(fetchPokemons(searchTerm.trim()));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;



import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../../redux/actions';
import styles from "../SearchBar/SearchBar.module.scss"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {

    dispatch(fetchPokemons(searchTerm.trim()));
    
    console.log('Antes de la actualización:', searchTerm);
  
  
    setSearchTerm('');
  
  
  };
  

  return (
    <div className={styles.container}>
      <input
        type="search"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;


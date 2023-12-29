// components/Cards/Cards.jsx
import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.scss';

const Cards = ({ pokemons }) => {
  return (
    <div className={styles.Container}>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          speed={pokemon.speed}
          height={pokemon.height}
          weight={pokemon.weight}
          typeData={pokemon.typeData}
        />  
      ))}
    </div>
  );
};

export default Cards;




// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPokemons } from '../../redux/actions';
// import Card from '../Card/Card';
// import styles from '../Cards/Cards.module.scss';

// const Cards = ({ searchTerm }) => {
//   const dispatch = useDispatch();
//   const pokemons = useSelector((state) => state.pokemons);
//   const currentPage = useSelector((state) => state.currentPage);
//   const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

//   // useEffect(() => {
//   //   dispatch(fetchPokemons(searchTerm));
//   // }, [dispatch, searchTerm]);

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * pokemonsPerPage;
//   const endIndex = startIndex + pokemonsPerPage;

//   // Get the subset of pokemons to display
//   const displayedPokemons = pokemons.slice(startIndex, endIndex);

//   return (
//     <div className={styles.Container}>
//       {displayedPokemons.map((pokemon) => (
//         <Card
//           key={pokemon.id}
//           id={pokemon.id}
//           name={pokemon.name}
//           image={pokemon.image}
//           hp={pokemon.hp}
//           attack={pokemon.attack}
//           defense={pokemon.defense}
//           speed={pokemon.speed}
//           height={pokemon.height}
//           weight={pokemon.weight}
//           typeData={pokemon.typeData}
//         />
//       ))}
//     </div>
//   );
// };

// export default Cards;




// const Cards = ({ searchTerm }) => {
//   const dispatch = useDispatch();
//   const pokemons = useSelector((state) => state.pokemons);

//   useEffect(() => {
//     dispatch(fetchPokemons(searchTerm));
//   }, [dispatch, searchTerm]);

//   return (
//     <div>
//       {/* Renderiza tus cards utilizando el componente Card */}
//       {pokemons.map((pokemon) => (
//         <Card 
//         key={pokemon.id}
//         id={pokemon.id}
//         name={pokemon.name}
//         image={pokemon.image}
//         hp={pokemon.hp}
//         attack={pokemon.attack}
//         defense={pokemon.defense}
//         speed={pokemon.speed}
//         height={pokemon.height}
//         weight={pokemon.weight} 
//         />
//       ))}
//     </div>
//   );
// };

// export default Cards;

import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

const Card = ({
  id,// En el componente Cards
  const Cards = ({ pokemons }) => {
    return (
      <div className={styles.Container}>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.api ? `api_${pokemon.id}` : `db_${pokemon.id}`}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
            type={pokemon.type || 'Unknown Type'}  // Proporciona un valor predeterminado
            api={pokemon.api}
          />
        ))}
      </div>
    );
  };
  
  // En el componente Card
  const Card = ({
    id,
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    type,
    api,
  }) => {
    const prefixedId = api ? `api_${id}` : `db_${id}`;
  
    return (
      <Link to={`/pokemon/${id}`} className={styles.link}>
        <div className={styles.card}>
          <img src={image} alt={name} className={styles.img} />
          <h4>Name: {name}</h4>
          <div className={styles.p}>
            <p>Type: {type}</p>
            <p>Attack: {attack}</p>
            <p>HP: {hp}</p>
          </div>
        </div>
      </Link>
    );
  };
  
  export default Card;
  
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  type,
  api,
}) => {

  
  return (
    <Link to={`/pokemon/${id}`} className={styles.link}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.img} />
        <h4>Name: {name}</h4>
        <div className={styles.p}>
          <p>Type: {type || 'Unknown'}</p>
          <p>Attack: {attack}</p>
          <p>HP: {hp}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

  
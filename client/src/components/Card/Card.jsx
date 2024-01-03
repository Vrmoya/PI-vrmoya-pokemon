import { Link } from 'react-router-dom';
import styles from './Card.module.scss'

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
}) => {
  return (
  <Link to={`/pokemon/${id}`} className={styles.link}>
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.img} />
      <h4>Name: {name}</h4>
      <p>Type: {type || 'Unknown'}</p>
      
    </div>
    </Link>
  );
};

export default Card;


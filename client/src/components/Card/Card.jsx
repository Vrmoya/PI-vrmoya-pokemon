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
  typeData,
}) => {
  return (
    <div>
      <img src={image} alt={name} />
      <p>Name: {name}</p>
      <p>Type: {typeData || 'Unknown'}</p>
    </div>
  );
};

export default Card;

// const Card = ({handleClick,
//   id,
//   name,
//   image,
//   hp,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   types

// }) => {
//   return (
//     <div onClick={() => handleClick(id)}>
//       <img src={image} alt={name} />
//       <p>{name}</p>
//       <p>{hp}</p>
//       <p>{attack}</p>
//       <p>{defense}</p>
//       <p>{speed}</p>
//       <p>{height}</p>
//       <p>{weight}</p>
//       <p>{types.join(', ')}</p>
//     </div>
//   );
// };

// export default Card;

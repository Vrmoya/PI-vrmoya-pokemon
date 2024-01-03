import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonById } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.selectedPokemon);

  useEffect(() => {
   
    if (id) {
      dispatch(fetchPokemonById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {pokemon && pokemon.name && (
        <>
          <div>
           
            <img src={pokemon.image} alt={pokemon.name} />
            Name: {pokemon.name}
            Hp: {pokemon.hp}
            Attack: {pokemon.attack}
            Defense: {pokemon.defense}
            Speed: {pokemon.speed}
            Height: {pokemon.height}
            Weight: {pokemon.weight}
            Type: {pokemon.type}
          </div>
        </>
      )}
      {!pokemon && <p>Loading...</p>}
      {pokemon && !pokemon.name && <p>Pokemon not found</p>}
    </div>
  );
};

export default Detail;



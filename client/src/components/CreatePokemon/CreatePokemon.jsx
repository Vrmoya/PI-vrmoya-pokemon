import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon, fetchTypes } from "../../redux/actions";
import Validate from "../CreatePokemon/Validate";
import styles from "./CreatePokemon.module.scss";




const CreatePokemon = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.types);

  const initialState = {
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    type: [],
  };

  const [newPokemon, setNewPokemon] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);




  const handleChange = (event) => {
  setNewPokemon({
    ...newPokemon,
    [event.target.name]: event.target.value,
  });

  const validationErrors = Validate({
    ...newPokemon,
    [event.target.name]: event.target.value,
  });

  console.log("Datos actualizados:", newPokemon);
  console.log("Errores actualizados:", validationErrors);

  setErrors(validationErrors);
};


  const handleTypeChange = (event) => {
    const selectedTypes = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setNewPokemon((prevPokemon) => ({
      ...prevPokemon,
      type: selectedTypes,
    }));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.value.trim();

    // Verificar si se proporciona una URL de imagen
    if (selectedImage !== "") {
      // Validar y procesar la imagen según tus necesidades
      setNewPokemon((prevPokemon) => ({
        ...prevPokemon,
        image: selectedImage,
      }));

      // Actualizar la validación del campo de imagen
      const validationErrors = Validate({
        ...newPokemon,
        image: selectedImage,
      });
      setErrors(validationErrors);
    } else {
      // Si no se proporciona una URL, asignar la URL de la imagen por defecto
      setNewPokemon((prevPokemon) => ({
        ...prevPokemon,
        image: "https://images.wikidexcdn.net/mwuploads/wikidex/f/f9/latest/20160625150820/Blitzle.png",
      }));

      // Limpiar el error asociado con la imagen
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "",
      }));
    }
  };
  
  const resetForm = () => {
    setNewPokemon(initialState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos antes de enviar:", newPokemon);
    console.log("Errores antes de enviar:", errors);
    // Validaciones adicionales antes de enviar el formulario
    const formValid = Object.values(errors).every((value) => value === "");

    if (formValid) {
      console.log("Datos a enviar:", newPokemon);
      // Llamar a la acción para crear el Pokémon
      dispatch(crearPokemon(newPokemon));

      // Reiniciar el formulario después de enviar con éxito
      resetForm();
    } else {
      // Manejar el caso en que el formulario no sea válido
      console.error("Formulario no válido");
    }
  };

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.card}>
          <h2 className={styles.h1}>Crea tu pokemon</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label className={styles.text} htmlFor="name">
                Name
              </label>
              <input
                className={styles.input}
                placeholder="name"
                type="text"
                name="name"
                value={newPokemon.name}
                onChange={handleChange}
              />
              <p>{errors.name}</p>
            </div>

            <div>
              <label className={styles.text} htmlFor="hp">
                HP
              </label>
              <input
                className={styles.input}
                placeholder="hp"
                type="number"
                name="hp"
                value={newPokemon.hp}
                onChange={handleChange}
              />
              <p>{errors.hp}</p>
            </div>

            <div>
              <label className={styles.text} htmlFor="attack">
                ATTACK
              </label>
              <input
                className={styles.input}
                placeholder="attack"
                type="number"
                name="attack"
                value={newPokemon.attack}
                onChange={handleChange}
              />
              <p>{errors.attack}</p>
            </div>
            <div>
              <label className={styles.text} htmlFor="defense">
                DEFENSE
              </label>
              <input
                className={styles.input}
                placeholder="defense"
                type="number"
                name="defense"
                value={newPokemon.defense}
                onChange={handleChange}
              />
              <p>{errors.defense}</p>
            </div>
            <div>
              <label className={styles.text} htmlFor="speed">
                SPEED
              </label>
              <input
                className={styles.input}
                placeholder="speed"
                type="number"
                name="speed"
                value={newPokemon.speed}
                onChange={handleChange}
              />
              <p>{errors.speed}</p>
            </div>
            <div>
              <label className={styles.text} htmlFor="weight">
                WEIGHT
              </label>
              <input
                className={styles.input}
                placeholder="weight"
                type="number"
                name="weight"
                value={newPokemon.weight}
                onChange={handleChange}
              />
              <p>{errors.weight}</p>
            </div>
            <div>
              <label className={styles.text} htmlFor="height">
                HEIGHT
              </label>
              <input
                className={styles.input}
                placeholder="height"
                type="number"
                name="height"
                value={newPokemon.height}
                onChange={handleChange}
              />
              <p>{errors.height}</p>
            </div>
            <div>
              <label className={styles.text} htmlFor="image">
                Imagen URL
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="URL de la imagen"
                name="image"
                value={newPokemon.image}
                onChange={handleImageChange}
              />
              <p>{errors.image}</p>
            </div>

            <div>
              <label className={styles.text} htmlFor="types">
                TYPE
              </label>
              <select
                className={styles.types}
                name="type"
                onChange={handleTypeChange}
              >
                <option>Seleccionar tipo</option>
                {type.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <button className={styles.button} type="submit">
              Guardar Pokemon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePokemon;

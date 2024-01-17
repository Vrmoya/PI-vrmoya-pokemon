import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon, fetchTypes } from "../../redux/actions";
import Validate from "./Validate";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [newPokemon, setNewPokemon] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    types: [],
  });

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validar solo el campo modificado
    const fieldErrors = Validate({ [name]: value });
    
    setNewPokemon((prevPokemon) => ({
      ...prevPokemon,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || "",
    }));
  };

  const handleTypeChange = (event) => {
    const selectedTypes = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setNewPokemon((prevPokemon) => ({
      ...prevPokemon,
      types: selectedTypes,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      types: selectedTypes.length > 0 ? "" : "Must choose a pokemon type",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar el formulario
    const formErrors = Validate(newPokemon);

    setErrors(formErrors);

    // Verificar si hay algún error en el formulario
    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    if (!hasErrors) {
      // Llamar a la acción para crear el Pokémon
      dispatch(crearPokemon(newPokemon));
    } else {
      // Manejar el caso en que el formulario no sea válido
      console.error("Formulario no válido");
    }
  };

  return (
    <div>
      <form>
        {/* ... (resto del código) */}
      </form>
    </div>
  );
};

export default CreatePokemon;

  



// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { crearPokemon, fetchTypes } from "../../redux/actions";
// import Validate from "./Validate";

// const CreatePokemon = () => {
//   const dispatch = useDispatch();
//   const types = useSelector((state) => state.types);

//   const [newPokemon, setNewPokemon] = useState({
//     name: "",
//     image: "",
//     hp: "",
//     attack: "",
//     defense: "",
//     speed: "",
//     weight: "",
//     height: "",
//     types: [],
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     image: "",
//     hp: "",
//     attack: "",
//     defense: "",
//     speed: "",
//     weight: "",
//     height: "",
//     types: [], // Asegúrate de que el estado inicial sea un array para types
//   });

//   useEffect(() => {
//     dispatch(fetchTypes());
//   }, [dispatch]);

//   const handleChange = (event) => {
//     setNewPokemon({
//       ...newPokemon,
//       [event.target.name]: event.target.value,
//     });

//     setErrors({
//       ...errors,
//       [event.target.name]: Validate({
//         [event.target.name]: event.target.value,
//       }),
//     });
//   };

//   const handleTypeChange = (event) => {
//     const selectedTypes = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );

//     setNewPokemon({
//       ...newPokemon,
//       types: selectedTypes,
//     });

//     setErrors({
//       ...errors,
//       types: Validate({
//         types: selectedTypes,
//       }),
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validaciones adicionales antes de enviar el formulario
//     const formValid = Object.values(errors).every((value) => value === "");

//     if (formValid) {
//       // Llamar a la acción para crear el Pokémon
//       dispatch(crearPokemon(newPokemon));
//     } else {
//       // Manejar el caso en que el formulario no sea válido
//       console.error("Formulario no válido");
//     }
//   };

//   return (
//     <div>
//       <form>
//         {/* ... (resto de los campos) */}

//         {/* Mostrar mensajes de error */}
//         {Object.keys(errors).map((key) => (
//           errors[key] && <p key={key} className="error-message">{errors[key]}</p>
//         ))}

//         <button type="submit" onClick={handleSubmit}>
//           Guardar Pokemon
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePokemon;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { crearPokemon } from "../../redux/actions"; // Asegúrate de importar la acción adecuada
// import Validate from "./Validate";

// const CreatePokemon = () => {
//   const dispatch = useDispatch();
//   const types = useSelector((state) => state.types);

//   const [newPokemon, setNewPokemon] = useState({
//     name: "",
//     image: "",
//     hp: "",
//     attack: "",
//     defense: "",
//     speed: "",
//     weight: "",
//     height: "",
//     types: [],
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     image: "",
//     hp: "",
//     attack: "",
//     defense: "",
//     speed: "",
//     weight: "",
//     height: "",
//     types: "",
//   });

//   const handleChange = (event) => {
//     setNewPokemon({
//       ...newPokemon,
//       [event.target.name]: event.target.value,
//     });

//     setErrors({
//       ...errors,
//       [event.target.name]: Validate({
//         [event.target.name]: event.target.value,
//       }),
//     });
//   };

//   const handleTypeChange = (event) => {
//     const selectedTypes = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );

//     setNewPokemon({
//       ...newPokemon,
//       types: selectedTypes,
//     });

//     setErrors({
//       ...errors,
//       types: Validate({
//         types: selectedTypes,
//       }),
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validaciones adicionales antes de enviar el formulario
//     const formValid = Object.values(errors).every((value) => value === "");

//     if (formValid) {
//       // Llamar a la acción para crear el Pokémon
//       dispatch(crearPokemon(newPokemon));
//     } else {
//       // Manejar el caso en que el formulario no sea válido
//       console.error("Formulario no válido");
//     }
//   };

//   return (
//     <div>
//       <form>
//         {/* ... (resto de los campos) */}

//         {/* Mostrar mensajes de error */}
//         {Object.keys(errors).map((key) => (
//           errors[key] && <p key={key} className="error-message">{errors[key]}</p>
//         ))}

//         <button type="submit" onClick={handleSubmit}>
//           Guardar Pokemon
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePokemon;

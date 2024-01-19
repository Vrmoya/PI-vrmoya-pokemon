// ... Importaciones y código previo ...

const CreatePokemon = () => {
  // ... Código previo ...

  const handleImageChange = (event) => {
    const selectedImage = event.target.value.trim();

    setNewPokemon((prevPokemon) => ({
      ...prevPokemon,
      image: selectedImage,
    }));

    // Limpiar el error asociado con la imagen
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar el formulario
    const validationErrors = Validate(newPokemon);
    setErrors(validationErrors);

    // Verificar si hay errores
    const formValid = Object.values(validationErrors).every((value) => value === "");

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

  // ... Código posterior ...
};


// // ... (Importaciones y código anterior)

// const CreatePokemon = () => {
//   // ... (Código anterior)

//   return (
//     <div>
//       <div className={styles.Container}>
//         <div className={styles.card}>
//           <h2 className={styles.h1}>Crea tu pokemon</h2>

//           <form className={styles.form} onSubmit={handleSubmit}>
//             {/* ... (Otros campos del formulario) */}
            
//             <div>
//               <label className={styles.text} htmlFor="image">
//                 Imagen (URL)
//               </label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="URL de la imagen"
//                 name="image"
//                 value={newPokemon.image}
//                 onChange={handleChange}
//               />
//               <p>{errors.image}</p>
//             </div>

//             {/* ... (Otros campos del formulario) */}

//             <div>
//               <label className={styles.text} htmlFor="types">
//                 TYPE
//               </label>
//               <select
//                 className={styles.types}
//                 name="type"
//                 onChange={handleTypeChange}
//               >
//                 {/* ... (Opciones del tipo) */}
//               </select>
//             </div>

//             <button className={styles.button} type="submit">
//               Guardar Pokemon
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePokemon;


// import React, { useState, useEffect } from "react";
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
//     types: [],
//   });

//   useEffect(() => {
//     dispatch(fetchTypes());
//   }, [dispatch]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Validar solo el campo modificado
//     const fieldErrors = Validate({ [name]: value });
    
//     setNewPokemon((prevPokemon) => ({
//       ...prevPokemon,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: fieldErrors[name] || "",
//     }));
//   };

//   const handleTypeChange = (event) => {
//     const selectedTypes = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );

//     setNewPokemon((prevPokemon) => ({
//       ...prevPokemon,
//       types: selectedTypes,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       types: selectedTypes.length > 0 ? "" : "Must choose a pokemon type",
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validar todos los campos antes de enviar el formulario
//     const formErrors = Validate(newPokemon);

//     setErrors(formErrors);

//     // Verificar si hay algún error en el formulario
//     const hasErrors = Object.values(formErrors).some((error) => error !== "");

//     if (!hasErrors) {
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
//         {/* ... (resto del código) */}
//       </form>
//     </div>
//   );
// };

// export default CreatePokemon;

  



// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { crearPokemon, fetchTypes } from "../../redux/actions";
// // import Validate from "./Validate";

// // const CreatePokemon = () => {
// //   const dispatch = useDispatch();
// //   const types = useSelector((state) => state.types);

// //   const [newPokemon, setNewPokemon] = useState({
// //     name: "",
// //     image: "",
// //     hp: "",
// //     attack: "",
// //     defense: "",
// //     speed: "",
// //     weight: "",
// //     height: "",
// //     types: [],
// //   });

// //   const [errors, setErrors] = useState({
// //     name: "",
// //     image: "",
// //     hp: "",
// //     attack: "",
// //     defense: "",
// //     speed: "",
// //     weight: "",
// //     height: "",
// //     types: [], // Asegúrate de que el estado inicial sea un array para types
// //   });

// //   useEffect(() => {
// //     dispatch(fetchTypes());
// //   }, [dispatch]);

// //   const handleChange = (event) => {
// //     setNewPokemon({
// //       ...newPokemon,
// //       [event.target.name]: event.target.value,
// //     });

// //     setErrors({
// //       ...errors,
// //       [event.target.name]: Validate({
// //         [event.target.name]: event.target.value,
// //       }),
// //     });
// //   };

// //   const handleTypeChange = (event) => {
// //     const selectedTypes = Array.from(
// //       event.target.selectedOptions,
// //       (option) => option.value
// //     );

// //     setNewPokemon({
// //       ...newPokemon,
// //       types: selectedTypes,
// //     });

// //     setErrors({
// //       ...errors,
// //       types: Validate({
// //         types: selectedTypes,
// //       }),
// //     });
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     // Validaciones adicionales antes de enviar el formulario
// //     const formValid = Object.values(errors).every((value) => value === "");

// //     if (formValid) {
// //       // Llamar a la acción para crear el Pokémon
// //       dispatch(crearPokemon(newPokemon));
// //     } else {
// //       // Manejar el caso en que el formulario no sea válido
// //       console.error("Formulario no válido");
// //     }
// //   };

// //   return (
// //     <div>
// //       <form>
// //         {/* ... (resto de los campos) */}

// //         {/* Mostrar mensajes de error */}
// //         {Object.keys(errors).map((key) => (
// //           errors[key] && <p key={key} className="error-message">{errors[key]}</p>
// //         ))}

// //         <button type="submit" onClick={handleSubmit}>
// //           Guardar Pokemon
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePokemon;


// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { crearPokemon } from "../../redux/actions"; // Asegúrate de importar la acción adecuada
// // import Validate from "./Validate";

// // const CreatePokemon = () => {
// //   const dispatch = useDispatch();
// //   const types = useSelector((state) => state.types);

// //   const [newPokemon, setNewPokemon] = useState({
// //     name: "",
// //     image: "",
// //     hp: "",
// //     attack: "",
// //     defense: "",
// //     speed: "",
// //     weight: "",
// //     height: "",
// //     types: [],
// //   });

// //   const [errors, setErrors] = useState({
// //     name: "",
// //     image: "",
// //     hp: "",
// //     attack: "",
// //     defense: "",
// //     speed: "",
// //     weight: "",
// //     height: "",
// //     types: "",
// //   });

// //   const handleChange = (event) => {
// //     setNewPokemon({
// //       ...newPokemon,
// //       [event.target.name]: event.target.value,
// //     });

// //     setErrors({
// //       ...errors,
// //       [event.target.name]: Validate({
// //         [event.target.name]: event.target.value,
// //       }),
// //     });
// //   };

// //   const handleTypeChange = (event) => {
// //     const selectedTypes = Array.from(
// //       event.target.selectedOptions,
// //       (option) => option.value
// //     );

// //     setNewPokemon({
// //       ...newPokemon,
// //       types: selectedTypes,
// //     });

// //     setErrors({
// //       ...errors,
// //       types: Validate({
// //         types: selectedTypes,
// //       }),
// //     });
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     // Validaciones adicionales antes de enviar el formulario
// //     const formValid = Object.values(errors).every((value) => value === "");

// //     if (formValid) {
// //       // Llamar a la acción para crear el Pokémon
// //       dispatch(crearPokemon(newPokemon));
// //     } else {
// //       // Manejar el caso en que el formulario no sea válido
// //       console.error("Formulario no válido");
// //     }
// //   };

// //   return (
// //     <div>
// //       <form>
// //         {/* ... (resto de los campos) */}

// //         {/* Mostrar mensajes de error */}
// //         {Object.keys(errors).map((key) => (
// //           errors[key] && <p key={key} className="error-message">{errors[key]}</p>
// //         ))}

// //         <button type="submit" onClick={handleSubmit}>
// //           Guardar Pokemon
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreatePokemon;

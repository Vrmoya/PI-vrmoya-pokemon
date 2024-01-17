export default function Validate(inputs) {
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;
  
    if (!inputs.name.trim()) {
      errors.name = 'A name is required';
      } else if (!RegExpression.test(inputs.name)) {
      errors.name = 'Numbers or special characters are not allowed';
    } else if (inputs.name.length > 18) {
      errors.name = `The name can't be longer than 18 characters`;
    }
  
    const validateStat = (stat, min, max, statName) => {
      if (isNaN(stat) || stat < min || stat > max) {
        errors[statName] = `The ${statName} of the Pokemon must be between ${min} and ${max}`;
      }
    };
  
    validateStat(inputs.hp, 1, 150, 'hp');
    validateStat(inputs.attack, 1, 200, 'attack');
    validateStat(inputs.defense, 1, 200, 'defense');
    validateStat(inputs.speed, 1, 100, 'speed');
    validateStat(inputs.weight, 1, 1500, 'weight');
    validateStat(inputs.height, 1, 80, 'height');
  
    if (!inputs.types.length) {
      errors.types = 'Must choose a pokemon type';
    } else if (inputs.types.length > 2) {
      errors.types = `You can't choose more than 2 types per Pokemon`;
    }
  
    return errors;
  }
  
  
  


// export default function validate(inputs){
//     let errors = {};
//     let RegExpression = /^[a-zA-Z\s]*$/;  

//     if(!input.name){
//         errors.name = 'A name is required'
//     }
//     if(pokemons.indexOf( inputs.name ) !== -1){
//         errors.name = 'A pokemon with that name is already existing'
//     }
//     if(!RegExpression.test(inputs.name)){
//         errors.name = 'Numbers or special characters are not allowed'
//     }
//     if(inputs.name.length > 18){
//         errors.name = `The name can't be longer than 18 characters`
//     }

//     if(inputs.hp < 1 || inputs.hp > 150){
//         if(inputs.hp < 1 ){
//             errors.hp = 'The life of the Pokemon must be higher than 1'
//         }
//         if( inputs.hp > 150){
//             errors.hp = 'The life of the Pokemon must be less than 150'
//         } 
//     }
//     if(inputs.attack < 1 || inputs.attack > 200){
//         if(inputs.attack < 1 ){
//             errors.attack = 'The attack of the Pokemon must be higher than 1'
//         }
//         if( inputs.attack > 200){
//             errors.attack = 'The attack of the Pokemon must be less than 200'
//         } 
//     }
//     if(inputs.defense < 1 || inputs.defense > 200){
//         if(inputs.defense < 1 ){
//             errors.defense = 'The defense of the Pokemon must be higher than 1'
//         }
//         if( inputs.defense > 200){
//             errors.defense = 'The defense of the Pokemon must be less than 200'
//         } 
//     }
//     if(inputs.speed < 1 || inputs.speed > 100){
//         if(inputs.speed < 1 ){
//             errors.speed = 'The speed of the Pokemon must be higher than 1'
//         }
//         if( inputs.speed > 100){
//             errors.speed = 'The speed of the Pokemon must be less than 100'
//         } 
//     }
//     if(inputs.weight < 1 || inputs.weight > 1500){
//         if(inputs.weight < 1 ){
//             errors.weight = 'The weight of the Pokemon must be higher than 1'
//         }
//         if( inputs.weight > 1500){
//             errors.weight = 'The weight of the Pokemon must be less than 1500'
//         } 
//     }
//     if(inputs.height < 1 || inputs.height > 80){
//         if(inputs.height < 1 ){
//             errors.height = 'The height of the Pokemon must be higher than 1 dam'
//         }
//         if( inputs.height > 80){
//             errors.height = 'The height of the Pokemon must be less than 80 dam'
//         } 
//     }

//     if(!inputs.types.length){
//         errors.types = 'Must choose a pokemon type'
//     }
//     if(inputs.types.length > 2){
//         errors.types = `You can't choose more than 2 types per Pokemon`
//     }
    
//     return errors;
// }
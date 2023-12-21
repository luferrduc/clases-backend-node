// Original
// const suma = (num1, num2) => {
//   if(!num1 || !num2) return 0
//   if(typeof num1 !== 'number' || typeof num2 !== 'number') return null
//   const result = num1 + num2
//   return result
// }


// const suma = (...numeros) => {
//   let resultado = 0
//   if(numeros.length === 0) return 0
//   for(let i=0; i<numeros.length; i++){
//     if(typeof numeros[i] !== 'number'){
//       return null
//     }
//     resultado+= numeros[i]
//   }
//   return resultado

// }

// Refactoring

const suma = (...numeros) => {
  if(numeros.length === 0) return 0
  if(!numeros.every((numero) => typeof numero === 'number')) return null
  return numeros.reduce((acc, current) => acc + current)
}

const resultadoTest = suma(1,2,3,4,5)
console.log(resultadoTest)

// Criterios de aceptación
let testPasados = 0
const testTotales = 4

// 1. la función devovler null si algún parámetro no es de tipo numérico
const resultadoTest1 = suma("2", 2)
// 2. La función debe devolver 0 si no se pasó ningún parámetro
const resultadoTest2 = suma()
// 3. La funcion debe poder 

// 4. 
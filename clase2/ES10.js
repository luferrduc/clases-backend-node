const cadena1 = `     Hola Mundo`
const cadena2 = cadena1.trim()

console.log(cadena1.length, cadena1)
console.log(cadena2.length, cadena2)

// Eliminar anidamiento en arreglos
const arregloAnidado = [[1,2],[3,4],[5,6]]
const arregloProcesado = arregloAnidado.flat()
console.log(arregloProcesado)

// Eliminar más de 1 anidamiento
const arregloAnidado2 = [[1,2],[3,4],[5,6,[7,8]]]
const arregloProcesado2 = arregloAnidado2.flat(2)
console.log(arregloProcesado2)

// NULLISH OPERATOR
// const prueba = undefined
const prueba = 0
const variablePorDefecto = prueba || "Sin valor" // Funciona con los falsy values
const nullish = prueba ?? "Sin valor" // En el caso de que sea null o undefined

console.log(variablePorDefecto)
console.log(nullish)
const objeto1 = {
    impuesto1: 12,
    impuesto2: 42,
    impuesto3: 35
}   

// Obtener las claves del objeto
const claves = Object.keys(objeto1)
console.log(claves)
// Obtener los valores
const valores = Object.values(objeto1)
console.log(valores)
// Obtener las entradas
const parLlaveValor = Object.entries(objeto1)
console.log(parLlaveValor)

// reduce 
// Existen dos posibilidades de usar el reduce
// array.reduce((acc, current, index) => { logica }) O array.reduce((initValue, accumulator) => { logica })
// array.reduce((acc, current, index) => { logica }, initValue)

const impuestosTotales = valores.reduce((acc, current) => console.log(acc))

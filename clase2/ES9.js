
const objeto1 = {
    propiedad1: 2,
    propiedad2: 'b',
    propiedad3: true
}
const objeto2 = {
    propiedad4: 'c',
    propiedad5: [1,2,3,4,5],
}

// Spread desctructuring

// const propiedad1 = objeto1.propiedad1
// const propiedad2 = objeto1.propiedad2

const {propiedad1, propiedad2} = objeto1
console.log(propiedad1, propiedad2)

const objetoResultado = {
    ...objeto1,
    ...objeto2
}
console.log(objetoResultado) 

// REST Operator

const objeto3 = {
    propiedad1: 2,
    propiedad2: 'b',
    propiedad3: true
} 

const {propiedad1: propiedadObjeto3, ...result} = objeto3
console.log(propiedadObjeto3)
console.log(result)

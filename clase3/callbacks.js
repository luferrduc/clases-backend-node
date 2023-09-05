const valoresOriginales = [1,2,3,4,5,6]

const valoresConMap = valoresOriginales.map(valor => valor+1)
console.log(valoresConMap)

const funcionCallback = (valor) => {
    if(valor % 2 === 0){
        return valor;
    }else{
        return 'No es par'
    }
}

const valoresPares = valoresOriginales.map(funcionCallback)
console.log(valoresPares)

const miFuncionMap = (arreglo, callback) => {
    const nuevoArreglo = []
    for(let i=0; i< arreglo.length; i++){
        const nuevoValor = callback(arreglo[i])
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo
}

const resultadoMapPropio = miFuncionMap(valoresOriginales, x => x*2)
console.log(resultadoMapPropio)
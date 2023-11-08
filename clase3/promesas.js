const dividir = (dividendo, divisor) => {
    return  new Promise((resolve, reject) => {
        if(divisor === 0){
            reject('No se puede dividir por cero')
        }else{
            resolve(dividendo/divisor)
        }
    })
}

dividir(6,1)
    .then(result => console.log(result))

dividir(6,0)
    .then(result => console.log(result))
    .catch(error => console.log(error))


dividir(5,2)
    .then(result => console.log(result))
    .then(result2 => console.log(result2*3))
    .catch(error => console.log(error))


const funcionAsincrona = async (num1, num2) => {
    try {
        const resultado = await dividir(num1,num2)
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
}
funcionAsincrona(10,2)
funcionAsincrona(10,0)

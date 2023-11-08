const fs = require('node:fs/promises')

const opreacionesArchivosAsincronos = async () => {
    try {
        await fs.writeFile('./fs-promises.txt', 'Hola mundo desde promesas')
        let resultado = await fs.readFile('./fs-promises.txt', 'utf-8')
        console.log(resultado)

        await fs.appendFile('./fs-promises.txt', '\nMás contenido')
        resultado = await fs.readFile('./fs-promises.txt', 'utf-8')
        console.log(resultado)
        
        await fs.unlink('./fs-promises.txt') 
    } catch (error) {
        console.log(error)
    }
}

opreacionesArchivosAsincronos()
const fs = require('node:fs')

// Implementación de archivos de manera sincrónica

fs.writeFileSync('./ejemplo.txt', 'Hola coder estamos trabajando con un archivo')
if(fs.existsSync('./ejemplo.txt')){
    let content = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(content)
    fs.appendFileSync('./ejemplo.txt', '\nMás contenido')
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)

    fs.unlinkSync('./ejemplo.txt')
}



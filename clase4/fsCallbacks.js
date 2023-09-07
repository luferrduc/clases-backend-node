const fs = require('node:fs')

fs.writeFile('./archivoCallback.txt', 'Hola mundo, estoy trabajando con archivos usando callbacks', (error)=>{
    if(error){
        throw new Error(`Error en la creación del archivo ${error}`)
    }

    fs.readFile('./archivoCallback.txt', 'utf-8', (error, contenido)=>{
        if(error){
            throw new Error('Error en la lectura del archivo')
        }

        console.log("1. "+contenido)

        fs.appendFile('./archivoCallback.txt', '\nMás contenido', (error)=>{
            if(error){
                throw new Error(`Error en la actualización del archivo ${error}`)
            }

            fs.readFile('./archivoCallback.txt', 'utf-8', (error, contenido)=>{
                if(error){
                    throw new Error('Error en la lectura del archivo')
                }
         
                console.log("2. "+contenido)

                fs.unlink('./archivoCallback.txt', (error)=>{
                    if(error){
                        throw new Error(`Error al eliminar el archivo ${error}`)
                    }
                })
            })
        })
    })

})
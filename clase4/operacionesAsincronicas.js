const temporizador = (callback)=>{
    setTimeout(()=> {
        callback()
    }, 5000)
}

const operacion = () => console.log('Realizando operación')
console.log('Inicio de tareas')
temporizador(operacion)
console.log('Fin de tareas')
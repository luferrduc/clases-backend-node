const contador = () => {
    let contador = 1
    const timer = setInterval(() => {
        contador++
        console.log(contador)
        if(contador > 5){
            clearInterval(timer)
        }
    }, 2000)   
}

console.log('Inicio tareas')
contador()
console.log('Fin de tareas')
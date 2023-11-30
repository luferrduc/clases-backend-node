process.on('exit', code => {
  console.log(code)
})

process.on('uncaughtException', error => {
  console.log("Atrapa excepciones que no fueron controladas")
})

process.on("message")

console.log('Probando listeners')
console.log(variable)
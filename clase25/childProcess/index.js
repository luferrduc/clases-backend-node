import express from "express"
import { fork } from "node:child_process"

const app = express()
const PORT = 8080

function operacionCompleja() {
  let result = 0
  for(let i=0; i<5e9; i++){
    result+=i
  }
  return result
}

app.get('/suma', (req, res) => {
  const result = operacionCompleja()
  return res.send(`Resultado ${result}`)
})

app.get('/suma-no-bloq', (req, res) => {
  const chlid = fork('./operacionCompleja.js')
  chlid.send("Inicia el cálculo complejo por favor")
  chlid.on("message", result => {
    return res.send(`Resultado: ${result}`)
  })
})


app.get('/test', (req, res) => {
  
  return res.send(`Hola mundo`)
})



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})




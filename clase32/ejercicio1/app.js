import express from "express"
import compression from "express-compression"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(compression({
  brotli: {
    enabled: true, 
    zlib: {}
  }
}))


app.get('/string', (req, res) => {
  let myString = 'Hola coders, este endpoint tiene la respuesta muy pesada'
  for(let i=0; i < 100000; i++){
    myString += 'Hola coders, este endpoint es muy pesado'
  }
  return res.send(myString)
})


app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
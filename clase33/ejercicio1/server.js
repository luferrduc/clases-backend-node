import express from 'express'
const app = express()

app.get('/test', (req, res) => {
  res.send('Hola mundo asd')
})

app.listen(8080)
console.log(`server on ${8080}`)
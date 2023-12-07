import express from "express"
import cors from "cors"

const app = express()
app.use(cors({
  origin: ['https://coderhouse.com']
}))

app.get("/", (req, res) => {
  res.json({message: "Saludos clase 5575"})
  
})

app.listen(8081, () => {
  console.log("Server listening")
})
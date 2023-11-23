import express from "express"
import dictionaryRouter from "./routes/dictionary.routes.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/dictionary", dictionaryRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
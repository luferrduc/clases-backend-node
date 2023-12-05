import express from "express"
import usersRouter from "./routes/users.routes.js"
import toysRouter from "./routes/toys.routes.js"

const app = express()
const PORT = 8080

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/toys', toysRouter)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
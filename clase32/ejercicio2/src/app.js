import express from "express"
import usersRouter from "./routes/users.routes.js"
import errorHandler from "./middlewares/errors/index.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use("/api/users", usersRouter)


app.use(errorHandler)

app.listen(PORT)
console.log(`Server on port ${PORT}`)
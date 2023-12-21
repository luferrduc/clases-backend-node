import express from "express"
import usersRouter from "./routes/users.routes.js"


const app = express()
const PORT = 8090

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/users", usersRouter)



app.listen(PORT)
console.log(`Server listening on port ${PORT}`)
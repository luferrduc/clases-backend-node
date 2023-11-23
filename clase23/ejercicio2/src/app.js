import express from "express"
import UsersRouter from "./routes/users.routes.js"
import SessionsRouter from "./routes/sessions.routes.js"


const app = express()
const PORT = 8080
const usersRouter = new UsersRouter()
const sessionsRouter = new SessionsRouter()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/users", usersRouter.getRouter())
app.use("/api/sessions", sessionsRouter.getRouter())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
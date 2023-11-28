import path from "node:path";
import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import CoursesRouter from "./routes/courses.routes.js"
import StudentsRouter from "./routes/students.routes.js"
import UsersRouter from "./routes/users.routes.js"
import ViewsRouter from "./routes/views.routes.js"
import mongoose from "mongoose"
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express()
const PORT = 8080

const coursesRouter = new CoursesRouter()
const studentsRouter = new StudentsRouter()
const usersRouter = new UsersRouter()
const viewsRouter = new ViewsRouter()


// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport()
app.use(passport.initialize())

app.use("/", viewsRouter.getRouter())
app.use("/api/courses", coursesRouter.getRouter())
app.use("/api/students", studentsRouter.getRouter())
app.use("/api/users", usersRouter.getRouter())


app.use((req, res) => {
    return res.send("<h1>404 Not found</h1>")
})


try {
    await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/practicaIntegradora2?retryWrites=true&w=majority") 
    console.log("Database connected")
} catch (error) {
    console.log(error.message)
}

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

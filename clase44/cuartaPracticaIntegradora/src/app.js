import path from "node:path";
import express from "express"
import passport from "passport";
import handlebars from "express-handlebars"
import CoursesRouter from "./routes/courses.routes.js"
import StudentsRouter from "./routes/students.routes.js"
import UsersRouter from "./routes/users.routes.js"
import ViewsRouter from "./routes/views.routes.js"
import { initializePassport } from "./config/passport.config.js";
import { __dirname, __mainDirname } from "./utils/utils.js";
import { addLogger } from "./utils/logger.js";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUiExpress from "swagger-ui-express"


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

app.use(addLogger)
const swaggewrOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de nuestra Cuarta Práctica Integradora',
            description: 'API usada para el manejo de asignación de estudiantes'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggewrOptions)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use("/", viewsRouter.getRouter())
app.use("/api/courses", coursesRouter.getRouter())
app.use("/api/students", studentsRouter.getRouter())
app.use("/api/users", usersRouter.getRouter())


app.use((req, res) => {
    return res.send("<h1>404 Not found</h1>")
})


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

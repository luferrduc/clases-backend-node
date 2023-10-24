import path from "node:path";
import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import coursesRouter from "./routes/courses.routes.js"
import studentsRouter from "./routes/students.routes.js"
import viewsRouter from "./routes/views.routes.js"
import mongoose, { mongo } from "mongoose"

const app = express()
const PORT = 8080

// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares\
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter)
app.use("/api/courses", coursesRouter)
app.use("/api/students", studentsRouter)


app.use((req, res)=>{
    return res.send("<h1>404 Not found</h1>")
})


try {
    await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/practicaIntegradora?retryWrites=true&w=majority") 
    console.log("Database connected")
} catch (error) {
    console.log(error.message)
}

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

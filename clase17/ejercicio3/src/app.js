import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "node:path";
import viewsRouter from "./routes/views.routes.js";
import mongoose from "mongoose"

const app = express();
const PORT = 8080;

// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter)
// Database
try {
  await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase17?retryWrites=true&w=majority") 
  console.log("Database connected")
} catch (error) {
  console.log(error.message)
}

app.listen(PORT, ()=>{
  console.log(`Server is ready on http://localhost:${PORT}`);
})
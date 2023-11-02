import path from "node:path";
import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import { __dirname } from "./utils.js";

const app = express()
const PORT = 8080;

// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares
app.use(cookieParser("Coder55575secret")) // Firmar cookies
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/" , (req, res) => {
  res.render("cookies")
})

app.post("/cookie", (req, res) => {
  const data = req.body
  res.cookie("CoderCookie", data, { maxAge: 10000 }).send({ status: "success", message: "Cookie configurada correctamente"})
})


app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})
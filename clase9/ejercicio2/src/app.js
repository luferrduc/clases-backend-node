import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "node:path";

const app = express();
const PORT = 8080;

// Configuración de motor de plantillas
// Motor de plantillas a usar
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const USERS = [
  {
    name: "Juan",
    last_name: "Pérez",
    age: 30,
    phone: "123-456-7890",
    email: "juan.perez@example.com",
  },
  {
    name: "María",
    last_name: "González",
    age: 25,
    phone: "987-654-3210",
    email: "maria.gonzalez@example.com",
  },
  {
    name: "Carlos",
    last_name: "López",
    age: 35,
    phone: "555-555-5555",
    email: "carlos.lopez@example.com",
  },
  {
    name: "Ana",
    last_name: "Martínez",
    age: 28,
    phone: "111-222-3333",
    email: "ana.martinez@example.com",
  },
  {
    name: "Luis",
    last_name: "Rodríguez",
    age: 40,
    phone: "999-888-7777",
    email: "luis.rodriguez@example.com",
  },
];

app.get("/", (req, res) => {
    const randomIndex = Math.floor(Math.random()*USERS.length)
    res.render('users', { user: USERS[randomIndex] })

});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

import express from "express";

// Creando el servidor http
const app = express();

const users = [
  { id: 1, nombre: "Alex", apellido: "Pinaida", edad: 28, genero: "M" },
  { id: 2, nombre: "Alejandro", apellido: "Resk", edad: 25, genero: "M" },
  { id: 3, nombre: "Nora", apellido: "Saucedo", edad: 22, genero: "F" },
];

// Endpoints

app.get("/saludo", (req, res) => {
  res.send("Hola, saludos desde el backend con express");
});

app.get("/bienvenido", (req, res) => {
  res.send(
    `<h1 style="color: blue; font-size: 4rem;">Bienvenido a mi servidor de express</h1>`
  );
});
// Ruta usando path param
app.get("/usuario/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(`Usuario con id ${id}`);
});

app.get("/persona/:nombre/:apellido", (req, res) => {
  const { nombre, apellido } = req.params;
  res.send(`Bienvenido ${nombre} ${apellido}`);
});

// Debemos construir un servicio que me permita
// obtener un usuario por su ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const userFound = users.find((user) => user.id === parseInt(id));
  if (!userFound) res.send({ error: "User not found" });
  res.send(userFound);
});

// Query params
app.get("/users-query", (req, res) => {
  const { genero, edad, nombre } = req.query;
});

app.get("/users-search", (req, res) => {
  const { genero } = req.query;
  if(!genero) return res.send(users)
  
  if(genero.toUpperCase() !== "M" && genero.toUpperCase() !== "F") res.send(users)

  const filteredUsers = users.filter(user => user.genero.toUpperCase() === genero.toUpperCase())
  res.send(filteredUsers)
});


app.get("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

// Servidor
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

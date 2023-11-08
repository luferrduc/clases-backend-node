import express from "express"
import session from "express-session"

const app = express()
const PORT = 8080;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "Coder55575secret",
  // Sirve para poder refrescar o actualizar la sesión luego de un tiempo de inactividad
  resave: true, 
  // Sirve para desactivar el almacenamiento de la sesión si el usuario aún no se ha identificado 
  // o no ha iniciado sesión
  saveUninitialized: false, 
  // cookie: {
  //   maxAge: 30000
  // }
}))

// Routes

function auth(req, res, next){
  if(req.session?.user === "pepe" && req.session?.admin){
    return next()
  }
  return res.status(401).send("Error de validación de permisos")
}


app.get("/session", (req, res) => {
  if(req.session.counter){
    req.session.counter++
    res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
  } else{
    req.session.counter = 1
    res.send(`Bienvenido`)
  }
})

app.get("/login", (req, res) => {
  const { username, password } = req.query
  if(username !== 'pepe' || password !== 'pepepass') {
    return res.status(401).send("Login fallido")
  }
  req.session.user = username
  req.session.admin = true
  return res.send("Login exitoso")
})

app.get("/private", auth, (req, res) => {
  res.send("Tienes permiso para acceder a este servicio")
})

app.get("/logout", (req, res) => {
  req.session.destroy(error => {
    if(!error) return res.send('Logout exitoso')
    else return res.send({ status: "error", message: error.message})
  })
})


app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})
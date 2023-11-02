import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Setear el middleware del cookie parser al nivel de app
app.use(cookieParser("Coder55575secret")) // Firmar cookies

// Setear una cookie
app.get("/cookies", (req, res) => {
  res.cookie("CoderCookie", "Esta es una cookie muy poderosa", { maxAge: 30000 })
    .send("Cookie configurada correctamente")
})

app.get("/all-cookies", (req, res) => {
  res.send(req.cookies)
})
app.get("/delete-cookies",(req, res) => {
  res.clearCookie("CoderCookie").send("Cookie eiminada correctamente")
})

// Cookies firmadas (Signed cookies)
app.get("/signed-cookie", (req, res) => {
  res.cookie("CoderSignedCookie", "Esta es una cookie firmada muy poderosa", { maxAge: 30000, signed: true })
  .send("Cookie firmada configurada correctamente")
})

app.get("/all-signed-cookies", (req, res) => {
  res.send(req.signedCookies)
})


app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})
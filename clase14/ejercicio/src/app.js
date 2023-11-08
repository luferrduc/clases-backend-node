import express from "express"
import usersRouter from "./routes/user.routes.js"
import mongoose from "mongoose"


const app = express()
const PORT = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get("/", (req, res)=>{
    return res.send("Bienvenido a la API usando Mongoose")
})
app.use("/api/users", usersRouter)

// Conexión BD

try {
   await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase14?retryWrites=true&w=majority") 
   console.log("Database connected")
} catch (error) {
    console.log(error.message)
}


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
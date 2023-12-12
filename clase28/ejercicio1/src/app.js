import express from "express"
import contactsRouter from "./routes/contacts.routes.js"
import mongoose from "mongoose"

const app = express()
const PORT = 8080

// Database
// try {
//   await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase28?retryWrites=true&w=majority") 
//   console.log("Database connected")
// } catch (error) {
//   console.log(error.message)
//   mongoose.disconnect()
// }

app.use(express.json())


app.use("/api/contacts", contactsRouter)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})



import express from "express"
import cors from "cors"
import './dao/dbConfig.js'
import businessRouter from "./routes/business.routes.js"
import ordersRouter from "./routes/orders.routes.js"
import usersRouter from "./routes/users.routes.js"

const app = express()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())



// Routes
app.use("/api/business", businessRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

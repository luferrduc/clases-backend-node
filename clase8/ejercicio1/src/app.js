import { join } from "node:path";
import express from "express";
import usersRouter from "./routes/users.routes.js";
import petsRouter from "./routes/pets.routes.js";
import { __dirname } from "./utils.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(`${__dirname}/public`));
// Con prefijo virtual
app.use("/static-files",express.static(join(__dirname, "public")));

app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

// Routes
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

// Middleware de manejo de errores (Debe ir siempre al final)

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

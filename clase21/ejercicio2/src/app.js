import path from "node:path";
import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import { __dirname } from "./utils.js";


const app = express();
const PORT = 8080;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

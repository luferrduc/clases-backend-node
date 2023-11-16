import path from "node:path";
import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import { __dirname } from "./utils.js";
import {initializePassport} from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser"

const app = express();
const PORT = 8080;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())

// Routes

app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

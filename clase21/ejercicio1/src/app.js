import path from "node:path";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import SessionsRouter from "./routes/sessions.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 8080;

try {
	await mongoose.connect(
		"mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase21?retryWrites=true&w=majority"
	);
	console.log("Database connected");
} catch (error) {
	console.log(error.message);
}

// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			ttl: 3600
		}),
		secret: "Coder55575secret",
		// Sirve para poder refrescar o actualizar la sesión luego de un tiempo de inactividad
		resave: true,
		// Sirve para desactivar el almacenamiento de la sesión si el usuario aún no se ha identificado
		// o no ha iniciado sesión
		saveUninitialized: true
		// cookie: {
		//   maxAge: 30000
		// }
	})
);
// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api/sessions", SessionsRouter);
app.use("/", ViewsRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

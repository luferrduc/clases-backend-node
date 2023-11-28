import path from "node:path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import SessionsRouter from "./routes/sessions.routes.js";
import ProductsRouter from "./routes/products.routes.js";
import CartsRouter from "./routes/carts.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

// Manager de los mensajes
import MessageManager from "./dao/dbManagers/messages.manager.js"
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();
const PORT = 8080;

const productsRouter = new ProductsRouter()
const sessionsRouter = new SessionsRouter()
const cartsRouter = new CartsRouter()
const viewsRouter = new ViewsRouter()


// Database
try {
  await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/ecommerce?retryWrites=true&w=majority") 
  console.log("Database connected")
} catch (error) {
  console.log(error.message)
  mongoose.disconnect()
}

// Engine Config
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			ttl: 3600
		}),
		secret: "Coder55575secret",
		resave: true,
		saveUninitialized: true
	})
);

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter())
app.use("/", viewsRouter.getRouter());

app.use((req, res)=> {
  res.status(404).send({status:"error", message: "404 not found"})
})


// Server
const server = app.listen(PORT, () => {
  console.log(`Server is ready on http://localhost:${PORT}`);
});

const socketServer = new Server(server)

socketServer.on("connection", socket => {
  const messagesManager = new MessageManager()
  console.log("Cliente conectado")

  socket.on("message", async (data) => {
    try {
      const result = await messagesManager.create(data)
      const messages = await messagesManager.getAll()
      socketServer.emit("messageLogs", messages)
    } catch (error) {
      console.error({error: error.message})
    }
  
  })

  socket.on("authenticated", async (data) => {
    const messages = await messagesManager.getAll()
    socket.emit("messageLogs", messages)
    socket.broadcast.emit("newUserConnected", data)
  })
})

app.set('socketio', socketServer)
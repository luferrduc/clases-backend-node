import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "node:path";
import { Server } from "socket.io";
import viewsRouter from './routes/views.routes.js'

const app = express();
const PORT = 8080;

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", viewsRouter)

// Server
const server = app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}`);
});

// Socket io
const socketServer = new Server(server)
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")
    // socket.on("message", data => {
    //     console.log(data)
    // })
    // Mensaje privado, unicamente al socket conectado de manera individual
    // socket.emit("evento_socket_individual", "Este es un mesnaje que solo lo debe recibir el socket")
    // Para todos menos el que hace la petición
    // socket.broadcast.emit("evento_todos_menos_actual", "Lo verán todos menos el que envió el mensaje")
    // Para todos
    // socketServer.emit("evento_todos", "Lo recibirán todos los clientes conectados INCLOYENDOME")

    // CHAT
    const LOGS = []
    socket.on("message1", data => {
        socketServer.emit('log', data)
    })

    socket.on("message2", data => {
        LOGS.push({ socketid: socket.id, message: data })
        socketServer.emit('log', { logs: LOGS })
    })

})
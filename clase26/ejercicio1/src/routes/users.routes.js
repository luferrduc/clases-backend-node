import { Router } from "express"
import { getUsers, createUser } from "../controllers/users.controller.js"
const router = Router()

// Esta capa tiene como responsabilidad, definir
// el endpoint o servicio: http, ruta, middlewares y el llamado
// a la capa inferior: Controllers

router.get("/", getUsers)
.post("/", getUsers)

export default router
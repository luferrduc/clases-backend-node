import { Router } from "express"
import { getToys, createToy } from "../controllers/toys.controller.js"
const router = Router()

// Esta capa tiene como responsabilidad, definir
// el endpoint o servicio: http, ruta, middlewares y el llamado
// a la capa inferior: Controllers

router.get("/", getToys)
.post("/", createToy)

export default router
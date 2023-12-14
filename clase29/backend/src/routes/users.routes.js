import { Router } from "express"
import { getUsers, createUser } from "../controllers/users.controller.js"

const router = Router()

router.get("/", getUsers)
.post("/", createUser)

export default router
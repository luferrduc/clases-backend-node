import { Router } from "express"
import { getOrders, createOrder, resolveOrder } from "../controllers/orders.controller.js"

const router = Router()

router
  .get("/", getOrders)
  .post("/", createOrder)
  .put("/:id", resolveOrder)

export default router
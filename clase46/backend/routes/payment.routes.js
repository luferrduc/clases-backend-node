import { Router } from "express";

const router = Router()

const products = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 }
]

router.post("/payment-intents", async (req, res) => {
  
})



export default router
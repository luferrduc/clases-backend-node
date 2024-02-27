import { Router } from "express"
import PaymentService from "../services/payment.services.js"

const router = Router()

const products = [
	{ id: 1, name: "papas", price: 1000 },
	{ id: 2, name: "queso", price: 500 },
	{ id: 3, name: "hamburguesa", price: 1500 },
	{ id: 4, name: "soda", price: 1000 },
	{ id: 5, name: "golosinas", price: 800 }
]

router.post("/payment-intents", async (req, res) => {
	const productToBuy = products.find((product) => product.id === +req.query.id)
	if (!productToBuy)
		return res.status(404).send({ status: "error", error: "product not found" })
	// Armar el objeto del intento de pago
  //? 1000 -> 10.00
  //? 100.50 <- 10050
  const paymentIntentInfo = {
    amount: productToBuy.price, // El amount solo recibe valores enteros
    currency: 'usd',
    metadata:  {
      userId: 'Id del usuario generado por mongo',
      orderDetails: JSON.stringify({
        [productToBuy.name]: 2
      }, null, '\t'),
      addresss: JSON.stringify({
        street: 'Calle de prueba 1',
        postalCode: '1234145',
        externalNumber: '46'
      }, null, '\t')
    }
  }

  const paymentService = new PaymentService()
  const result = await paymentService.createPaymentIntent(paymentIntentInfo)
  console.log(result)
  return res.send({ status: 'success', payload: result })
})

export default router

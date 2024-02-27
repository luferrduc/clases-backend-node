import Stripe from "stripe"
import configs from "../config.js"

export default class PaymentService {
  constructor(){
    this.stripe = new Stripe(configs.stripePrivateKey)
  }

  createPaymentIntent = async (data) => {
    const paymentIntent = await this.stripe.paymentIntents.create(data)
    return paymentIntent
  }
}
import { config } from "dotenv"

config()

export default {
  stripePrivateKey: process.env.STRIPE_PRIVATE_KEY
}
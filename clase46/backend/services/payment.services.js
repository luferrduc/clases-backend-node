import Stripe from "stripe"

export default class PaymentService {
  constructor(){
    this.stripe = new Stripe('sk_test_51OoEDnEsDbGNQUmEDb8urwlGtvBe4QDSWzrjsO8kTLALJYFGgzbCqQt7odqjijBY4hiIDll1kBNRGrwUUgD7d8Ww00kTMHqlAq')
  }

  createPaymentIntent = async (data) => {
    const paymentIntent = await this.stripe.paymentIntents.create(data)
    return paymentIntent
  }
}
import express from "express"
import twilio from "twilio"

const app = express()

const TWILIO_ACCOUNT_SID = 'ACafac293a63a5c0060fab4e87ef47a2b5'
const TWILIO_AUTH_TOKEN = '14c987ee9ee09035c2bad8f84b8a101f'
const TWILIO_PHONE_NUMBER = '+16088893875'

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)

app.get("/sms", async (req, res) => {

  await client.messages.create({
    from: TWILIO_PHONE_NUMBER,
    to: '+56984370887',
    body: `Este es un mensaje de prueba de SMS clase 55575`
  })

  return res.send('SMS enviado')
})

app.get("/sms-custom", async (req, res) => {

  const {name, product} = req.query
  await client.messages.create({
    from: TWILIO_PHONE_NUMBER,
    to: '+56984370887',
    body: `Gracias, ${name}, tu solicitud del producto ${product} ha sido aprobada`
  })

  return res.send('SMS enviado')
})

app.get("/whatsapp", async (req, res) => {

  const {name, product} = req.query
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+56984370887',
    body: `Gracias, ${name}, tu solicitud del producto ${product} ha sido aprobada`,
    mediaUrl: 'https://emprelatam.com/wp-content/uploads/2019/10/logos-coderhouse-01.png'
  })

  return res.send('Whatsapp enviado')
})

app.listen(8080)
console.log(`Listening on ${8080}`)
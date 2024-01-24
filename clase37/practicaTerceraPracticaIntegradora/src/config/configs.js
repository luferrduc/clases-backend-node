import dotenv from "dotenv"

dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL,
  persistence: process.env.PERSISTENCE,
  userNodeMailer: process.env.USER_NODEMAILER,
  passwordNodeMailer: process.env.PASSWORD_NODEMAILER
}
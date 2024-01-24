import nodemailer from "nodemailer"
import configs from "../config/configs.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: configs.userNodeMailer, // TODO: variable de ambiente
    pass: configs.passwordNodeMailer // TODO: variable de ambiente
  }
})


export const sendEmail = async (email) => {
  await transporter.sendMail({
    from: "CoderHouse 55575",
    to: email.to,
    subject: email.subject,
    html: email.html
  })
}
import Router from "./router.js"
import jwt from "jsonwebtoken"

export default class SessionsRouter extends Router {
  init(){
    this.post("/login", ["PUBLIC"], (req, res) => {
      try {
        const user = {
          email: req.body.email,
          role: "USER"
        }
        const token = jwt.sign(user, 'secretCoder')
        return res.sendSuccess(token)
      } catch (error) {
        return res.sendServerError(error.message)
      }
    })
  }
}
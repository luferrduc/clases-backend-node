import Router from "./router.js"

export default class UsersRouter extends Router {
  init(){
    this.get("/", ["ADMIN", "USER_PREMIUM"], (req, res) => {
      res.sendSuccess('Error del cliente')
    })
  }
}
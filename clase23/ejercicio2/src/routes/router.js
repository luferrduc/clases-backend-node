import { Router as expressRotuer } from "express"
import jwt from "jsonwebtoken"

export default class Router {
  constructor(){
    this.rotuer = expressRotuer()
    this.init() // Nuestra clase padre tenga la definición del método
                // y las clases hijas tengan la implementación
  }

  getRouter(){
    return this.rotuer
  }
  init(){}

  // get, post, put, delete, patch
  // router.get(path, middlewares, callback (req, res)=> {})
  get(path, policies, ...callbacks){
    this.rotuer.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
  }
  post(path, policies,...callbacks){
    this.rotuer.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
  }
  put(path, policies,...callbacks){
    this.rotuer.put(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
  }
  delete(path, policies,...callbacks){
    this.rotuer.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (data) => {
      return res.status(200).json({ status: "success", payload: data })
    }
    res.sendServerError = (error) => {
      return res.status(500).json({ status: "error", message: error })
    }
    res.sendClientError = (error) => {
      return res.status(400).json({ status: "error", message: error })
    }

    next()
  }

  handlePolicies = (policies) => (req, res, next) => {
    if(policies[0] === 'PUBLIC') return next()
    const authToken = req.header['authorization']
    if(!authToken) return res.status(401).json({ status: "error", message: "no token provided" })
    // Bearer gsahaGfas771tgv87bvhge
    const token = authToken.split(" ")[1]
    const user = jwt.verify(token, 'secretCoder')
    // {
    //   email: 'user@gmail.com',
    //   role: "ADMIN"
    // }
    if(!policies.includes(user.role.toUpperCase())) return res.status(403).json({ status: "error", message: "not permissions" })
    req.user = user
    next()
  }

  applyCallbacks(callbacks){
    // mapear los callbacks 1 a 1, obteniendo sus parámetros (req, res)
    return callbacks.map((callback) => async (...params) => {
      try {
        // apply, va a ejecutar el callback a la instancia de nuestra clase que es el router
        await callback.apply(this, params)
      } catch (error) {
        params[1].status(500).json({ status: "error", message: error.message })
      }
    }) //[req, res]
  }
}

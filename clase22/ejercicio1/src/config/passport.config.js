import passport from "passport"
import jwt from "passport-jwt"
import { PRIVATE_KEY } from "../utils.js"

const JWTStrategy = jwt.Strategy
// Passport por defecto no sabe como obtener el JWT desde las cookies
// Passport si sabe como obtener el JWT desde los headers del request
const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
  }, async (jwt_payload, done) => {
    try {
      // jwt_payload = {
      //   "user": {
      //     "name": "Test",
      //     "email": "test@gmail.com"
      //   }
      // if(!jwt_payload.test){
      //   return done(null, false, { messages: "error invalid attributes" })
      // }
      return done(null, jwt_payload.user)
    } catch (error) {
      return done(error)
    }
  }))
}

const cookieExtractor = (req) => {
  let token = null
  if(req && req.cookies){
    token = req.cookies['coderCookieToken']
  }
  return token
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    return passport.authenticate(strategy, { session: false }, function(err, user, info){
      if(err) return next(err)
      if(!user){
        return res.status(401).send({ status: "error", error: info.messages ? info.messages : info.toString() })
      }
      req.user = user
      next()
    })(req, res, next)
  }
}


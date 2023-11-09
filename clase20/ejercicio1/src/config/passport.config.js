import passport from "passport"
import local from "passport-local"
import usersModel from "../models/users.model.js"
import { createHash, isValidPassowrd } from "../utils.js"

// local es autenticación con usuario y contraseña
const LocalStrategy = local.Strategy
export const initializePassport = () => {
  // Implementación de nuestro registro
  passport.use('register', new LocalStrategy({
    passReqToCallback: true, // Permite acceder al objeto req como cualquier otro middleware
    usernameField: "email",
  }, async (req, username, password, done) => {
    try {
			const { first_name, last_name, age } = req.body;
      
      const user = await usersModel.findOne({ email: username });
      if(user){
        return done(null, false)
      }
      const hashedPassword = createHash(password)
      const userToSave = {
        first_name, 
        last_name,
        email: username,
        age,
        password: hashedPassword
      }
      const result = await usersModel.create(userToSave)
      return done(null, result) // --> req.user = {first_name, last_name ...} 
    } catch (error) {
      return done("Incorrect credentials")
    }
  }))
  // Implementación de nuestro login

  passport.use('login', new LocalStrategy({
    usernameField: "email",
  }, async (username, password, done) => {
    try {
			const user = await usersModel.findOne({ email: username });
      const validPassword = isValidPassowrd(password, user.password);

      if(!user || !validPassword){
        return done(null, false)
      }
      return done(null, user) // setea --> req.user

    } catch (error) {
      return done("Incorrect credentials")
    }
  }))
  // Serialización y deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
  })
}
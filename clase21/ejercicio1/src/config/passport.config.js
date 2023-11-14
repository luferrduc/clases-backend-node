import passport from "passport"
import GitHubStrategy from "passport-github2"
import usersModel from "../models/users.model.js"


// local es autenticación con usuario y contraseña

export const initializePassport = () => {
  // Implementación de nuestro mecanismo de autenticacion con github
  passport.use('github', new GitHubStrategy({
    clientID: "Iv1.40d942bf70c1cd43",
    clientSecret: "c29ac1ca0a57308d922bddf7a845bf96f41aade1",
    callbackURL: "http://localhost:8080/api/sessions/github-callback",
    scope: ["user:email"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile)
      const email = profile.emails[0].value
      const user = await usersModel.findOne({ email });

      if(!user){
        // Crear la cuenta o usuario desde 0
        const newUser = {
          first_name: profile._json.name,
          last_name: "",
          age: 18,
          email,
          password: ""
        }
        const result = await usersModel.create(newUser)
        return done(null, result) 
      }else{
        return done(null, user) 
      }   

    } catch (error) {
      return done("Incorrect credentials")
    }
  }))
  // Implementación de nuestro login


  // Serialización y deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
  })
}
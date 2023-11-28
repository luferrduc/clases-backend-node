import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { passportStrategiesEnum } from "./enums.js"
import { PRIVATE_KEY_JWT } from "./constants.js"


import usersModel from "../dao/dbManagers/models/users.model.js";
import jwt from "passport-jwt"
import { createHash, isValidPassowrd } from "../utils.js";

// local es autenticación con usuario y contraseña
const LocalStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () => {

	passport.use(passportStrategiesEnum.JWT, new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY_JWT
  }, async(jwt_payload, done) => {
    try {
      return done(null, jwt_payload.user)
    } catch (error) {
      return done(error)
    }
  }))


	// Implementación del mecanismo de autenticacion con github
	passport.use(
		passportStrategiesEnum.GITHUB,
		new GitHubStrategy(
			{
				clientID: "Iv1.40d942bf70c1cd43",
				clientSecret: "c29ac1ca0a57308d922bddf7a845bf96f41aade1",
				callbackURL: "http://localhost:8080/api/sessions/github-callback",
				scope: ["user:email"]
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const email = profile.emails[0].value;
					const user = await usersModel.findOne({ email });
					
					if (!user) {
						// Crear la cuenta o usuario desde 0
						const newUser = {
							first_name: profile._json.name,
							last_name: profile._json.name,
							age: 18,
							email,
							password: "123",
							role: "user"
						};
						const result = await usersModel.create(newUser);
						return done(null, result);
					} else {
						return done(null, user);
					}
				} catch (error) {
					console.log(error);
					return done("Incorrect credentials");
				}
			}
		)
	);

	// Serialización y deserialización
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		if (id == 1)
			return done(null, { first_name: `Admin Coder`, email: "adminCoder@coder.com" , role: "admin" });
		const user = await usersModel.findById(id);
		done(null, user);
	});
};

const cookieExtractor = (req) => {
  let token = null
  if(req && req.cookies){
    token = req.cookies['coderCookieToken']
  }
  return token
}

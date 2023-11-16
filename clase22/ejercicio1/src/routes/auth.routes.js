import { Router } from "express";
import { authorization, generateToken } from "../utils.js";
import passport from "passport";
import { passportCall } from "../config/passport.config.js";

const router = Router();

const USERS = [{
	name: "Test",
	email: "test@gmail.com",
	password: "1234",
	role: "USER"
}];

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const exists = USERS.find((user) => user.email === email);
		if (exists)
			return res
				.status(400)
				.send({ status: "error", message: "user already exist" });
		const user = {
      name,
      email,
      password
    };
    USERS.push(user)
    // Generar JWT
    const accessToken = generateToken(user)
    return res.send({ status: "success", access_token: accessToken })
	} catch (error) {
		return res.status(500).send({ status: "error", message: error.message });
	}
})
.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = USERS.find((user) => user.email === email && user.password === password);
		if (!user)
			return res
				.status(401)
				.send({ status: "error", message: "invalid credentials" });

    // Generar JWT
    delete user.password
    const accessToken = generateToken(user)
		res.cookie("coderCookieToken", accessToken, {
			maxAge: 60 * 60 * 1000,
			httpOnly: true
		})
    return res.send({ status: "success", message: 'login success' })
	} catch (error) {
		return res.status(500).send({ status: "error", message: error.message });
	}
})

.get("/private", passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send({ status: "success", payload: req.user })
})

.get("/private-custom", passportCall('jwt'), authorization("USER"), (req, res) => {
  return res.send({ status: "success", payload: req.user })
})

export default router
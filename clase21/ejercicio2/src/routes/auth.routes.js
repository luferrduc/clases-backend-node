import { Router } from "express";
import { generateToken, authToken } from "../utils.js";

const router = Router();

const USERS = [];

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
    return res.send({ status: "success", access_token: accessToken })
	} catch (error) {
		return res.status(500).send({ status: "error", message: error.message });
	}
})

.get("/private", authToken, (req, res) => {
  return res.send({ status: "success", payload: req.user })
})

export default router
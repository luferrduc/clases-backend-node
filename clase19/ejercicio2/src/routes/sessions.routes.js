import { Router } from "express";
import usersModel from "../models/users.model.js";

const router = Router();

router
	.post("/register", async (req, res) => {
		try {
			const { first_name, last_name, age, email, password } = req.body;
			if (!first_name || !last_name || !age || !email || !password)
				return res
					.status(422)
					.send({ status: "error", message: "incomplete values" });
			const exists = await usersModel.findOne({ email });
			if (exists)
				return res
					.status(400)
					.send({ status: "error", message: "user already exists" });
			const result = await usersModel.create({
				first_name,
				last_name,
				email,
				age,
				password
			});

			return res
				.status(201)
				.send({ status: "success", message: "user registered" });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.post("/login", async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password)
				return res
					.status(422)
					.send({ status: "error", message: "incomplete values" });
			const user = await usersModel.findOne({ email, password });
			if (!user)
				return res
					.status(400)
					.send({ status: "error", message: "incorrect credentials" });
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
      }
      return res.send({ status: "success", message: "login success" })
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
  .get("/logout", async (req, res) => {
    req.session.destroy(error => {
      if(error) return res.status(500).send({ status: "error", message: error.message });
      return res.redirect("/")
    })
  });


  export default router
import { Router } from "express";
import usersModel from "../models/users.model.js";
import { createHash, isValidPassowrd } from "../utils.js";
import passport from "passport";

const router = Router();

router
	.post(
		"/register",
		passport.authenticate("register", { failureRedirect: "fail-register" }),
		async (req, res) => {
			return res
				.status(201)
				.send({ status: "success", message: "user registered" });
		}
	)
	.get("/fail-register", async (req, res) => {
		return res.status(500).send({ status: "error", message: "register fail" });
	})
	.post("/login", passport.authenticate("login", { failureRedirect: "fail-login" }), async (req, res) => {
			if (!req.user)
				return res
					.status(401)
					.send({ status: "error", message: "invalid credentials" });

			req.session.user = {
				name: `${req.user.first_name} ${req.user.last_name}`,
				email: req.user.email,
				age: req.user.age
			};
			return res.send({ status: "success", message: "login success" });
		}
	)
	.get("/fail-login", async (req, res) => {
		return res.status(500).send({ status: "error", message: "login fail" });
	})
	.get("/logout", async (req, res) => {
		req.session.destroy((error) => {
			if (error)
				return res
					.status(500)
					.send({ status: "error", message: error.message });
			return res.redirect("/");
		});
	});

export default router;

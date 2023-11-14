import { Router } from "express";

const router = Router();


router
	.get("/login", (req, res) => {
		return res.render("login");
	})
	.get("/", (req, res) => {
		return res.render("home");
	});
export default router;

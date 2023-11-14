import { Router } from "express";
import passport from "passport";

const router = Router();

router
	.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {
		res.send({ status: "success", message: "user registered" })
	})
	.get("/github-callback", passport.authenticate('github', { failureRedirect: "/login" }), async (req, res) => {
		req.session.user = req.user
		return res.redirect("/")
	})

export default router;

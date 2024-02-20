import { Router } from "express";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import passport from "passport";
import { handlePolicies } from "../middlewares/auth.js";
import { passportCall } from "../config/passport.config.js";
import { generateCustomResponse } from "../middlewares/responses.js";
import {
	login,
	github,
	githubCallback,
	logout,
	register,
	getCartByUser,
	passwordLink,
	passwordChange,
	changeRoleUser
} from "../controllers/sessions.controller.js";

const router = Router();

router
	.post(
		"/login",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		login
	)
	.post(
		"/register",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		register
	)
	.post(
		"/password-link",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		passwordLink
	)
	.get(
		"/logout",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		logout
	)
	.get(
		"/github",
		passportCall(passportStrategiesEnum.GITHUB),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		passport.authenticate("github", { scope: ["user:email"] }),
		github
	)
	.get(
		"/github-callback",
		passportCall(passportStrategiesEnum.GITHUB),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		passport.authenticate("github", { failureRedirect: "/login" }),
		githubCallback
	)
	.get(
		"/user-cart",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER]),
		generateCustomResponse,
		getCartByUser
	)
	.put(
		"/password-change",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		passwordChange
	)
	.put(
		"/premium/:uid",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.PREMIUM, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		changeRoleUser
	);

export default router;

import { Router } from "express";
import { handlePolicies } from "../middlewares/auth.js";
import { passportCall } from "../config/passport.config.js";
import { generateCustomResponse } from "../middlewares/responses.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { changeRoleUser } from "../controllers/users.controller.js";
import uploader from "../middlewares/uploader.js";

const router = Router();

router
	.post(
		"/:uid/documents",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([
			accessRolesEnum.USER,
			accessRolesEnum.PREMIUM,
			accessRolesEnum.ADMIN
		]),
		generateCustomResponse
	)
	.put(
		"/premium/:uid",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([
			accessRolesEnum.USER,
			accessRolesEnum.PREMIUM,
			accessRolesEnum.ADMIN
		]),
		generateCustomResponse,
		changeRoleUser
	);


	export default router
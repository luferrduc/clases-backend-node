import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { register, login } from "../controllers/users.controller.js";

// Capa ruteo unicamente deberia tener definido el identificador de nuestro servicio
// llamados a middlewares (en caso de haberlos) y hacer un llamadoa  los métodos
export default class UsersRouter extends Router {

	init() {
		this.post(
			"/login",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
		login
		)
		this.post(
			"/register",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			register
		)
	}
}

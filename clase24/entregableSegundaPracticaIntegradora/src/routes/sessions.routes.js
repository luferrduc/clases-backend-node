import Router from "./router.js";
import Users from "../dao/dbManagers/users.manager.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createHash, generateToken, isValidPassowrd } from "../utils.js";

export default class SessionsRouter extends Router {
	constructor(){
		super()
		this.usersManager = new Users()
	}

	init() {
		this.post(
			"/login",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.login
		)
		this.post(
			"/register",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.register
		)
		this.post(
			"/logout",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.logout
		)
	}


	async login(req, res){
		try {
			const { email, password } = req.body;
			if (!email || !password) return res.sendClientError("incomplete values");

			const user = await this.usersManager.getByEmail(email);
			if (!user) return res.sendClientError("incorrect credentials");

			const comparePassword = isValidPassowrd(password, user.password);
			if (!comparePassword) return res.sendAuthError("incorrect credentials");

			const accessToken = generateToken(user);
			return res.sendSuccess(accessToken);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async register(req, res){
		try {
			const { first_name, last_name, role, email, password } = req.body;
			if (!first_name || !last_name || !role || !email || !password)
				return res.sendClientError("incomplete values");
			const existsUser = await this.usersManager.getByEmail(email);
			if (existsUser) return res.sendClientError("user already exists");

			const hashedPassword = createHash(password);
			const newUser = { ...req.body };
			newUser.password = hashedPassword;
			const result = await this.usersManager.save(newUser);
			return res.sendSuccessNewResource(result);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}
	
	async logout(req, res){
		res.clearCookie("coderCookieToken").send("Cookie eliminada correctamente")
		return res.redirect("/")
	}

	async github(req, res){

	}

	async githubCallback(req, res){
		
	}
}


// router
// 	.get("/logout", async (req, res) => {
// 		req.session.destroy((error) => {
// 			if (error)
// 				return res
// 					.status(500)
// 					.send({ status: "error", message: error.message });
// 			return res.redirect("/");
// 		});
// 	})
// 	.get(
// 		"/github",
// 		passport.authenticate("github", { scope: ["user:email"] }),
// 		async (req, res) => {
	

// 			res.send({ status: "success", message: "user registered" });
// 		}
// 	)
// 	.get(
// 		"/github-callback",
// 		passport.authenticate("github", { failureRedirect: "/login" }),
// 		async (req, res) => {
// 			req.session.user = {
// 				name: `${req.user.first_name} ${req.user?.last_name ? req.user?.last_name : ""}`,
// 				email: req.user.email,
// 				age: req.user.age,
// 				role: req.user.role
// 			};
// 			return res.redirect("/products");
// 		}
// 	);

// export default router;

import Router from "./router.js";
import Users from "../dao/dbManagers/users.manager.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createHash, generateToken, isValidPassowrd } from "../utils.js";
import { validateUser } from "../schemas/users.schema.js";
import passport from "passport";
import { PRIVATE_KEY_JWT } from "../config/constants.js";

export default class SessionsRouter extends Router {
	constructor() {
		super();
		this.usersManager = new Users();
	}

	init() {
		this.post(
			"/login",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.login
		);
		this.post(
			"/register",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.register
		);
		this.get(
			"/logout",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.logout
		);
		this.get(
			"/github",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.GITHUB,
			passport.authenticate("github", { scope: ["user:email"] }),
			this.github
		);
		this.get(
			"/github-callback",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.GITHUB,
			passport.authenticate("github", { failureRedirect: "/login" }),
			this.githubCallback
		);
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			if (!email || !password) return res.sendClientError("incomplete values");

			if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
				const userAdminCoder = {
					_id: 1,
					first_name: "Admin",
					last_name: "Coder",
					email,
					role: "admin"
				};
				const accessToken = generateToken(userAdminCoder);

				res.cookie("coderCookieToken", accessToken, {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true
				});
				return res.sendSuccess(accessToken);
			}
			const user = await this.usersManager.getByEmail(email);
			
			if (!user) return res.sendClientError("incorrect credentials");

			const comparePassword = isValidPassowrd(password, user.password);
			if (!comparePassword) return res.sendAuthError("incorrect credentials");

			delete user.password;
			delete user["_id"];
			const accessToken = generateToken(user);

			res.cookie("coderCookieToken", accessToken, {
				maxAge: 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return res.sendSuccess(accessToken);
		} catch (error) {
			console.log(error.message)
			return res.sendServerError(error.message);
		}
	}

	async register(req, res) {
		try {
			const resultUser = validateUser(req.body);
			// if (!first_name || !last_name || !role || !email || !password)
			if (resultUser.error)
				return res.sendUnproccesableEntity(resultUser.error);
			const user = resultUser.data;
			const existsUser = await this.usersManager.getByEmail(user.email);
			if (existsUser) return res.sendClientError("user already exists");

			const hashedPassword = createHash(user.password);
			const newUser = { ...req.body };
			newUser.password = hashedPassword;
			const result = await this.usersManager.create(newUser);
			return res.sendSuccessNewResource({ payload: result });
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async logout(req, res) {
		this.usersManager.deleteCartFromUser(req.user.email)
		return res.clearCookie("coderCookieToken").redirect("/login");
	}

	async github(req, res) {
		return res.send({ status: "success", message: "user registered" });
	}

	async githubCallback(req, res) {
		req.user = {
			first_name: req.user.first_name,
			last_name: req.user.last_name,
			email: req.user.email,
			age: req.user.age,
			role: req.user.role
		};
		return res.redirect("/products");
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

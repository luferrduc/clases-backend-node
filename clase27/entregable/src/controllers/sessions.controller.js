import { generateToken } from "../utils.js";
import { validateUser } from "../schemas/users.schema.js";
import { login as loginServices } from "../services/sessions.services.js";
import { logout as logoutServices } from "../services/sessions.services.js";
import { github as githubServices } from "../services/sessions.services.js";
import { register as registerServices } from "../services/sessions.services.js";
import { githubCallback as githubCallbackServices } from "../services/sessions.services.js";

export const login = async (req, res) => {
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
		const user = await loginServices(email, password);

		if (user.error) return res.sendAuthError(user.error);
		const accessToken = generateToken(user);

		res.cookie("coderCookieToken", accessToken, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true
		});
		return res.sendSuccess(accessToken);
	} catch (error) {
		console.log(error.message);
		return res.sendServerError(error.message);
	}
};

export const register = async (req, res) => {
	try {
		const resultUser = validateUser(req.body);
		if (resultUser.error) return res.sendUnproccesableEntity(resultUser.error);
		const user = resultUser.data;
		const registeredUser = await registerServices(user)
		if (registeredUser.error) return res.sendClientError(registeredUser.error);

		return res.sendSuccessNewResource({ payload: registeredUser});
	} catch (error) {
		return res.sendServerError(error.message);
	}
};

export const logout = async (req, res) => {
	try {
		const result = await logoutServices(req.user.email);
		return res.clearCookie("coderCookieToken").redirect("/login");
	} catch (error) {}
};

export const github = async (req, res) => {
	return res.send({ status: "success", message: "user registered" });
};

export const githubCallback = async (req, res) => {
	req.user = {
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		email: req.user.email,
		age: req.user.age,
		role: req.user.role
	};
	return res.redirect("/products");
};

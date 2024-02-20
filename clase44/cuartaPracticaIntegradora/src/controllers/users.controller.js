// Esta capa se encarga de recibir la petición de nuestro cliente (req: query params, path params, headers, body)
// Podemos hacer validaciones básicas de los atributos que recibimos

import { InvalidCredentials, UserAlreadyExists } from "../utils/custom.exceptions.js";
import * as usersService from "../services/users.services.js"

// Se encarga de dar una respuesta a nuestros clientes
export const register = async (req, res) => {
	try {
		const { first_name, last_name, role, email, password } = req.body;
		if (!first_name || !last_name || !role || !email || !password)
			return res.sendClientError("incomplete values");

    // Vamos a trabajar con cutsom errors para lanzar excepciones desde capas inferiores 
    // y cachear dentro del controlador
    //* Uso de custom errors para seguir en Services


    const result = await usersService.register({ ...req.body })
		return res.sendSuccessNewResource(result);
	} catch (error) {
    req.logger.error(error.message)
    if(error instanceof UserAlreadyExists) {
      return res.sendClientError(error.message)
    }
		return res.sendServerError(error.message);
	}
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.sendClientError("incomplete values");

    // Vamos a trabajar con cutsom errors para lanzar excepciones desde capas inferiores 
    // y cachear dentro del controlador
    //* Uso de custom errors para seguir en Services
    // const user = await this.usersManager .getByEmail(email);
    // if (!user) return res.sendClientError("incorrect credentials");

    //* Capa de servicios
    // const comparePassword = isValidPassowrd(password, user.password);
    // if (!comparePassword) return res.sendClientError("incorrect credentials");
    // const accessToken = generateToken(user);

    const accessToken = await usersService.login(password, email)
    return res.sendSuccess(accessToken);
  } catch (error) {
    req.logger.error(error.message)
    if(error instanceof InvalidCredentials) {
      return res.sendClientError(error.message)
    }
    return res.sendServerError(error.message);
  }
}
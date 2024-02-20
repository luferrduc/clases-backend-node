// Esta capa es la más importante del proyecto, ya que contiene la lógica del negocio

import { Users } from "../dao/factory.js";
import UsersRepository from "../repositories/users.repository.js";
import {
	InvalidCredentials,
	UserAlreadyExists
} from "../utils/custom.exceptions.js";
import { loginInvalidCredentials } from "../utils/custom.html.js";
import { createHash, generateToken, isValidPassowrd } from "../utils/utils.js";
import { sendEmail } from "./mail.services.js";

const usersDao = new Users();
export const usersRepository = new UsersRepository(usersDao);


export const getByEmail = async (email) => {
	const user = await usersRepository.getByEmail(email)
	if(!user){
		throw new InvalidCredentials("user not found")
	}
	return user
}

export const login = async (password, email) => {
	const user = await usersRepository.getByEmail(email);
	if (!user) {
		//! Vamos a lanzar una excepción
		throw new InvalidCredentials("incorrect credentials");
	}

	const comparePassword = isValidPassowrd(password, user.password);
	if (!comparePassword) {
		//* Enviar un correo electrónico
		const emailInvalidCredentials = {
			to: user.email,
			subject: "Login fallido",
			html: loginInvalidCredentials
		}
		await sendEmail(emailInvalidCredentials)
		
		//! Vamos a lanzar una excepción
		throw new InvalidCredentials("incorrect credentials");
	}
	const accessToken = generateToken(user);
	return accessToken;
};

export const register = async (user) => {
	const existsUser = await usersRepository.getByEmail(user.email);

	if (existsUser) {
		//! Vamos a lanzar una excepción
		throw new UserAlreadyExists("user already exists");
	}
	const hashedPassword = createHash(user.password);
	const newUser = { ...user };
	newUser.password = hashedPassword;
	const result = await usersRepository.save(newUser);
	return result;
};

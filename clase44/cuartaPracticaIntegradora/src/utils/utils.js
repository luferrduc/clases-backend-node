import { fileURLToPath } from "node:url";
import path from "node:path";
import bcrypt from "bcrypt"
import { PRIVATE_KEY_JWT } from "../config/constants.js";
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

// Cambiar ruta
export const productsFilePath = path.join(__dirname, "./files/products.json");
export const cartsFilePath = path.join(__dirname, "./files/carts.json");
export const __mainDirname = path.join(__dirname, '..', '..')


// 1. Hashear nuestra password
export const createHash = (password) => {
  const salt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  return salt
}
// 2. Validar nuestra password
export const isValidPassowrd = (plainPassword, hashedPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword)
  return result
}

export const generateToken = (user) => {
	const token = jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: '24h'});
  return token
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if(req.user.role !== role) return res.status(403).send({ status: "error", message: "not permissions" })
    next()
  }
}

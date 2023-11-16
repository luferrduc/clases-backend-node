import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const productsFilePath = join(
	__dirname,
	"./dao/filesManagers/files/products.json"
);
export const cartsFilePath = join(
	__dirname,
	"./dao/filesManagers/files/carts.json"
);

export const PRIVATE_KEY = "coder55575"

// Implementación de la generación del JWT y la validación

// hasgdfyaTYgavsd62151hardghASD
export const generateToken = (user) => {
	const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h'});
  return token
};

// Middlewares

// Autenticación primer paso lo hace passport
// req.user ya existe luego de pasar 
export const authorization = (role) => {
  return async (req, res, next) => {
    if(req.user.role !== role) return res.status(403).send({ status: "error", message: "not permissions" })
    next()
  }
}

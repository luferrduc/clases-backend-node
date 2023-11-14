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

const PRIVATE_KEY = "coder55575"

// Implementación de la generación del JWT y la validación

// hasgdfyaTYgavsd62151hardghASD
export const generateToken = (user) => {
	const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h'});
  return token
};

// Middleware
export const authToken = (req, res, next) => {
  // 1. Validar que el Token llegue en los headers del request
  const authToken = req.headers.authorization
  if(!authToken) return res.status(401).send({ status: "error", message: "not authenticated" })
  // Bearer hasgdfyaTYgavsd62151hardghASD
  const token = authToken.split(" ")[1]
  // 2. Validar el JWT
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if(error) return res.status(401).send({ status: "error", message: "not authenticated" })
    req.user = credentials.user
    next()
  })
}


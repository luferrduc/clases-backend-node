import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const productsFilePath = join(__dirname, "./files/productos.json");
export const cartsFilePath = join(__dirname, "./files/carts.json");


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


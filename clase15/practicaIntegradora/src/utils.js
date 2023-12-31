import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// Cambiar ruta
export const productsFilePath = join(__dirname, "./files/products.json");
export const cartsFilePath = join(__dirname, "./files/carts.json");
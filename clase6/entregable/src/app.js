import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ProductManager from "./managers/ProductManager.js";
import { send } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "./files/productos.json");

const manager = new ProductManager(filePath);

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));


// RUTAS
// app.get("/", async (req, res) => {});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  if(products.error) return res.send('Hubo un error en la lectura de la base')
  if(!limit) return res.send(products)

  const filteredProducts = products.slice(0, parseInt(limit))
  res.send(filteredProducts);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(parseInt(pid));
  if(product.error) return res.send(`<h1>${product.error}</h1>`)

  res.send(product);
});

app.get("*", async (req, res) => {
  res.status(404).send(`<h1 style="font-size: 3rem">404 - Route not found</h1>`);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

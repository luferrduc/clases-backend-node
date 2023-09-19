import express from "express";
import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager("./files/productos.json");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// RUTAS
// app.get("/", async (req, res) => {});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts()
  console.log(products);
  res.send(products);
});

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(parseInt(pid))
    
    res.send(product);
  });


app.get("*", async (req, res) => {
    res.status(404).send('404 - Route not found')
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

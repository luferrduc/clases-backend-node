import { Router } from "express";

import ProductManager from "../managers/ProductManager.js";
import { productsFilePath } from "../utils.js";

const router = Router()
const productManager = new ProductManager(productsFilePath);

// Vista para mostrar productos sin WebSockets
router.get("/", async (req, res)=>{
    const productsList = await productManager.getProducts()
    res.render("home", {products: productsList})
})

// Vista para mostrar productos en tiempo real con WebSockets
router.get("/realtimeproducts", async (req, res)=>{
    const productsList = await productManager.getProducts()
    res.render("realtimeproducts", {products: productsList})
})


export default router
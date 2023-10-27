import { Router } from "express";
// import ProductManager from "../dao/fileManagers/product-file.manager.js";
import ProductManager from "../dao/dbManagers/products.manager.js";

import { productsFilePath } from "../utils.js";

const router = Router()
// const productManager = new ProductManager(productsFilePath);
const productManager = new ProductManager();


// Vista para mostrar productos sin WebSockets
router.get("/", async (req, res)=>{
    const productsList = await productManager.getAll()
    res.render("home", {products: productsList})
})

// Vista para mostrar productos en tiempo real con WebSockets
router.get("/realtimeproducts", async (req, res)=>{
    const productsList = await productManager.getAll()
    res.render("realtimeproducts", {products: productsList})
})


export default router
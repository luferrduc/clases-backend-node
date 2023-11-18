import { Router } from "express";
// import CartManager from "../dao/fileManagers/cart-file.manager.js";
import CartsManager from "../dao/dbManagers/carts.manager.js";
import ProductManager from "../dao/dbManagers/products.manager.js";

import { cartsFilePath } from "../utils.js";

const router = Router();
// const manager = new CartManager(cartsFilePath);
const manager = new CartsManager();
const productManager = new ProductManager();
router
	.get("/:cid", async (req, res) => {
		try {
			const cid = req.params.cid;
			const cart = await manager.getById(cid);
			if (!cart)
				return res
					.status(400)
					.send({ status: "error", message: "Cart not found" });

			return res.send({ status: "success", payload: cart });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.post("/", async (req, res) => {
		try {
			const cart = await manager.create();
			return res.send({ status: "success", payload: cart });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.post("/:cid/products/:pid", async (req, res) => {
		try {
			const { cid, pid } = req.params;
			const product = await productManager.getById(pid);
			if (!product)
				return res
					.status(404)
					.send({ status: "error", message: "Product not found" });

			const cart = await manager.addProduct(cid, pid);
			if (!cart)
				return res
					.status(404)
					.send({ status: "error", message: "Cart or product not found" });
			return res.send({ status: "success", payload: cart });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.put("/:cid", async (req, res) => {
		try {
			const { cid } = req.params
			const { products } = req.body
			
			const updatedCart = await manager.updateCart(cid, products);
			if (!updatedCart)
				return res
					.status(404)
					.send({ status: "error", message: "Cart or product not found" });
			return res.send({ status: "success", payload: updatedCart });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.put("/:cid/products/:pid", async (req, res) => {
		try {
      const { quantity } = req.body;
      const { cid, pid } = req.params
      const product = await productManager.getById(pid);
			if (!product)
				return res
					.status(404)
					.send({ status: "error", message: "Product not found" });

			const cart = await manager.getById(cid);
			if (!cart)
				return res
					.status(404)
					.send({ status: "error", message: "Cart not found" });

			if (!quantity)
				return res
					.status(422)
					.send({ status: "error", message: "Quantity is required" });

      const updatedQuantityCart = await manager.updateQuantityProduct(cid, pid, quantity)
      return res.send({ status: "success", payload: updatedQuantityCart });
		} catch (error) {
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.delete("/:cid/products/:pid", async (req, res) => {
		try {
			const { pid, cid } = req.params;
			const cart = await manager.getById(cid);
			const product = await productManager.getById(pid);
			if (!cart)
				return res
					.status(400)
					.send({ status: "error", message: "Cart not found" });

			if (!product)
				return res
					.status(404)
					.send({ status: "error", message: "Product not found" });

			const result = await manager.deleteProductCart(cid, pid);
			return res.send({ status: "success", payload: result });
		} catch (error) {
			if (error.message.toLowerCase().includes("not found"))
				return res.status(404).send({ status: "error", message: error.message });
			return res.status(500).send({ status: "error", message: error.message });
		}
	})
	.delete("/:cid", async (req, res) => {
		try {
			const { cid } = req.params;
			const cart = await manager.getById(cid);
			if (!cart)
				return res
					.status(400)
					.send({ status: "error", message: "Cart not found" });
			const result = await manager.deleteProducts(cid);
			return res.send({ status: "success", payload: result });
		} catch (error) {
			if (error.message.toLowerCase().includes("not found"))
				return res.status(404).send({ status: "error", message: error.message });
			return res.status(500).send({ status: "error", message: error.message });
		}
	});

export default router;

// import { Router } from "express";
// import Router from "./router.js";
import { Router } from "express";

// import CartManager from "../dao/fileManagers/cart-file.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";
import Products from "../dao/dbManagers/products.manager.js";
import { validateCart } from "../schemas/carts.schema.js";
import { cartsFilePath } from "../utils.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { handlePolicies } from "../middlewares/auth.js";
import { passportCall } from "../config/passport.config.js";
import { generateCustomResponse } from "../middlewares/responses.js";
import { addProduct, createCart, deleteCart, deleteProduct, getCart, updateCart, updateProducts } from "../controllers/carts.controller.js";

const router = Router()

router.get(
	"/:cid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	getCart
)
.post(
	"/",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	createCart
)
.post(
	"/:cid/products/:pid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	addProduct
)
.put(
	"/:cid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	updateCart
)
.put(
	"/:cid/products/:pid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	updateProducts
)
.delete(
	"/:cid/products/:pid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	deleteProduct
)
.delete(
	"/:pid",
	passportCall(passportStrategiesEnum.JWT),
	handlePolicies([accessRolesEnum.USER]),
	deleteCart
)


export default router
// export default class CartsRouter extends Router {
// 	constructor() {
// 		super();
// 		this.productsManager = new Products();
// 		this.cartsManager = new Carts();
// 	}

// 	init() {
// 		this.get(
// 			"/:cid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.getOne
// 		);
// 		this.post(
// 			"/",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.createOne
// 		);
// 		this.post(
// 			"/:cid/products/:pid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.addProduct
// 		);
// 		this.put(
// 			"/:cid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.updateOne
// 		);
// 		this.put(
// 			"/:cid/products/:pid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.updateProducts
// 		);
// 		this.delete(
// 			"/:cid/products/:pid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.deleteProduct
// 		);
// 		this.delete(
// 			"/:cid",
// 			[accessRolesEnum.USER],
// 			passportStrategiesEnum.JWT,
// 			this.deleteCart
// 		);
// 	}

// 	async getOne(req, res) {
// 		try {
// 			const cid = req.params.cid;
// 			const cart = await this.cartsManager.getById(cid);
// 			if (!cart)
// 				return res
// 					.status(400)
// 					.send({ status: "error", message: "Cart not found" });

// 			return res.sendSuccess(cart);
// 		} catch (error) {
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async createOne(req, res) {
// 		try {
// 			const cart = await this.cartsManager.create();
// 			return res.sendSuccess(cart);
// 		} catch (error) {
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async addProduct(req, res) {
// 		try {
// 			const { cid, pid } = req.params;
// 			const product = await this.productManager.getById(pid);
// 			if (!product)
// 				return res.sendNotFoundError("Product not found");

// 			const cart = await this.cartsManager.addProduct(cid, pid);
// 			if (!cart)
// 				return res.sendNotFoundError("Cart or product not found");
// 			return res.sendSuccess(cart);
// 		} catch (error) {
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async updateOne(req, res) {
// 		try {
// 			const { cid } = req.params
// 			const { products } = req.body
			
// 			const updatedCart = await this.cartsManager.updateCart(cid, products);
// 			if (!updatedCart)
// 				return res
// 					.status(404)
// 					.send({ status: "error", message: "Cart or product not found" });
// 			return res.sendSuccess(updatedCart);
// 		} catch (error) {
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async updateProducts(req, res) {
// 		try {
//       const { quantity } = req.body;
//       const { cid, pid } = req.params
//       const product = await this.productManager.getById(pid);
// 			if (!product)
// 				return res.sendNotFoundError("Product not found");

// 			const cart = await this.cartsManager.getById(cid);
// 			if (!cart)
// 				return res.sendNotFoundError("Cart not found");

// 			if (!quantity)
// 				return res.sendUnproccesableEntity("Quantity is required");

//       const updatedQuantityCart = await this.cartsManager.updateQuantityProduct(cid, pid, quantity)
//       return res.sendSucess(updatedQuantityCart);
// 		} catch (error) {
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async deleteProduct(req, res) {
// 		try {
// 			const { cid } = req.params;
// 			const cart = await this.cartsManager.getById(cid);
// 			if (!cart)
// 				return res.sendNotFoundError("Cart not found");
// 			const result = await this.cartsManager.deleteProducts(cid);
// 			return res.sendSuccess(result);
// 		} catch (error) {
// 			if (error.message.toLowerCase().includes("not found"))
// 				return res.sendNotFoundError(error.message);
// 			return res.sendServerError(error.message);
// 		}
// 	}

// 	async deleteCart(req, res) {
// 		try {
// 			const { cid } = req.params;
// 			const cart = await this.cartsManager.getById(cid);
// 			if (!cart)
// 				return res.sendNotFoundError("Cart not found");
// 			const result = await this.cartsManager.deleteProducts(cid);
// 			return res.sendSuccess(result);
// 		} catch (error) {
// 			if (error.message.toLowerCase().includes("not found"))
// 				return res.sendNotFoundError(error.message);
// 			return res.sendServerError(error.message);
// 		}
// 	}
// }




// const router = Router();
// const manager = new CartManager(cartsFilePath);
// const manager = new CartsManager();
// const productManager = new ProductManager();
// router
// 	.get("/:cid", async (req, res) => {
// 		try {
// 			const cid = req.params.cid;
// 			const cart = await manager.getById(cid);
// 			if (!cart)
// 				return res
// 					.status(400)
// 					.send({ status: "error", message: "Cart not found" });

// 			return res.send({ status: "success", payload: cart });
// 		} catch (error) {
// 			return res.status(500).send({ status: "error", message: error.message });
// 		}
// 	})
	// .post("/", async (req, res) => {
	// 	try {
	// 		const cart = await manager.create();
	// 		return res.send({ status: "success", payload: cart });
	// 	} catch (error) {
	// 		return res.status(500).send({ status: "error", message: error.message });
	// 	}
	// })
	// .post("/:cid/products/:pid", async (req, res) => {
	// 	try {
	// 		const { cid, pid } = req.params;
	// 		const product = await productManager.getById(pid);
	// 		if (!product)
	// 			return res
	// 				.status(404)
	// 				.send({ status: "error", message: "Product not found" });

	// 		const cart = await manager.addProduct(cid, pid);
	// 		if (!cart)
	// 			return res
	// 				.status(404)
	// 				.send({ status: "error", message: "Cart or product not found" });
	// 		return res.send({ status: "success", payload: cart });
	// 	} catch (error) {
	// 		return res.status(500).send({ status: "error", message: error.message });
	// 	}
	// })
	// .put("/:cid", async (req, res) => {
	// 	try {
	// 		const { cid } = req.params
	// 		const { products } = req.body
			
	// 		const updatedCart = await manager.updateCart(cid, products);
	// 		if (!updatedCart)
	// 			return res
	// 				.status(404)
	// 				.send({ status: "error", message: "Cart or product not found" });
	// 		return res.send({ status: "success", payload: updatedCart });
	// 	} catch (error) {
	// 		return res.status(500).send({ status: "error", message: error.message });
	// 	}
	// })
	// .put("/:cid/products/:pid", async (req, res) => {
	// 	try {
  //     const { quantity } = req.body;
  //     const { cid, pid } = req.params
  //     const product = await productManager.getById(pid);
	// 		if (!product)
	// 			return res
	// 				.status(404)
	// 				.send({ status: "error", message: "Product not found" });

	// 		const cart = await manager.getById(cid);
	// 		if (!cart)
	// 			return res
	// 				.status(404)
	// 				.send({ status: "error", message: "Cart not found" });

	// 		if (!quantity)
	// 			return res
	// 				.status(422)
	// 				.send({ status: "error", message: "Quantity is required" });

  //     const updatedQuantityCart = await manager.updateQuantityProduct(cid, pid, quantity)
  //     return res.send({ status: "success", payload: updatedQuantityCart });
	// 	} catch (error) {
	// 		return res.status(500).send({ status: "error", message: error.message });
	// 	}
	// })
// 	.delete("/:cid/products/:pid", async (req, res) => {
// 		try {
// 			const { pid, cid } = req.params;
// 			const cart = await manager.getById(cid);
// 			const product = await productManager.getById(pid);
// 			if (!cart)
// 				return res
// 					.status(400)
// 					.send({ status: "error", message: "Cart not found" });

// 			if (!product)
// 				return res
// 					.status(404)
// 					.send({ status: "error", message: "Product not found" });

// 			const result = await manager.deleteProductCart(cid, pid);
// 			return res.send({ status: "success", payload: result });
// 		} catch (error) {
// 			if (error.message.toLowerCase().includes("not found"))
// 				return res.status(404).send({ status: "error", message: error.message });
// 			return res.status(500).send({ status: "error", message: error.message });
// 		}
// 	})
// 	.delete("/:cid", async (req, res) => {
// 		try {
// 			const { cid } = req.params;
// 			const cart = await manager.getById(cid);
// 			if (!cart)
// 				return res
// 					.status(400)
// 					.send({ status: "error", message: "Cart not found" });
// 			const result = await manager.deleteProducts(cid);
// 			return res.send({ status: "success", payload: result });
// 		} catch (error) {
// 			if (error.message.toLowerCase().includes("not found"))
// 				return res.status(404).send({ status: "error", message: error.message });
// 			return res.status(500).send({ status: "error", message: error.message });
// 		}
// 	});

// export default router;

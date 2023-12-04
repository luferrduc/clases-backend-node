// import { Router } from "express";
import Router from "./router.js";
// import ProductManager from "../dao/fileManagers/product-file.manager.js";
import Products from "../dao/dbManagers/products.manager.js";
import { validateProduct } from "../schemas/products.schema.js"; 
import { productsFilePath } from "../utils.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";

export default class ProductsRouter extends Router {
	constructor() {
		super();
		this.productsManager = new Products();
	}

	init() {
		this.get(
			"/",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.getAll
		);
		this.get(
			"/:pid",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.getOne
		);
		this.post(
			"/",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.createOne
		);
		this.put(
			"/:pid",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.updateOne
		);
		this.delete(
			"/:pid",
			[accessRolesEnum.USER],
			passportStrategiesEnum.JWT,
			this.deleteOne
		);
	}

	async getAll(req, res) {
		try {
			const {
				limit = 10,
				page = 1,
				sort,
				query: queryP,
				queryValue
			} = req.query;
			const options = {
				limit,
				page,
				query: {}
			};
			let sortLink = "";
			if (sort?.toLowerCase() === "asc") {
				options.sort = { price: 1 };
				sortLink = `&sort=${sort}`;
			} else if (sort?.toLowerCase() === "desc") {
				options.sort = { price: -1 };
				sortLink = `&sort=${sort}`;
			}
			if (queryP && queryValue) {
				options.query[queryP] = queryValue;
			}
			const {
				docs: products,
				hasPrevPage,
				hasNextPage,
				nextPage,
				prevPage,
				totalPages
			} = await this.productsManager.getAll(options);
			if (!products)
				return res.status(200).send({ status: "success", payload: [] });

			const prevLink = hasPrevPage
				? `/api/products?limit=${limit}&page=${prevPage}${sortLink}`
				: null;
			const nextLink = hasNextPage
				? `/api/products?limit=${limit}&page=${nextPage}${sortLink}`
				: null;

			return res.sendSuccess(
				products,
				totalPages,
				prevPage,
				nextPage,
				page,
				hasPrevPage,
				hasNextPage,
				prevLink,
				nextLink
			);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async getOne(req, res) {
		try {
			const { pid } = req.params;
			const product = await this.productsManager.getById(pid);
			if (!product) return res.sendNotFoundError("Product not found");

			return res.sendSuccess(product);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async createOne(req, res) {
		const options = {
			limit: 10,
			page: 1,
			query: {}
		};
		try {
			const result = validateProduct(req.body);
			const io = req.app.get("socketio");
			// const {
			// 	title,
			// 	description,
			// 	price,
			// 	thumbnail,
			// 	code,
			// 	category,
			// 	stock,
			// 	status
			// } = product;
			// if (!title || !description || !price || !code || !stock || !category)
			if(result.error)
				return res.sendClientError(result.error);
			const newProduct = await this.productsManager.create(result.data);
			const { docs: productsEmit } = await this.productsManager.getAll(options);
			io.emit("refreshProducts", productsEmit);
			return res.sendSuccess(newProduct);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async updateOne(req, res) {
		try {
			const { pid } = req.params;
			const product = req.body;
			const {
				title,
				description,
				price,
				thumbnail,
				code,
				category,
				stock,
				status
			} = product;
			if (!title || !description || !price || !code || !stock || !category)
				return res.sendClientError("Incomplete values");

			const productExists = await this.productsManager.getById(pid);
			if (!productExists)
				return res.sendNotFoundError("Product not found, incorrect id");

			const updatedProduct = await this.productsManager.update(pid, product);
			return res.sendSuccess(updatedProduct);
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}

	async deleteOne(req, res) {
		try {
			const { pid } = req.params;
			const options = {
				limit: 10,
				page: 1,
				query: {}
			};
			const io = req.app.get("socketio");
			const deletedProduct = await this.productsManager.delete(pid);
			if (deletedProduct.deletedCount === 0)
				return res.sendClientError("Product not found, incorrect id");

			const { docs: productsEmit } = await this.productsManager.getAll(options);
			io.emit("refreshProducts", productsEmit);
			return res.sendSuccess("Product deleted succesfully");
		} catch (error) {
			return res.sendServerError(error.message);
		}
	}
}

// const router = Router();
// const manager = new ProductManager(productsFilePath);
// const manager = new ProductManager();

// router
//   .get("/", async (req, res) => {
//     try {
//       const { limit = 10, page=1, sort, query: queryP, queryValue } = req.query;
//       const options = {
//         limit,
//         page,
//         query: {}
//       }
//       let sortLink = ""
//       if(sort?.toLowerCase() === "asc"){
//         options.sort = { price: 1 }
//         sortLink = `&sort=${sort}`
//       }else if(sort?.toLowerCase() === "desc"){
//         options.sort = { price: -1 }
//         sortLink = `&sort=${sort}`
//       }
//       if(queryP && queryValue){
//         options.query[queryP] = queryValue
//       }
//       const {docs: products, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = await manager.getAll(options);
//       if (!products)
//         return res.status(200).send({ status: "success", payload: [] });

//       const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}${sortLink}` : null
//       const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}${sortLink}` : null

//       return res.send({ status: "success", payload: products, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink });
//     } catch (error) {
//       return res.status(500).send({ status: "error", message: error.message });
//     }
//   })

// .get("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const product = await manager.getById(pid);
//     if (!product)
//       return res.status(404).send({ status: "error", message: "Product not found" });

//     return res.send({ status: "success", payload: product });
//   } catch (error) {
//     return res.status(500).send({ status: "error", message: error.message });
//   }
// })
// .post("/", async (req, res) => {
//   const options = {
//     limit: 10,
//     page: 1,
//     query: {}
//   }
//   try {
//     const product = req.body;
//     const io = req.app.get("socketio");
//     const { title, description, price, thumbnail, code, category, stock, status } =
//       product;
//     if (!title || !description || !price || !code || !stock || !category)
//       return res
//         .status(400)
//         .send({ status: "error", message: "Incomplete values" });
//     const newProduct = await manager.create(product);
//     const {docs: productsEmit} = await manager.getAll(options)
//     io.emit("refreshProducts", productsEmit);
//     return res.send({ status: "success", payload: newProduct });
//   } catch (error) {
//     return res.status(500).send({ status: "error", message: error.message });
//   }
// })
// .put("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const product = req.body;
//     const { title, description, price, thumbnail, code, category, stock, status } =
//       product;
//     if (!title || !description || !price || !code || !stock || !category)
//       return res
//         .status(400)
//         .send({ status: "error", error: "Incomplete values" });

//     const productExists = await manager.getById(pid);
//     if (!productExists)
//       return res
//         .status(404)
//         .send({ status: "error", error: "Product not found, incorrect id" });

//     const updatedProduct = await manager.update(pid, product);
//     return res.send({
//       status: "success",
//       payload:  updatedProduct,
//     });
//   } catch (error) {
//     return res.status(500).send({ status: "error", message: error.message });
//   }
// })
// .delete("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const options = {
//       limit: 10,
//       page: 1,
//       query: {}
//     }
//     const io = req.app.get("socketio");
//     const deletedProduct = await manager.delete(pid);
//     if (deletedProduct.deletedCount === 0)
//       return res
//         .status(400)
//         .send({ status: "error", message: "Product not found, incorrect id" });

//     const {docs: productsEmit} = await manager.getAll(options)
//     io.emit("refreshProducts", productsEmit);
//     return res.send({ status: "success", payload: "Product deleted succesfully" });
//   } catch (error) {
//     return res.status(500).send({ status: "error", message: error.message });

//   }

// });

// export default router;

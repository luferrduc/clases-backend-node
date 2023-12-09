import { Router } from "express";
// import Router from "./router.js";
// import ProductManager from "../dao/fileManagers/product-file.manager.js";
import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";
import Messages from "../dao/dbManagers/messages.manager.js";
import { productsFilePath } from "../utils.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";

const router = Router()

const productsManager = new Products()
const cartsManager = new Carts()
const messagesManager = new Messages()


router.get("/", )




export default class ViewsRouter extends Router {

	constructor(){
		super();
		this.productsManager = new Products();
		this.cartsManager = new Carts();
		this.messagesManager = new Messages();

	}

	init() {
		this.get(
			"/",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.profile
		);
		this.get(
			"/realtimeproducts",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.realTimeProductsView
		);
		this.get(
			"/products",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.productsView
		);
		this.get(
			"/products/:pid",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.productDetail
		);
		this.get(
			"/carts/:cid",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.cartDetail
		);
		this.get(
			"/chat",
			[accessRolesEnum.USER, accessRolesEnum.ADMIN],
			passportStrategiesEnum.JWT,
			this.chat
		);
		this.get(
			"/register",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.register
		);
		this.get(
			"/login",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.login
		);

	}

	async realTimeProductsView(req, res) {
		try {
			const { limit = 10, page = 1, sort, query = {} } = req.query;
			const options = {
				limit,
				page,
				query
			};
			if (sort?.toLowerCase() === "asc") {
				options.sort = { price: 1 };
			} else if (sort?.toLowerCase() === "desc") {
				options.sort = { price: -1 };
			}
			const {
				docs: productsList,
				hasPrevPage,
				hasNextPage,
				nextPage,
				prevPage
			} = await this.productsManager.getAll(options);
			res.render("realtimeproducts", {
				products: productsList,
				user: req.user,
				hasPrevPage,
				hasNextPage,
				nextPage,
				prevPage
			});
		} catch (error) {
			return res.status(500).send(`<h2>Error 500: ${error.message}</h2>`);
		}
	}

	async productsView(req, res) {
		try {
			const { limit = 10, page = 1, sort, query: queryP, queryValue } = req.query;
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
			let queryLink = "";
			if (queryP && queryValue) {
				options.query[queryP] = queryValue;
				queryLink = `&query=${queryP}&queryValue=${queryValue}`;
			}
	
			const {
				docs: productsList,
				hasPrevPage,
				hasNextPage,
				nextPage,
				prevPage,
				totalPages
			} = await this.productsManager.getAll(options);
			const prevLink = hasPrevPage
				? `/products?limit=${limit}&page=${prevPage}${sortLink}${queryLink}`
				: null;
			const nextLink = hasNextPage
				? `/products?limit=${limit}&page=${nextPage}${sortLink}${queryLink}`
				: null;
			res.render("products", {
				user: req.user,
				products: productsList,
				totalPages,
				prevPage,
				nextPage,
				page,
				hasPrevPage,
				hasNextPage,
				prevLink,
				nextLink,
				style: "products.css"
			});
		} catch (error) {
			return res.status(500).send(`<h2>Error 500: ${error.message} </h2>`);
		}
	}

	async productDetail(req, res) {
		try {
			const { pid } = req.params;
			const product = await this.productsManager.getById(pid);
			if (!product)
				return res
					.status(404)
					.render(`<h2>Error 404: Product with id ${pid} not found </h2>`);
			return res.render("product", {
				product,
				user: req.user,
				style: "product.css"
			});
		} catch (error) {
			return res.status(500).send(`<h2>Error 500: ${error.message} </h2>`);
		}
	}


	async cartDetail(req, res) {
		try {
			const cid = req.params.cid;
			const cart = await this.cartsManager.getById(cid);
			if (!cart)
				return res
					.status(400)
					.render(`<h2>Error 404: Cart with id ${cid} not found </h2>`);
			const products = cart.products;
			return res.render("cart", {
				products,
				user: req.user,
				style: "cart.css"
			});
		} catch (error) {
			return res.status(500).send(`<h2>Error 500: ${error.message}</h2>`);
		}
	}

	async chat(req, res) {
		const messagesList = await this.messagesManager.getAll();
		return res.render("chat", { messages: messagesList, style: "chat.css" });
	}
	
	async login(req, res) {
		console.log(req.user)
		if(req?.user) return res.redirect("/products")
		return res.render("login", { style: "login.css" });
	}

	async register(req, res) {
		res.render("register", { style: "register.css" });
	}

	async profile(req, res) {
		res.render("profile", {
			user: req.user,
			style: "profile.css"
		});
	}

}

// Middlewares

const publicAccess = (req, res, next) => {
	if (req.session?.user) return res.redirect("/products");
	next();
};

const privateAccess = (req, res, next) => {
	if (!req.session?.user) return res.redirect("/login");
	next();
};


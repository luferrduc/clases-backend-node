import Carts from "../dao/dbManagers/carts.manager.js";
import Products from "../dao/dbManagers/products.manager.js";
import { validateCart } from "../schemas/carts.schema.js";
// import CartManager from "../dao/fileManagers/cart-file.manager.js";
import { cartsFilePath } from "../utils.js";

const productsManager = new Products();
const cartsManager = new Carts();

export const getCart = async (cid) => {
	const cart = await cartsManager.getById(cid);
	if (!cart) return { status: "error", message: "Cart not found" };

	return cart;
};
export const createCart = async () => {
	const cart = await cartsManager.create();
	return cart;
};
export const addProduct = async (cid, pid) => {
	const product = await productsManager.getById(pid);
	if (!product) return { status: "error", error: "Product not found" };

	const cart = await cartsManager.addProduct(cid, pid);

	if (!cart) return { status: "error", error: "Cart or product not found" };
	return cart;
};
export const updateCart = async (cid, products) => {
	const updatedCart = await cartsManager.updateCart(cid, products);
	if (!updatedCart)
		return { status: "error", error: "Cart or product not found" };
	return updatedCart;
};
export const updateProducts = async (cid, pid, quantity) => {

	const product = await productsManager.getById(pid);
	
	if (!product) return { status: "error", error: "Product not found", statusCode: 404 };

	const cart = await cartsManager.getById(cid);
	if (!cart)	return { status: "error", error: "Cart not found", statusCode: 404 };
	
	if (!quantity) return { status: "error", error: "Quantity is required", statusCode: 422 };

	const updatedQuantityCart = await cartsManager.updateQuantityProduct(
		cid,
		pid,
		quantity
	);
	return updatedQuantityCart
};
// Delete all products in cart
export const deleteCartProducts = async (cid) => {
	const cart = await cartsManager.getById(cid);
	if (!cart) return { status: "error", error: "Cart not found" };
	const result = await cartsManager.deleteProducts(cid);
	return result;
};
// Delete one product in cart
export const deleteProduct = async (cid, pid) => {
	const cart = await cartsManager.getById(cid);
	if (!cart)
	return { status: "error", error: "Cart not found", statusCode: 404 };
	const product = await productsManager.getById(pid);
	if (!product)
		return { status: "error", error: "Product not found", statusCode: 404  };

	const result = await cartsManager.deleteProductCart(cid, pid);
	return result
};

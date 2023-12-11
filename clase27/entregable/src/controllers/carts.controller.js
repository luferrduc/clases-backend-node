import { getCart as getCartServices } from "../services/carts.services.js";
import { createCart as createCartServices } from "../services/carts.services.js";
import { addProduct as addProductServices } from "../services/carts.services.js";
import { updateProducts as updateProductsServices } from "../services/carts.services.js";
import { updateCart as updateCartServices } from "../services/carts.services.js";
import { deleteProduct as deleteProductServices } from "../services/carts.services.js";
import { deleteCart as deleteCartServices } from "../services/carts.services.js";


export const getCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await getCartServices(cid);
    if (!cart)
      return res.sendNotFoundError("Cart not found");
    return res.sendSuccess(cart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
}
export const createCart = async (req, res) => {
  try {
    const cart = await this.cartsManager.create();
    return res.sendSuccess(cart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
}
export const addProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await this.productManager.getById(pid);
    if (!product)
      return res.sendNotFoundError("Product not found");

    const cart = await this.cartsManager.addProduct(cid, pid);
    if (!cart)
      return res.sendNotFoundError("Cart or product not found");
    return res.sendSuccess(cart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
}
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params
    const { products } = req.body
    
    const updatedCart = await updateCartServices(cid, products);
    if (updatedCart.error)
      return res
        .sendNotFoundError("Cart or product not found");
    return res.sendSuccess(updatedCart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
}
export const updateProducts = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params
    const product = await this.productManager.getById(pid);
    if (!product)
      return res.sendNotFoundError("Product not found");

    const cart = await this.cartsManager.getById(cid);
    if (!cart)
      return res.sendNotFoundError("Cart not found");

    if (!quantity)
      return res.sendUnproccesableEntity("Quantity is required");

    const updatedQuantityCart = await this.cartsManager.updateQuantityProduct(cid, pid, quantity)
    return res.sendSucess(updatedQuantityCart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
}
export const deleteProduct = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await this.cartsManager.getById(cid);
    if (!cart)
      return res.sendNotFoundError("Cart not found");
    const result = await this.cartsManager.deleteProducts(cid);
    return res.sendSuccess(result);
  } catch (error) {
    if (error.message.toLowerCase().includes("not found"))
      return res.sendNotFoundError(error.message);
    return res.sendServerError(error.message);
  }
}
export const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await this.cartsManager.getById(cid);
    if (!cart)
      return res.sendNotFoundError("Cart not found");
    const result = await this.cartsManager.deleteProducts(cid);
    return res.sendSuccess(result);
  } catch (error) {
    if (error.message.toLowerCase().includes("not found"))
      return res.sendNotFoundError(error.message);
    return res.sendServerError(error.message);
  }
}
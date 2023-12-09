import { getProducts as getProductsServices } from "../services/products.services.js";
import { getProduct as getProductServices } from "../services/products.services.js";
import { updateProduct as updateProductServices } from "../services/products.services.js";
import { deleteProduct as deleteProductServices } from "../services/products.services.js";

export const getProducts = async (req, res) => {
  try {
    const {
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      totalPages,
      limit,
      page,
      sortLink
    } = await getProductsServices(req, res);
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


export const getProduct = async (req, res) => {

}

export const createProduct = async (req, res) => {

}

export const updateProduct = async (req, res) => {

}
export const deleteProduct = async (req, res) => {

}

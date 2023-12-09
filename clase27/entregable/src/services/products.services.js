import Products from "../dao/dbManagers/products.manager.js";
import { productsFilePath } from "../utils.js";

const productsManager = new Products();

export const getProducts = async (req, res) => {
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
	if (queryP && queryValue) {
		options.query[queryP] = queryValue;
	}
  // 
	const key = Object.keys(options.query)[0];
	const value = Object.values(options.query)[0];
	if (key?.toLowerCase() === "stock") {
		options.query = {
			[key?.toLowerCase()]: { $gte: value }
		};
	} else if (key?.toLowerCase() === "category") {
		options.query = {
			[key?.toLowerCase()]: { $regex: value, $options: "i" }
		};
	} else {
		options.query = {};
	}
	
	const {
		docs: products,
		hasPrevPage,
		hasNextPage,
		nextPage,
		prevPage,
		totalPages
	} = await productsManager.getAll(options);
	return {
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    totalPages,
    limit,
    page,
    sortLink
  };
};

export const getProduct = async (req, res) => {};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

const fs = require("node:fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  getProductById = async (id) => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");

        const products = JSON.parse(data);
        const foundProduct = products.find((product) => {
          return product.id == id;
        });
        if (!foundProduct) return "Error: 404 Not Found";

        return foundProduct;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (producto) => {
    const { title, description, price, thumbnail, code, stock } = producto;
    // Validacion de campos
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        "Error: El producto no fue ingresado, todos los campos son obligatorios"
      );
      return;
    }

    try {
      const products = await this.getProducts();

      if (!products.length) {
        // CODE único
        const productCode = this.products.find(
            (product) => product.code === code
          );
          if (productCode) {
            console.log(
              `Error: El código ${code} del producto ingresado ya se encuentra en otro producto.`
            );
            return;
          }
        producto.id = 1;
      } else {
        producto.id = products[products.length - 1].id + 1;
      }

      products.push(producto);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
      console.log("Producto agregado correctamente");
      return producto
    } catch (error) {
        console.log(error)
    }
  };

  updateProduct = async (id) => {

  }

  deleteProduct = async (id) => {

  }
  
}

module.exports = {
  ProductManager,
};

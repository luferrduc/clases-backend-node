class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }
  getProductById(id) {
    const foundProduct = this.products.find((product) => {
      return product.id == id;
    });

    if (!foundProduct) return "Error: 404 Not Found";
    return foundProduct;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validacion de campos
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        "Error: El producto no fue ingresado, todos los campos son obligatorios"
      );
      return;
    }

    // CODE único
    const productCode = this.products.find((product) => product.code === code);
    if (productCode) {
      console.log(
        `Error: El código ${code} del producto ingresado ya se encuentra en otro producto.`
      );
      return;
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
    console.log("Producto agregado correctamente")
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
console.log(productManager.getProductById(1)); // -> 404 Not Found
productManager.addProduct();
productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen","abc123", 25) 
console.log(productManager.getProducts())
productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen","abc123", 25) 
console.log(productManager.getProductById(1))
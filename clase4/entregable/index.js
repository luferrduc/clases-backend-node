

const {ProductManager} = require('./managers/ProductManager')
const manager = new ProductManager('./files/Productos.json')



const env = async () => {
    const products = await manager.getProducts()
    console.log(products)

    const product = {
        title: "producto prueba",
        description: "Este es un producto de prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    }

    const createdProduct = await manager.addProduct(product)
    console.log(createdProduct)
    

}


const productManager = new ProductManager();
console.log(productManager.getProducts());
console.log(productManager.getProductById(1)); // -> 404 Not Found
productManager.addProduct();
productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(productManager.getProducts());
productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(productManager.getProductById(1));

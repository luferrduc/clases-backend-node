

const {ProductManager} = require('./managers/ProductManager')
const manager = new ProductManager('./files/Productos.json')



const env = async () => {
    const products = await manager.getProducts()
    console.log(products)

    const product = {
        title: "producto prueba 2",
        description: "Este es un producto de prueba 2",
        price: 2000,
        thumbnail: "Sin imagen 2",
        code: "abc1234",
        stock: 250
    }

    // const createdProduct = await manager.addProduct(product)
    // console.log(createdProduct)
    
    await manager.deleteProduct(2)
    const firstProduct = await manager.getProductById(1)
    console.log(firstProduct)
    

}


env()

// const productManager = new ProductManager();
// console.log(productManager.getProducts());
// console.log(productManager.getProductById(1)); // -> 404 Not Found
// productManager.addProduct();
// productManager.addProduct(
//   "producto prueba",
//   "Este es un producto de prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
// console.log(productManager.getProducts());
// productManager.addProduct(
//   "producto prueba",
//   "Este es un producto de prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
// console.log(productManager.getProductById(1));

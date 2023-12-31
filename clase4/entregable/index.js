

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

    const createdProduct = await manager.addProduct(product)
    console.log(createdProduct)
    
    await manager.deleteProduct(2)
    const firstProduct = await manager.getProductById(3)
    console.log(firstProduct)
    
    const updatedProduct = await manager.updateProduct(1, product)
    console.log(updatedProduct)
}


env()


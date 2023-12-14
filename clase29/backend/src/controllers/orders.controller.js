import * as ordersService from "../services/orders.services.js"
import * as usersService from "../services/users.services.js"
import * as businessService from "../services/business.services.js"

export const getOrders = async (req, res) => {
  try {
    // Necesito un método que me permita obtener el listado de ordenes
    const result = await ordersService.getOrders()
    return res.send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const createOrder = async (req, res) => {
  try {
    // {
    //   user: 'id del usuario de mongodb',
    //   business: 'id del negocio de mongodb',
    //   products: [1, 2, 3] // Ids de los productos
    // }
    const { user, business, products } = req.body
    // Validamos que el usuario que está tratando de crear la orden, existe en BD
    // Deberíamos implementar un método para obtener el usuario por Id
    const userResult = await usersService.getUserById(user)
    if(!userResult) return res.status(404).send({ status: "error", message: "user not found" })
    // Validamos que el neogcio que está tratando de asignar la orden, existe en BD
    // Deberíamos implementar un método para obtener el negocio por Id
    const businessResult = await businessService.getBusinessById(business)
    if(!businessResult) return res.status(404).send({ status: "error", message: "business not found" })
    
    // Deberíamos tener la implementación del método que me permite crear la orden
    const result = await ordersService.createOrder(userResult, businessResult, products)
    return res.status(201).send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const resolveOrder = async (req, res) => {
  try {
    const { status } = req.body
    const { id } = req.params
    // Validamos que la orden a la que queremos cambiar el estado, existe en BD
    // Deberíamos implementar un método para obtener la orden por Id
    const orderResult = await ordersService.getOrderById(id)
    if(!orderResult) return res.status(404).send({ status: "error", message: "order not found" })

    // Deberíamos implementar un método para resolver la orden
    const result = await ordersService.resolveOrder(orderResult, status)
    return res.send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}
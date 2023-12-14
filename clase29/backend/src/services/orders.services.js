import OrdersRepository from "../repositories/orders.repository.js"
import UsersRepository from "../repositories/users.repository.js"

const ordersRepository = new OrdersRepository()
const usersRepository = new UsersRepository()

export const createOrder = async (user, business, products) => {
  // {
  //   name: 'coder',
  //   products: [
  //     {
  //       id: 1,
  //       pice: 20
  //     },
  //     {
  //       id: 2,
  //       pice: 50
  //     }
  //   ]
  // }
  // {
  //   number: 1232131,
  //   business,
  //   user,
  //   status: "PENDING",
  //   products: [2,4,5],
  //   total_price: 50
  // }
  const currentProducts = business.products.filter((product) => 
    products.includes(product.id)
  )
  const totalPrice = currentProducts.reduce((acc, prev) => {
    acc+= prev.price
    return acc
  }, 0)
  const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1)
  const order = {
    number: orderNumber,
    business: business._id,
    user: user._id,
    status: 'PENDING',
    products: currentProducts.map(product => product.id),
    total_price: totalPrice
  }
  const orderResult = await ordersRepository.createOrder(order)
  user.orders.push(orderResult._id)
  await usersRepository.updateUser(user._id, user)
  
  return orderResult
}

export const getOrders = async () => {
  const result = await ordersRepository.getOrders()
  return result
}

export const getOrderById = async (id) => {
  const result = await ordersRepository.getOrderById(id)
  return result
}

export const resolveOrder = async (order, status) => {
  // Lógica de negocio es modificar el estado de la orden
  order.status = status
  const result = await ordersRepository.resolveOrder(order)
  return result
}

